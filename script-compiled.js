'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stopwatch = function () {
  function Stopwatch(display) {
    _classCallCheck(this, Stopwatch);

    this.running = false;
    this.display = display;
    // the two methods below run right after a new instance of Stopwatch is created
    this.reset();
    this.print(this.times);
  }

  _createClass(Stopwatch, [{
    key: 'reset',
    value: function reset() {
      this.times = {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      };
      if (this.running) {
        this.stop();
      }
      this.print();
    }
  }, {
    key: 'print',
    value: function print() {
      this.display.innerText = this.format(this.times);
    }
  }, {
    key: 'format',
    value: function format(times) {
      return pad0(times.minutes) + ':' + pad0(times.seconds) + ':' + pad0(Math.floor(times.miliseconds));
    }
  }, {
    key: 'start',
    value: function start() {
      var _this = this;

      if (!this.running) {
        this.running = true;
        this.watch = setInterval(function () {
          return _this.step();
        }, 10);
      }
    }
  }, {
    key: 'step',
    value: function step() {
      // return what?
      if (!this.running) return;
      this.calculate();
      this.print();
    }
  }, {
    key: 'calculate',
    value: function calculate() {
      this.times.miliseconds += 1;
      if (this.times.miliseconds >= 100) {
        this.times.seconds += 1;
        this.times.miliseconds = 0;
      }
      if (this.times.seconds >= 60) {
        this.times.minutes += 1;
        this.times.seconds = 0;
      }
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.running = false;
      clearInterval(this.watch);
    }
  }, {
    key: 'lap',
    value: function lap() {
      var lapResultsList = document.querySelector('.results');
      var lapResultItem = document.createElement('li');
      lapResultItem.className = 'result';
      lapResultsList.appendChild(lapResultItem);
      lapResultItem.innerHTML = this.display.innerText;
      this.reset();
      this.start();
    }
  }, {
    key: 'resetAll',
    value: function resetAll() {
      this.reset();
      var resetAllResultsList = document.querySelector('.results');
      resetAllResultsList.innerHTML = '';
    }
  }]);

  return Stopwatch;
}();

// under class declaration because it is not hoisted, unlike function declarations
// .stopwatch is an argument of constructor function from line 2
// querySelector and getElement in one file? shouldn't I settle on one?


var stopWatch = new Stopwatch(document.querySelector('.stopwatch'));

var startButton = document.getElementById('start');
// initializes start func - property of stopWatch object which is in turn an instance of Stopwatch class
startButton.addEventListener('click', function () {
  return stopWatch.start();
});

var stopButton = document.getElementById('stop');
stopButton.addEventListener('click', function () {
  return stopWatch.stop();
});

var resetButton = document.getElementById('reset');
resetButton.addEventListener('click', function () {
  return stopWatch.reset();
});

var lapButton = document.getElementById('lap');
lapButton.addEventListener('click', function () {
  return stopWatch.lap();
});

var resetAllButton = document.getElementById('reset-all');
resetAllButton.addEventListener('click', function () {
  return stopWatch.resetAll();
});

function pad0(value) {
  var result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}
