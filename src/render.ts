// js/dom.js
import { el, qs, setText } from './utils.js';

export const renderBearCard = ({ name, binomial, image, range }) => {
  const cardId = `bear-${name.toLowerCase().replace(/\s+/g, '-')}`;

  const card = el('article', {
    class: 'bear-card',
    tabindex: '0',               // ✅ makes card focusable
    role: 'button',              // ✅ tells screen readers it’s interactive
    'aria-labelledby': `${cardId}-title`,
  });

  const img = el('img', {
    src: image,
    alt: `Image of ${name}`,     // good alt text
  });

  const title = el('p', { class: 'bear-title', id: `${cardId}-title` }, [
    el('strong', { text: name }),
    document.createTextNode(` (${binomial})`),
  ]);

  const rangeP = el('p', { text: `Range: ${range || '—'}` });

  card.append(img, title, rangeP);
  return card;
};

export const mountBearCards = (container, bears) => {
  container.innerHTML = '';
  const frag = document.createDocumentFragment();
  bears.forEach((b) => frag.append(renderBearCard(b)));
  container.append(frag);
};

export const setLoadStatus = (text) => {
  const elStatus = qs('.load-status');
  if (elStatus) setText(elStatus, text);
};
