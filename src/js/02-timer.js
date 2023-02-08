// Описаний в документації
import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Timer from './timer';
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
};

const activeStartBtn = () => {
  refs.startBtn.removeAttribute('disabled');
};

const updateClockFace = userData => {
  Object.keys(userData).forEach(key => {
    refs[key].textContent = userData[key];
  });
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
      disableStartBtn();
    } else {
      Notify.success("That's correct date! You may start timer!");
      activeStartBtn();
    }
  },
};

const calendar = flatpickr('#datetime-picker', options);

const timer = new Timer({
  updateUserInterface: updateClockFace,
  disableBtn: disableStartBtn,
  disableInput: disableInputField,
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
