export default class Component {
  constructor({ element }) {
    this._element = element;
  }

  on(nameEvent, selector, callback) {
    this._element.addEventListener(nameEvent, (e) => {
      const delegateTarget = e.target.closest(selector);
      if (!delegateTarget) { return; }
      callback(e);
    });
  }
}
