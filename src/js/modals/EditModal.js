import Modal from './Modal';

export default class EditModal extends Modal {
  // eslint-disable-next-line  no-useless-constructor
  constructor(parent) {
    super(parent);
  }

  init() {
    super.init();
    this.form = document.querySelector('.edit-form-modal');
  }

  bindToDom() {
    document.body.insertAdjacentHTML('beforeend', this.createMarkup());
  }

  // eslint-disable-next-line class-methods-use-this
  createMarkup() {
    return `
      <form class="modal edit-form-modal hidden" data-type="editModal" novalidate>
        <div class="form-title">Редактирование контента</div>

        <p class="message-content">
          Отредактируйте данную тему
        </p>

        <textarea class="edit-modal-text"></textarea>

        <p class="message-content">
          Координаты
        </p> 

        <input class="edit-modal-coord" type="text" disabled>   
        
        <div class="modal-btn-row">
          <button class="modal-btn cancel-btn">Отмена</button>
          <button class="modal-btn ok-btn">Ok</button>
        </div>      
      </form>
    `;
  }

  getValues(task) {
    const textFrom = task.querySelector('.text-content').textContent;
    const coordFrom = task.querySelector('.coord').textContent;

    this.form.querySelector('textarea').value = textFrom;
    this.form.querySelector('input').value = coordFrom;
  }

  setValues(task) {
    const textFrom = this.form.querySelector('textarea').value;
    // eslint-disable-next-line no-param-reassign
    task.querySelector('.text-content').textContent = textFrom;
  }
}
