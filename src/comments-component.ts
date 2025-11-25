export class AddComment extends HTMLElement {
  private form!: HTMLFormElement;
  private inputName!: HTMLInputElement;
  private inputComment!: HTMLInputElement;
  private error!: HTMLParagraphElement;

  constructor() {
    super();

    const template = document.getElementById("add-comment-template") as HTMLTemplateElement;
    const content = template.content.cloneNode(true);

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(content);

    this.form = shadow.querySelector(".comment-form") as HTMLFormElement;
    this.inputName = shadow.querySelector("#c-name") as HTMLInputElement;
    this.inputComment = shadow.querySelector("#c-comment") as HTMLInputElement;
    this.error = shadow.querySelector(".error") as HTMLParagraphElement;

    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  private handleSubmit(event: Event): void {
    event.preventDefault();

    const name = this.inputName.value.trim();
    const comment = this.inputComment.value.trim();

    if (!name || !comment) {
      this.error.textContent = "Please enter both name and comment.";
      this.error.classList.remove("hidden");
      return;
    }

    this.error.classList.add("hidden");

    // Send data to outside world
    this.dispatchEvent(
      new CustomEvent("comment-added", {
        detail: { name, comment },
        bubbles: true,
        composed: true,
      })
    );

    this.form.reset();
  }
}

customElements.define("add-comment", AddComment);
