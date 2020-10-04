import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

export default class TextBlock {
  constructor(container, content, coords) {
    this.container = container;
    this.content = content;
    this.coords = coords;

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
            <div class="text-content">${this.content}</div>
            <div class="coords-box">
              <div class="coord">[${this.coords.latitude}, ${this.coords.longitude}]</div>
              <div class="visibility-icon to-visible"></div>
            </div>            
          </div>

          <div class="info-block">
            <div class="date-content">${this.date}</div>
            <div class="info-block_icons">
              <div class="info-block_icon edit-icon"></div>
              <div class="info-block_icon del-icon"></div>
            </div>           
          </div>
          <div class="circle text-circle"></div>          
        </div>
    `;
  }

  bindToDOM() {
    this.container.insertAdjacentHTML('afterbegin', this.createMarkup());
  }
}
