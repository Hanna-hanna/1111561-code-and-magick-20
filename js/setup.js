'use strict';

document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var WIZARDS_QUANTITY = 4;

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var COLOR_COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var COLOR_EYES = ['black', 'red', 'blue', 'yellow', 'green'];

var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var randomData = function (arrayName) {
  return Math.floor(Math.random() * arrayName.length);
};

function createFullName(name, lastName) {
  return name + ' ' + lastName;
}

function createWizard(names, surnames, coats, eyes, randomFunc) {
  var wizard = {
    name: createFullName(names[randomFunc(names)], surnames[randomFunc(surnames)]),
    coatColor: coats[randomFunc(coats)],
    eyesColor: eyes[randomFunc(eyes)]
  };
  return wizard;
}

function createWizardsArray(length, names, surnames, coats, eyes, randomFunc) {
  for (var i = 1, arr = []; i <= length; i++) {
    arr.push(createWizard(names, surnames, coats, eyes, randomFunc));
  }
  return arr;
}

var wizards = createWizardsArray(WIZARDS_QUANTITY, FIRST_NAMES, LAST_NAMES, COLOR_COAT, COLOR_EYES, randomData);

for (var i = 0; i < wizards.length; i++) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;

  similarListElement.appendChild(wizardElement);
}

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');

var openPopup = function () {
  setup.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup();
  }
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});

var userNameInput = document.querySelector('.setup-user-name');
var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;
var setupWizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var setupWizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var setupFireballWrap = document.querySelector('.setup-fireball-wrap');
var coatColorInput = document.querySelector('.setup-coat-color');
var eyesColorInput = document.querySelector('.setup-eyes-color');
var fireballColorInput = document.querySelector('.fireball-color');

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function () {
  var valueLength = userNameInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) +' симв.');

  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) +' симв.');
  } else {
    userNameInput.setCustomValidity('');
  }
});

var setupNewColor = function (arr, randomFunc) {
  var newColor = arr[randomFunc(arr)];
  return newColor;
};

setupWizardCoat.addEventListener('click', function () {
  setupWizardCoat.style.fill = setupNewColor(COLOR_COAT, randomData);
  coatColorInput.value = setupNewColor(COLOR_COAT, randomData);
});

setupWizardEyes.addEventListener('click', function () {
  setupWizardEyes.style.fill = setupNewColor(COLOR_EYES, randomData);
  eyesColorInput.value = setupNewColor(COLOR_EYES, randomData);
});

setupFireballWrap.addEventListener('click', function () {
  setupFireballWrap.style.background = setupNewColor(FIREBALL_COLOR, randomData);
  fireballColorInput.value = setupNewColor(FIREBALL_COLOR, randomData);
});





