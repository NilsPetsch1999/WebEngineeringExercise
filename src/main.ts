// js/main.js
import { fetchUrsidsWikitext, fetchImageUrlFromFile } from './api.js';
import { mountBearCards, setLoadStatus } from './render.js';
import { initComments } from './comments.js';
import { initSearch } from './search.js';
import { qs, verifyImageUrl, hide, placeholderImg } from './utils.js';

const BEARS_CONTAINER_SEL = '[data-bears]';
const ERR_SEL = '[data-bears-error]';

window.addEventListener('DOMContentLoaded', async () => {
  initComments();
  initSearch();

  const container = qs(BEARS_CONTAINER_SEL);
  const errEl = qs(ERR_SEL);

  try {
    setLoadStatus('Loading bears…');
    const wikitext = await fetchUrsidsWikitext();
    const bearsRaw = extractBearsFromSpeciesTables(wikitext);

    // Preserve original Wiki order and avoid duplicates
    const seen = new Set();
    const bearsOrdered = [];
    for (const b of bearsRaw) {
      const key = `${b.name}|${b.binomial}`;
      if (!seen.has(key)) {
        seen.add(key);
        bearsOrdered.push(b);
      }
    }

    // Resolve images (verify URLs; placeholder if missing)
    const enriched = await Promise.all(
      bearsOrdered.map(async (b) => {
        const file = b.imageFile?.replace(/^File:/i, '') || null;
        const wikiUrl = file ? await safeImageUrl(file) : null;
        const finalUrl = await verifyImageUrl(wikiUrl);
        return { ...b, image: finalUrl };
      })
    );

    mountBearCards(container, enriched);
    hide(qs('.load-status'));
  } catch (err) {
    hide(qs('.load-status'));
    const msg =
      typeof err === 'object' && err !== null && 'message' in err
        ? (err as { message: string }).message
        : String(err);
    if (errEl) {
      errEl.textContent = `Could not load bears: ${msg}`;
      errEl.classList.remove('hidden');
    }
  }
});

const safeImageUrl = async (fileName: any) => {
  try {
    return await fetchImageUrlFromFile(fileName);
  } catch {
    return null;
  }
};

/**
 * Parse {{Species table}} wikitext blocks and rows.
 * Extracts: common name, binomial, image file name, range.
 * Keeps the original order they appear in wikitext.
 */
export const extractBearsFromSpeciesTables = (wikitext: string) => {
  if (!wikitext) return [];

  const blocks = wikitext.split('{{Species table/end}}');
  const bears = [];

  for (const block of blocks) {
    const rows = block.split('{{Species table/row').slice(1); // first split chunk is preface
    for (const row of rows) {
      const nameMatch = row.match(/\|name=\s*\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/i);
      const binomMatch = row.match(/\|binomial\s*=\s*([^\n|]+)\s*(?:\||\n)/i);
      const imgMatch = row.match(/\|image\s*=\s*([^\n|]+)\s*(?:\||\n)/i);
      const rangeMatch = row.match(/\|range\s*=\s*([^\n|]+)\s*(?:\||\n)/i);

      if (!nameMatch || !binomMatch) continue;

      bears.push({
        name: nameMatch[1].trim(), // common name as in wiki
        binomial: binomMatch[1].trim(), // scientific name
        imageFile: imgMatch ? imgMatch[1].trim() : null,
        range: rangeMatch ? cleanWikiText(rangeMatch[1]) : '—',
      });
    }
  }

  return bears;
};

const cleanWikiText = (txt: string) =>
  (txt || '')
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2') // [[target|label]] -> label
    .replace(/\[\[([^\]]+)\]\]/g, '$1') // [[target]] -> target
    .replace(/{{nbsp}}/g, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
