export default class Components {
  constructor({ element }) {
    this._element = element;
  }

  // eslint-disable-next-line class-methods-use-this
  debounce(funcTimeout, ms) {
    let timer = null;
    // eslint-disable-next-line func-names
    return function () {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
      // eslint-disable-next-line prefer-rest-params
        funcTimeout.apply(this, arguments);
      }, ms);
    };
  }

  // eslint-disable-next-line class-methods-use-this
  sortPhones(phones, sortBy, isTrue) {
    phones.sort((a, b) => {
      if (a[sortBy].content > b[sortBy].content) {
        if (isTrue) { return 1; }
        return -1;
      }
      if (a[sortBy].content < b[sortBy].content) {
        if (isTrue) { return -1; }
        return 1;
      }
      return 0;
    });
    return phones;
  }
}
