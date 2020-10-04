export default class LikerWidget {
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
      <div class="liker">
        <button class="liker-btn">Like</button>
        <div class="liker-heart liker-hidden"></div>       
      </div>
    `;
  }

  bindToDOM() {
    this.container.insertAdjacentHTML('beforeend', this.createMarkup());
  }

  initElements() {
    this.likeBtn = document.querySelector('.liker-btn');
    this.heartEl = document.querySelector('.liker-heart');
    this.traces = ['one', 'two', 'three', 'four'];
  }

  registerListeners() {
    this.likeBtn.addEventListener('click', () => this.onClick());
  }

  onClick() {
    const heart = this.heartEl.cloneNode(true);
    this.likeBtn.insertAdjacentElement('beforebegin', heart);
    heart.classList.remove('liker-hidden');

    const randInt = Math.floor(Math.random() * this.traces.length);
    heart.classList.add(`trace-${this.traces[randInt]}`);
    heart.addEventListener('animationend', () => heart.remove());
  }
}
