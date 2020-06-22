'use strict';

document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var WIZARDS_QUANTITY = 4;

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var COLOR_COAT = ['101, 137, 164', '241, 43, 107', '146, 100, 161', '56, 159, 117', '215, 210, 55', '0, 0, 0'];

var COLOR_EYES = ['black', 'red', 'blue', 'yellow', 'green'];

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

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

setupOpen.addEventListener('click', function () {
  setup.classList.remove('hidden');
});

setupClose.addEventListener('click', function () {
  setup.classList.add('hidden');
});
