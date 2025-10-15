// js/utils.js
export const qs = (sel: string, root = document) => root.querySelector(sel);
export const qsa = (sel: any, root = document) => [
  ...root.querySelectorAll(sel),
];
export const el = (tag: any, attrs = {}, children = []) => {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'class') node.className = v;
    else if (k.startsWith('data-')) node.setAttribute(k, v);
    else if (k === 'text') node.textContent = v;
    else node.setAttribute(k, v);
  });
  children.forEach((c) => node.append(c));
  return node;
};

export const debounce = <T extends any[]>(
  fn: (...args: T) => any,
  ms = 250
) => {
  let t: number | undefined;
  return (...args: T) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
};

export const placeholderImg = 'assets/placeholder-bear.jpg';

/**
 * Verify image URL is reachable. If not, return placeholder.
 */
export const verifyImageUrl = async (url: unknown) =>
  await new Promise((resolve) => {
    if (!url) {
      resolve(placeholderImg);
      return;
    }
    const img = new Image();
    img.onload = () => {
      resolve(url);
    };
    img.onerror = () => {
      resolve(placeholderImg);
    };
    img.src = String(url);
  });

export const show = (node: { classList: { remove: (arg0: string) => any } }) =>
  node.classList.remove('hidden');
export const hide = (node: Element | null) => {
  if (node) node.classList.add('hidden');
};
export const setText = (node: { textContent: any }, text: any) => {
  node.textContent = text;
};
