export default class Timer {
  constructor({ updateUserInterface, disableBtn, disableInput }) {
    this.updateUserInterface = updateUserInterface;
    this.disableBtn = disableBtn;
    this.disableInput = disableInput;
  }

  start(userTime) {
    setInterval(() => {
      const currentTime = Date.now();
      const delta = userTime - currentTime;
      this.updateUserInterface(this.convertMs(delta));
      this.disableBtn();
      this.disableInput();
    }, 1000);
  }
  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.addLeadingZero(Math.floor(ms / day));

    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));

    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );

    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }
  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}
