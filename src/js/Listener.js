import TextBlock from './tasks/TextBlock';
import AudioBlock from './tasks/AudioBlock';
import VideoBlock from './tasks/VideoBlock';
import * as fn from './functions';

export default class Listener {
  onEnterPress(event) {
    if (event.key !== 'Enter') return;

    const text = this.textFieldEl.value.trim();

    if (!text) return;
    this.addingBlock = 'text';

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const box = new TextBlock(this.tasksBoxEl, text, coords);
        box.init();
        this.textFieldEl.value = '';
        this.addingBlock = null;
      },

      () => {
        this.modals.msgModal.show();
      },
    );

    this.textFieldEl.blur();
  }

  onModalClick(event) {
    event.preventDefault();
    const { classList } = event.target;
    const modalType = event.target.closest('.modal').dataset.type;

    if (classList.contains('cancel-btn')) {
      this.modals[modalType].hide();

      if (modalType === 'msgModal') {
        this.switchRecordPanel();
      }

      return;
    }

    if (classList.contains('ok-btn')) {
      if (modalType === 'delModal') {
        this.selectedTask.remove();
        this.selectedTask = null;
        this.modals[modalType].hide();
        return;
      }

      if (modalType === 'editModal') {
        this.modals.editModal.setValues(this.selectedTask);
        this.modals.editModal.hide();
        return;
      }

      if (modalType === 'errModal') {
        this.modals.errModal.hide();
        this.switchRecordPanel();
        this.previewEl.classList.add('hidden');
        return;
      }

      if (modalType === 'msgModal') {
        const coords = this.modals.msgModal.form.querySelector('input').value;

        if (fn.isValid(coords)) {
          const coordsString = fn.getStringFromCoords(coords);
          const coordsArr = coordsString.split(', ');

          const latitude = coordsArr[0];
          const longitude = coordsArr[1];

          if (this.addingBlock === 'text') {
            const box = new TextBlock(this.tasksBoxEl,
              this.textFieldEl.value, { latitude, longitude });
            box.init();
          } else if (this.addingBlock === 'audio') {
            fn.recordStream(this, 'audio', AudioBlock, { latitude, longitude })
              .then((recorder) => {
                recorder.start();
                this.timer.start();
                this.addingBlock = 'null';
              })
              .catch((error) => {
                const { message } = error;
                this.modals.errModal.show();
                this.modals.errModal.setMessage(message);
              });

          } else {
            fn.recordStream(this, 'video', VideoBlock, { latitude, longitude })
              .then((recorder) => {
                recorder.start();
                this.timer.start();
                this.addingBlock = 'null';
              })
              .catch((error) => {
                const { message } = error;
                this.modals.errModal.show();
                this.modals.errModal.setMessage(message);
              });
          }

          this.addingBlock = null;
          this.modals.msgModal.hide();
          this.textFieldEl.value = '';
        } else {
          const errorBox = this.modals.msgModal.form.querySelector('.error-box');
          errorBox.classList.remove('hidden');
          setTimeout(() => errorBox.classList.add('hidden'), 2000);
        }
      }
    }
  }

  onTaskClick(event) {
    const { target } = event;
    const { classList } = target;

    if (target.closest('.media-block')) {
      this.selectedTask = target.closest('.media-block');
    }

    if (classList.contains('del-icon')) {
      this.modals.delModal.show();
      return;
    }

    if (classList.contains('edit-icon')) {
      this.modals.editModal.show();
      this.modals.editModal.getValues(this.selectedTask);
      return;
    }

    if (classList.contains('visibility-icon')) {
      target.classList.toggle('to-visible');
      target.previousElementSibling.classList.toggle('invisible');
    }
  }

  onRecordClick(event) {
    const { target } = event;
    const { classList } = target;

    if (target.closest('.variant-icons-field')) {
      this.switchRecordPanel();
    }

    if (target.closest('.start-record-btns')) {
      if (!window.MediaDevices) {
        this.modals.errModal.show();
        this.modals.errModal.setMessage('Ваш браузер не поддерживает MediaDevices!');
        return;
      }

      if (!window.MediaRecorder) {
        this.modals.errModal.show();
        this.modals.errModal.setMessage('Ваш браузер не поддерживает MediaRecorder!');
        return;
      }

      if (classList.contains('phone-icon')) {
        this.addingBlock = 'audio';

        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            fn.recordStream(this, 'audio', AudioBlock, coords)
              .then((recorder) => {
                recorder.start();
                this.timer.start();
                this.addingBlock = 'null';
              })
              .catch((error) => {
                const { message } = error;
                this.modals.errModal.show();
                this.modals.errModal.setMessage(message);
              });
          },

          () => {
            this.modals.msgModal.show();
          },
        );

        return;
      }

      if (classList.contains('camera-icon')) {
        this.addingBlock = 'video';
        this.previewEl.classList.remove('hidden');

        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            fn.recordStream(this, 'video', VideoBlock, coords)
              .then((recorder) => {
                recorder.start();
                this.timer.start();
                this.addingBlock = 'null';
              })
              .catch((error) => {
                const { message } = error;
                this.modals.errModal.show();
                this.modals.errModal.setMessage(message);
              });
          },

          () => {
            this.modals.msgModal.show();
          },
        );

        return;
      }
    }

    if (target.closest('.on-record-btns')) {
      this.previewEl.classList.add('hidden');

      if (classList.contains('end-record-icon')) {
        this.canAddBlock = true;
      }

      if (classList.contains('cancel-record-icon')) {
        this.canAddBlock = false;
      }

      this.timer.stop();
      this.recorder.stop();
      this.stream.getTracks().forEach((track) => track.stop());
      this.recorder = null;
      this.stream = null;
    }
  }
}
