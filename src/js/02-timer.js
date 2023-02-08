// Описаний в документації
import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Додатковий імпорт стилів
import 'flatpickr/dist/themes/dark.css';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import '../css/timer.css';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
  inputField: document.querySelector('#datetime-picker'),
};

const disableStartBtn = () => {
  refs.startBtn.setAttribute('disabled', 'disabled');
};

const disableInputField = () => {
  refs.inputField.setAttribute('disabled', 'disabled');
}

const activeStartBtn = () => {
  refs.startBtn.removeAttribute('disabled');
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();

    if (currentDate.getTime() > selectedDates[0].getTime()) {
      Notify.failure('Please choose a date in the future');
    } else {
      Notify.success("That's correct date! You may start timer!");
      activeStartBtn();
      disableInputField();
    }
  },
};

const calendar = flatpickr('#datetime-picker', options);

class Timer {
  constructor({ updateUserInterface, disableBtn }) {
    this.updateUserInterface = updateUserInterface;
    this.disableBtn = disableBtn;
  }

  start(userTime) {
    setInterval(() => {
      const currentTime = Date.now();
      const delta = userTime - currentTime;
      this.updateUserInterface(this.convertMs(delta));
      this.disableBtn();
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

const timer = new Timer({
  updateUserInterface: updateClockFace,
  disableBtn: disableStartBtn,
});

const onClickStartTimer = () => {
  timer.start(calendar.selectedDates[0].getTime());
};

Notify.init({
  width: '280px',
  position: 'right-top', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'
  distance: '10px',
  opacity: 1,
  borderRadius: '5px',
  rtl: false,
  timeout: 3000,
  messageMaxLength: 110,
  backOverlay: false,
  backOverlayColor: 'rgba(0,0,0,0.5)',
  plainText: true,
  showOnlyTheLastOne: false,
  clickToClose: false,
  pauseOnHover: true,

  ID: 'NotiflixNotify',
  className: 'notiflix-notify',
  zindex: 4001,
  fontFamily: 'Quicksand',
  fontSize: '13px',
  cssAnimation: true,
  cssAnimationDuration: 400,
  cssAnimationStyle: 'from-right', // 'fade' - 'zoom' - 'from-right' - 'from-top' - 'from-bottom' - 'from-left'
  closeButton: false,
  useIcon: true,
  useFontAwesome: false,
  fontAwesomeIconStyle: 'shadow', // 'basic' - 'shadow'
  fontAwesomeIconSize: '34px',

  success: {
    background: '#32c682',
    textColor: '#fff',
    childClassName: 'notiflix-notify-success',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-check-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(50,198,130,0.2)',
  },

  failure: {
    background: '#ff5549',
    textColor: '#fff',
    childClassName: 'notiflix-notify-failure',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-times-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(255,85,73,0.2)',
  },
});

disableStartBtn();

refs.startBtn.addEventListener('click', onClickStartTimer);

function updateClockFace(userData) {
  Object.keys(userData).forEach(key => {
    refs[key].textContent = userData[key];
  });
}
