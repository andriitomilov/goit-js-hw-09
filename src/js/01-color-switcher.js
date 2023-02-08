import '../css/color-switcher.css';

let intervalId = null;
const refs = {
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
};

const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const inlineBodyBackgroundColor = color => {
  document.body.style.backgroundColor = `${color}`;
};

const disableBtn = element => {
  element.setAttribute('disabled', '');
};

const activateBtn = element => {
  element.removeAttribute('disabled');
};

const onClickStartChangeBgColor = () => {
  intervalId = setInterval(() => {
    inlineBodyBackgroundColor(getRandomHexColor());
  }, 1000);
  disableBtn(refs.start);
  activateBtn(refs.stop);
};

const onClickStopChangeBgColor = () => {
  activateBtn(refs.start);
  disableBtn(refs.stop);
  clearInterval(intervalId);
};

disableBtn(refs.stop);
refs.start.addEventListener('click', onClickStartChangeBgColor);
refs.stop.addEventListener('click', onClickStopChangeBgColor);
