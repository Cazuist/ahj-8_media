import Modal from './Modal';

export default class DeleteModal extends Modal {
  // eslint-disable-next-line  no-useless-constructor
  constructor(parent) {
    super(parent);
  }

  init() {
    super.init();
    this.form = document.querySelector('.del-form-modal');
  }

  bindToDom() {
    document.body.insertAdjacentHTML('beforeend', this.createMarkup());
  }

  // eslint-disable-next-line class-methods-use-this
  createMarkup() {
    return `
      <form class="modal del-form-modal hidden" data-type="delModal" novalidate>
        <div class="form-title">Удаление контента</div>

        <p class="message-content">
          Вы действительно хотите удалить данный блок?
          Это действие необратимо!
        </p>
        
        <div class="modal-btn-row">
          <button class="modal-btn cancel-btn">Отмена</button>
          <button class="modal-btn ok-btn">Ok</button>
        </div>      
      </form>
    `;
  }
}
