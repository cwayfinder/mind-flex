const speedEl = document.querySelector('#speed');
const speedIndicatorEl = document.querySelector('#speed-indicator');
const legsEl = document.querySelector('#legs');

const contentEl = document.querySelector('.content');
const groupEl = document.querySelector('#group');
const letterEl = document.querySelector('#letter');
const handEl = document.querySelector('#hand');
const legEl = document.querySelector('#leg');

const gRect = groupEl.getBoundingClientRect();
const cRect = contentEl.getBoundingClientRect();
const maxTop = cRect.height - gRect.height;
const maxLeft = cRect.width - gRect.width;

let interval;

const cyrillic = {
    letters: 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЭЮЯ',
    hands: 'ЛПО',
    legs: 'ЛПО',
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomChar(options) {
    return options[getRandomInt(0, options.length - 1)];
}

function changePosition() {
    const top = getRandomInt(0, maxTop);
    const left = getRandomInt(0, maxLeft);

    groupEl.style.setProperty("--g-top", top + 'px');
    groupEl.style.setProperty("--g-left", left + 'px');
}

function changeLetter(set) {
    letterEl.textContent = getRandomChar(set.letters);
}

function changeHand(set) {
    handEl.textContent = getRandomChar(set.hands);
}

function changeLeg(set) {
    legEl.textContent = getRandomChar(set.legs);
}

function run(delay) {
    if (interval) {
        clearInterval(interval);
    }

    interval = setInterval(() => {
        changePosition();
        changeLetter(cyrillic);
        changeHand(cyrillic);
        changeLeg(cyrillic);
    }, delay);
}

function update() {
    const speed = speedEl.value;
    run(speed);
    speedIndicatorEl.textContent = `${speed}ms`;

    if (legsEl.checked) {
        legEl.removeAttribute('hidden');
    } else {
        legEl.setAttribute('hidden', 'hidden');
    }
}

update();
speedEl.addEventListener('change', () => update());
legsEl.addEventListener('change', () => update());
