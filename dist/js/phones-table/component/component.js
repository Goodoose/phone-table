export default class Component {
  constructor({ element }) {
    this._element = element;
  }

  debounce(funcTimeout, ms) {
    this.timer = null;
    return function setTimer(...arg) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        funcTimeout.apply(this, arg);
      }, ms);
    };
  }
}
