import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

export default class AudioBlock {
  constructor(container, coords, src) {
    this.container = container;
    this.coords = coords;

    this.src = src;
    this.id = uuidv4();
    this.date = moment().format('DD.MM.YY hh:mm:ss');
  }

  init() {
    this.bindToDOM();
  }

  // eslint-disable-next-line class-methods-use-this
  createMarkup() {
    return `
        <div class="media-block" data-id="${this.id}">
          <div class="content-block">
            
            <audio controls>
              <source src=${this.src} type="audio/ogg; codecs=vorbis">
              <source src=${this.src} type="audio/mpeg">
              Тег audio не поддерживается вашим браузером.
            </audio>

            <div class="coords-box">
              <div class="coord">[${this.coords.latitude}, ${this.coords.longitude}]</div>
              <div class="visibility-icon to-visible"></div>
            </div>            
          </div>

          <div class="info-block">
            <div class="date-content">${this.date}</div>
            <div class="info-block_icons">
              <div class="info-block_icon del-icon"></div>
            </div>           
          </div>
          <div class="circle audio-circle"></div>          
        </div>
    `;
  }

  bindToDOM() {
    this.container.insertAdjacentHTML('afterbegin', this.createMarkup());
  }
}
