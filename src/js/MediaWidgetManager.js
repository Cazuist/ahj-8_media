import Listener from './Listener';
import { Timer } from './functions';
import MsgModal from './modals/MsgModal';
import EditModal from './modals/EditModal';
import DeleteModal from './modals/DeleteModal';
import ErrorModal from './modals/ErrorModal';

export default class MediaWidgetManager {
  constructor(container) {
    this.container = container;
    this.listener = new Listener();

    this.timer = null;
    this.recorder = null;
    this.stream = null;
    this.canAddBlock = false;
    this.addingBlock = null;
  }

  init() {
    this.bindToDOM();
    this.initModals();
    this.initElements();
    this.registerListeners();
  }

  // eslint-disable-next-line class-methods-use-this
  createMarkup() {
    return `
      <div class="media-widget_box">
        <header class="media-widget_header">
          <div class="dots">
            <span class="dot dot-1"></span>
            <span class="dot dot-2"></span>
            <span class="dot dot-3"></span>
          </div>

          <h3 class="media-widget_header_title">
            Timeline v.1.0
          </h3>
        </header>

        <div class="media-widet_content-box">
          <div class="media-widget_scroll"></div>
          <div class="media-widget_tasks"></div>
        </div>
        
        
        <footer class="media-widet_footer">
          <div class="preview-video-box hidden">
            <video class="video-box" muted></video> 
          </div>
                   
          <textarea class="media_input-field"></textarea>

          <div class="footer-icons">
            <div class="variant-icons-field start-record-btns">
              <div class="icon phone-icon start-record"></div>
              <div class="icon camera-icon start-record"></div>
            </div>

            <div class="variant-icons-field on-record-btns hidden">
              <div class="icon end-record-icon"></div>
              <div class="timer-field">00:00</div>
              <div class="icon cancel-record-icon"></div>
            </div>            
          </div>
        </footer>
      </div>
    `;
  }

  bindToDOM() {
    this.container.insertAdjacentHTML('beforeend', this.createMarkup());
    this.widgetEl = document.querySelector('.media-widget_box');
    this.timer = new Timer(this.widgetEl.querySelector('.timer-field'));
  }

  initModals() {
    this.modals = {
      msgModal: new MsgModal(this.widgetEl),
      delModal: new DeleteModal(this.widgetEl),
      editModal: new EditModal(this.widgetEl),
      errModal: new ErrorModal(this.widgetEl),
    };
  }

  initElements() {
    this.modalEl = document.querySelectorAll('.modal');
    this.tasksBoxEl = document.querySelector('.media-widget_tasks');
    this.textFieldEl = document.querySelector('.media_input-field');
    this.footerControlsBtn = document.querySelectorAll('.icon');
    this.previewEl = document.querySelector('.preview-video-box');
  }

  registerListeners() {
    document.addEventListener('keypress', (event) => this.onEnterPress(event));

    this.modalEl.forEach((modal) => {
      modal.addEventListener('click', (event) => this.onModalClick(event));
    });

    this.tasksBoxEl.addEventListener('click', (event) => this.onTaskClick(event));

    this.footerControlsBtn.forEach((btn) => {
      btn.addEventListener('click', (event) => this.onRecordClick(event));
    });
  }

  onEnterPress(event) {
    this.listener.onEnterPress.call(this, event);
  }

  onModalClick(event) {
    this.listener.onModalClick.call(this, event);
  }

  onTaskClick(event) {
    this.listener.onTaskClick.call(this, event);
  }

  onRecordClick(event) {
    this.listener.onRecordClick.call(this, event);
  }

  switchRecordPanel() {
    this.widgetEl.querySelector('.start-record-btns').classList.toggle('hidden');
    this.widgetEl.querySelector('.on-record-btns').classList.toggle('hidden');
  }
}
