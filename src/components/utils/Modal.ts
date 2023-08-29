// eslint-disable-next-line max-classes-per-file
import '../../assets/img/x-icon.svg';

export default class Modal {
  classes: string[];

  overlay: HTMLElement;

  modal: HTMLElement;

  modalContent: HTMLElement;

  modalCloseBtn: HTMLElement;

  constructor(classes: string[]) {
    this.classes = classes;
    this.modal = this.createDomNode('div', 'modal', ...this.classes);
    this.modalContent = this.createDomNode('div', 'modal__content');
    this.modalCloseBtn = this.createDomNode('button', 'button_round', 'button', 'modal__close-btn');
    this.overlay = this.createDomNode('div', 'overlay', 'overlay_modal');
  }

  buildModal(content: HTMLElement) {
    this.modalCloseBtn.innerHTML = '<img src="../assets/img/x-icon.svg" alt="x" class="modal__close-icon">';

    this.setContent(content);

    this.appendModalElements();

    // Bind events
    this.bindEvents();

    this.openModal(); // open modal
  }

  createDomNode(element: string, ...classes: string[]): HTMLElement {
    const node = document.createElement(element);
    node.classList.add(...classes);
    return node;
  }

  setContent(content: HTMLElement) {
    if (typeof content === 'string') {
      this.modalContent.innerHTML = content;
    } else {
      this.modalContent.innerHTML = '';
      this.modalContent.appendChild(content);
    }
  }

  appendModalElements() {
    this.modal.append(this.modalCloseBtn);
    this.modal.append(this.modalContent);
    this.overlay.append(this.modal);
  }

  bindEvents() {
    this.modalCloseBtn.addEventListener('click', this.closeModal);
    this.overlay.addEventListener('click', this.closeModal);
  }

  openModal() {
    document.body.append(this.overlay);
    document.body.classList.toggle('_lock');
    this.modal.classList.add('modal-open');
  }

  closeModal(e: Event) {
    if (e.target === null) return;
    const classes = (<HTMLElement>e.target).classList;
    if (classes.contains('overlay') || classes.contains('modal__close-btn') || classes.contains('modal__close-icon')) {
      const modal = document.querySelector('.modal');
      if (!modal) return;
      modal.classList.add('modal-close');
      document.body.classList.remove('_lock');
      setTimeout(() => {
        const overlay = document.querySelector('.overlay');
        if (!overlay) return;
        overlay.remove();
      }, 450);
    }
  }
}
