export default class Modal {
  constructor(parent) {
    this.parent = parent;
    this.init();
  }

  init() {
    this.bindToDom();
  }

  show() {
    this.form.classList.remove('hidden');
    this.setPosition(this.parent);
    this.parent.classList.add('blocked');
  }

  hide() {
    this.form.classList.add('hidden');
    this.form.reset();
    this.parent.classList.remove('blocked');
  }

  setPosition(target) {
    const targetRect = target.getBoundingClientRect();
    const targetTop = targetRect.y;
    const targetLeft = targetRect.x;
    const modWidth = this.form.offsetWidth;

    this.form.style.top = `${targetTop + window.pageYOffset + 45}px`;
    this.form.style.left = `${targetLeft + window.pageXOffset - (modWidth - targetRect.width) / 2}px`;
  }
}
