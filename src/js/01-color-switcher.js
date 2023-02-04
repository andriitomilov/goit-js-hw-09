// 1
// при натисканні старт запускается інтервал, який встановлює
// на тіло документа інлайн фононовий кольор
// вішає на кнопку атрибут disable
// 2
// при натисканні кнопки стоп інтервал знімається
// кнопка старт стає активною

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
};

const onClickStopChangeBgColor = () => {
  activateBtn(refs.start);
  clearInterval(intervalId);
};

refs.start.addEventListener('click', onClickStartChangeBgColor);
refs.stop.addEventListener('click', onClickStopChangeBgColor);