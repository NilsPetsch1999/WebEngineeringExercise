// js/search.js
import { qs } from './utils';

export const initSearch = () => {
  const form = qs('form.search');
  const article = qs('article');
  if (!form || !article) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearHighlights(article);

    const q = (qs('#q') as HTMLInputElement | null)?.value?.trim();
    if (!q) return;

    const terms = q.split(/\s+/).map(escapeRegExp).filter(Boolean);
    if (terms.length === 0) return;

    // "foo bar" -> /(foo|bar)/gi
    const regex = new RegExp(`(${terms.join('|')})`, 'gi');

    // snapshot all target text nodes (avoid mutating during walk)
    const nodes = collectTextNodes(article);

    // for each node, find all matches first...
    for (const node of nodes) {
      const text = node.nodeValue;
      if (!text || !/\S/.test(text)) continue;

      let m;
      const ranges = [];
      regex.lastIndex = 0;
      while ((m = regex.exec(text)) !== null) {
        const start = m.index;
        const end = start + m[0].length;
        ranges.push([start, end]);

        // safety: avoid infinite loops on zero-length matches
        if (m.index === regex.lastIndex) regex.lastIndex++;
      }

      if (ranges.length === 0) continue;

      // apply from END -> START so indexes stay valid while we split
      for (let i = ranges.length - 1; i >= 0; i--) {
        const [start, end] = ranges[i];
        wrapTextRangeInMark(node, start, end);
      }
    }
  });
};

// Collect text nodes while skipping anything already inside a highlight
const collectTextNodes = (root: Node) => {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue || !/\S/.test(node.nodeValue)) {
        return NodeFilter.FILTER_REJECT;
      }
      if (
        node.parentNode &&
        node.parentNode instanceof Element &&
        node.parentNode.closest('mark.highlight')
      ) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const out = [];
  let n;
  while ((n = walker.nextNode())) out.push(n);
  return out;
};

// Split the text node and wrap the match in <mark class="highlight">
const wrapTextRangeInMark = (textNode: Node, start: number, end: number) => {
  // Ensure textNode is a Text node before calling splitText
  if (!(textNode instanceof Text)) return;

  // Split at 'start' -> new node = matchStart
  const matchStart = textNode.splitText(start);
  // Split again at match length -> new node afterMatch, match node remains
  const afterMatch = matchStart.splitText(end - start);

  const mark = document.createElement('mark');
  mark.className = 'highlight';
  if (matchStart.parentNode) {
    matchStart.parentNode.insertBefore(mark, matchStart);
    mark.appendChild(matchStart);
  }
  // afterMatch is left in place for subsequent (earlier) wraps
};

const clearHighlights = (root: Element) => {
  root.querySelectorAll('mark.highlight').forEach((mark) => {
    const parent = mark.parentNode;
    if (parent) {
      parent.replaceChild(document.createTextNode(mark.textContent), mark);
      parent.normalize();
    }
  });
};

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
