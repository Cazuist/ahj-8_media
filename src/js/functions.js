export function isValid(coords) {
  const string = coords.trim();
  const arr = string.split(',');

  if (string.startsWith('[') && string.endsWith(']')) {
    const sliced = string.slice(1, -1);
    const newArr = sliced.split(',');

    if (newArr.some((str) => !str.trim().match(/^-?\d+.?\d+$/))) {
      return false;
    }

    return isValid(sliced);
  }

  if (!coords.trim()) {
    return false;
  }

  if (arr.length !== 2) {
    return false;
  }

  if (arr.some((str) => !str.trim() || !str.trim().match(/^-?\d+.?\d+$/))) {
    return false;
  }

  return true;
}

export function getStringFromCoords(coords) {
  if (coords.trim().startsWith('[') && coords.trim().endsWith(']')) {
    return coords.trim().slice(1, -1).trim().replace(/, */g, ', ');
  }

  return coords.trim().replace(/ /g, '').replace(/, */g, ', ');
}

export class Timer {
  constructor(container) {
    this.container = container;

    this.minutes = 0;
    this.seconds = 0;
    this.intervalId = null;
  }

  start() {
    this.intervalId = setInterval(() => {
      this.seconds += 1;

      if (this.seconds === 60) {
        this.minutes += 1;
        this.seconds = 0;
      }

      this.redrawTimer();
    }, 1000);
  }

  redrawTimer() {
    const minStr = this.minutes >= 10 ? `${this.minutes}` : `0${this.minutes}`;
    const secStr = this.seconds >= 10 ? `${this.seconds}` : `0${this.seconds}`;
    this.container.textContent = `${minStr}:${secStr}`;
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.minutes = 0;
    this.seconds = 0;
    this.redrawTimer();
  }
}

export function recordStream(widget, type, Box, coords) {
  const chunks = [];

  return (async () => {
    try {
      let video;

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: type === 'video',
      });

      if (type === 'video') {
        video = document.querySelector('.video-box');
        video.srcObject = stream;
        video.play();
      }

      const recorder = new MediaRecorder(stream);

      recorder.addEventListener('start', () => {
        // eslint-disable-next-line no-param-reassign
        widget.stream = stream;
        // eslint-disable-next-line no-param-reassign
        widget.recorder = recorder;
      });

      recorder.addEventListener('dataavailable', (event) => {
        chunks.push(event.data);
      });

      recorder.addEventListener('stop', () => {
        const blob = new Blob(chunks);
        const src = URL.createObjectURL(blob);

        if (widget.canAddBlock) {
          const box = new Box(widget.tasksBoxEl, coords, src);
          box.init();
        }

        if (type === 'video') {
          video.srcObject = null;
        }

        URL.revokeObjectURL(blob);
      });

      return recorder;
    } catch {
      throw new Error(`Нет доступа к ${type} устройству!`);
    }
  })();
}
