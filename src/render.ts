// js/dom.js
import { el, qs, setText } from './utils.js';

export const renderBearCard = ({ name, binomial, image, range }) => {
  const card = el('article', { class: 'bear-card' });
  const img = el('img', { src: image, alt: `Image of ${name}` });
  const title = el('p', { class: 'bear-title' }, [
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
  bears.forEach((b) => {
    frag.append(renderBearCard(b));
  });
  container.append(frag);
};

export const setLoadStatus = (text) => {
  const elStatus = qs('.load-status');
  if (elStatus) setText(elStatus, text);
};
