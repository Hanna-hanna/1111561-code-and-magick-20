'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var GAP_STROKE = 30;
var GAP_COLUMN = 50;
var FONT_GAP = 25;
var BAR_HEIGHT = CLOUD_HEIGHT - 2 * GAP_STROKE - 3 * FONT_GAP;
var BAR_WIDTH = 40;

var renderCloud = function (ctx, x, y, color, width, height) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)', CLOUD_WIDTH, CLOUD_HEIGHT);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff', CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP_STROKE, CLOUD_Y + GAP_STROKE);
  ctx.fillText('Список результатов:', CLOUD_X + GAP_STROKE, CLOUD_Y + GAP_STROKE + FONT_GAP);
  ctx.font = '16px PT Mono';

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000';
    var namesX = CLOUD_X + GAP_COLUMN + (GAP_COLUMN + BAR_WIDTH) * i;
    var namesY = CLOUD_HEIGHT - GAP;
    ctx.fillText(names[i], namesX, namesY);
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, ' + getRandomNumber(1, 100) + '% , 50%)';
    }
    var columnsX = CLOUD_X + GAP_COLUMN + (GAP_COLUMN + BAR_WIDTH) * i;
    var columnsY = CLOUD_HEIGHT - GAP - FONT_GAP - (BAR_HEIGHT * times[i]) / maxTime;
    var columnsW = BAR_WIDTH;
    var columnsH = (BAR_HEIGHT * times[i]) / maxTime;
    ctx.fillRect(columnsX, columnsY, columnsW, columnsH);

    var timesX = CLOUD_X + GAP_COLUMN + (GAP_COLUMN + BAR_WIDTH) * i;
    var timesY = CLOUD_HEIGHT - GAP - FONT_GAP - (BAR_HEIGHT * times[i]) / maxTime - GAP;
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), timesX, timesY);
  }
};
