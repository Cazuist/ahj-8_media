import Modal from './Modal';

export default class MsgModal extends Modal {
  // eslint-disable-next-line  no-useless-constructor
  constructor(parent) {
    super(parent);
  }

  init() {
    super.init();
    this.form = document.querySelector('.msg-form-modal');
  }

  bindToDom() {
    document.body.insertAdjacentHTML('beforeend', this.createMarkup());
  }

  // eslint-disable-next-line class-methods-use-this
  createMarkup() {
    return `
      <form class="modal msg-form-modal hidden" data-type="msgModal" novalidate>
        <div class="form-title">Что-то пошло не так!</div>

        <p class="message-content">
          К сожалению нам не удалось определить ваше местоположение.
          Пожалуйста, дайте разрешение на использование геолокации,
           либо введите координаты вручную
        </p>

        <p class="message-content">
          Широта и долгота через запятую<br>
        </p>

        <input class="modal-input" type='text'>
        <div class='error-box hidden'>Невалидные координаты</div>
        
        <div class="modal-btn-row">
          <button class="modal-btn cancel-btn">Отмена</button>
          <button class="modal-btn ok-btn">Ok</button>
        </div>      
      </form>
    `;
  }
}
