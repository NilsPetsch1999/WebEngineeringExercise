import { qs, show, hide } from "./utils.js";

export const initComments = (): void => {
  const toggleBtn = qs<HTMLButtonElement>(".toggle-comments");
  const panel = qs<HTMLDivElement>("#comment-panel");
  const list = qs<HTMLUListElement>(".comment-container");

  hide(panel);

  toggleBtn.addEventListener("click", () => {
    const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
    toggleBtn.setAttribute("aria-expanded", String(!expanded));
    toggleBtn.textContent = expanded ? "Show comments" : "Hide comments";
    panel.classList.toggle("hidden");
  });

  // Listen to the custom event from the Web Component
  document.addEventListener("comment-added", (e) => {
    const detail = (e as CustomEvent<{ name: string; comment: string }>).detail;

    const li = document.createElement("li");
    li.tabIndex = 0;

    const pName = document.createElement("p");
    pName.innerHTML = `<strong>${escapeHtml(detail.name)}</strong>`;

    const pComment = document.createElement("p");
    pComment.textContent = detail.comment;

    li.append(pName, pComment);
    list.append(li);
  });
};

const escapeHtml = (s: string): string =>
  s.replace(/[&<>"']/g, (c) => {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return map[c];
  });
