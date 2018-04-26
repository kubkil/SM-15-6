class Stopwatch {
  constructor(display) {
    this.running = false;
    this.display = display;
    // the two methods below run right after a new instance of Stopwatch is created
    this.reset();
    this.print(this.times);
  }

  reset() {
    this.times = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
    // if (this.running) {
    //   this.stop();
    // }
    // this.print();
  }

  print() {
    this.display.innerText = this.format(this.times);
  }

  format(times) {
    return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
  }

  start() {
    if (!this.running) {
      this.running = true;
      this.watch = setInterval(() => this.step(), 10);
    }
  }

  step() {
    // return what?
    if (!this.running) return;
    this.calculate();
    this.print();
  }

  calculate() {
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

  stop() {
    this.running = false;
    clearInterval(this.watch);
  }

  lap() {
    const lapResultsList = document.querySelector('.results');
    const lapResultItem = document.createElement('li');
    lapResultItem.className = 'result';
    lapResultsList.appendChild(lapResultItem);
    lapResultItem.innerHTML = this.display.innerText;
    this.reset();
    this.start();
  }

  resetAll() {
    this.reset();
    const resetAllResultsList = document.querySelector('.results');
    resetAllResultsList.innerHTML = '';
  }

}

// under class declaration because it is not hoisted, unlike function declarations
// .stopwatch is an argument of constructor function from line 2
// querySelector and getElement in one file? shouldn't I settle on one?
const stopWatch = new Stopwatch(document.querySelector('.stopwatch'));

const startButton = document.getElementById('start');
// initializes start func - property of stopWatch object which is in turn an instance of Stopwatch class
startButton.addEventListener('click', () => stopWatch.start());

const stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopWatch.stop());

const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopWatch.reset());

const lapButton = document.getElementById('lap');
lapButton.addEventListener('click', () => stopWatch.lap());

const resetAllButton = document.getElementById('reset-all');
resetAllButton.addEventListener('click', () => stopWatch.resetAll());

function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}