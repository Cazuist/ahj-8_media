import Modal from './Modal';

export default class ErrorModal extends Modal {
  // eslint-disable-next-line  no-useless-constructor
  constructor(parent) {
    super(parent);
  }

  init() {
    super.init();
    this.form = document.querySelector('.err-form-modal');
    this.textEl = this.form.querySelector('.message-content');
  }

  bindToDom() {
    document.body.insertAdjacentHTML('beforeend', this.createMarkup());
  }

  // eslint-disable-next-line class-methods-use-this
  createMarkup() {
    return `
      <form class="modal err-form-modal hidden" data-type="errModal" novalidate>
        <div class="form-title">Возникли трудности</div>

        <p class="message-content">
        </p>
        
        <div class="modal-btn-row">
          <button class="modal-btn ok-btn">Ok</button>
        </div>      
      </form>
    `;
  }

  setMessage(message) {
    this.textEl.textContent = message;
  }
}
