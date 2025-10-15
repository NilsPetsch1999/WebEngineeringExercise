// js/comments.js
import { qs, show, hide } from './utils.js';

export const initComments = () => {
  const toggleBtn = qs('.toggle-comments');
  const panel = qs('#comment-panel');
  const form = qs('.comment-form');
  const error = qs('.comment-form .error');
  const list = qs('.comment-container');

  // Start hidden
  hide(panel);
  toggleBtn.addEventListener('click', () => {
    const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', String(!expanded));
    toggleBtn.textContent = expanded ? 'Show comments' : 'Hide comments';
    panel.classList.toggle('hidden');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = qs('#name').value.trim();
    const comment = qs('#comment').value.trim();

    if (!name || !comment) {
      error.textContent = 'Please enter both name and comment.';
      show(error);
      return;
    }

    hide(error);

    const li = document.createElement('li');
    const pName = document.createElement('p');
    pName.innerHTML = `<strong>${escapeHtml(name)}</strong>`;
    const pComment = document.createElement('p');
    pComment.textContent = comment;

    li.append(pName, pComment);
    list.append(li);

    form.reset();
  });
};

const escapeHtml = (s) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        c
      ]
  );
