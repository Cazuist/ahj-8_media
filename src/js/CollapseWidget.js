export default class CollapseWidget {
  constructor(container) {
    this.container = container;
  }

  init() {
    this.bindToDOM();
    this.initElements();
    this.registerListeners();
  }

  // eslint-disable-next-line class-methods-use-this
  createMarkup() {
    return `      
        <div class="collapse">
          <div class="collapse-btn">Collapse</div>
          <div class="collapse-content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
            </p>
          </div>          
          <div class="copy-btn">copy</div>       
        </div> 
    `;
  }

  bindToDOM() {
    this.container.insertAdjacentHTML('beforeend', this.createMarkup());
  }

  initElements() {
    this.btn = document.querySelector('.collapse-btn');
    this.content = document.querySelector('.collapse-content');
  }

  registerListeners() {
    this.btn.addEventListener('click', () => this.onClick());
    this.content.addEventListener('transitionend', (event) => this.onTransitionEnd(event));
    this.content.addEventListener('transitionstart', (event) => this.onTransitionStart(event));
  }

  onClick() {
    this.content.classList.toggle('collapse-hidden');
  }

  // eslint-disable-next-line class-methods-use-this
  onTransitionEnd(event) {
    if (event.target.classList.contains('collapse-hidden')) {
      // eslint-disable-next-line no-param-reassign
      event.target.style.borderWidth = '0px';
    }
  }

  // eslint-disable-next-line class-methods-use-this
  onTransitionStart(event) {
    if (!event.target.classList.contains('collapse-hidden')) {
      // eslint-disable-next-line no-param-reassign
      event.target.style.border = '1px solid gray';
    }
  }
}
