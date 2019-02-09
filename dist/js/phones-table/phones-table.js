// eslint-disable-next-line import/extensions
import PhonesServices from '../phone-service/phone-services.js';

export default class PhonesTable {
  constructor({ element }) {
    this._element = element;
    this._phones = [];
    this._phonesTemp = [];
    this._getPhonesFromServer();

    this._element.addEventListener('click', (event) => {
      const sortedElem = event.target.closest('[data-table-item]');
      if (!sortedElem) { return; }
      const sortBy = sortedElem.dataset.tableItem;
      this._phones = this._phones.sort((a, b) => {
        if (a[sortBy] > b[sortBy]) {
          return 1;
        }
        if (a[sortBy] < b[sortBy]) {
          return -1;
        }
        return 0;
      });
      this.show();
    });

    function clickEveryButton(fun, ms) {
      let timer = null;
      // eslint-disable-next-line func-names
      return function () {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          // eslint-disable-next-line prefer-rest-params
          fun.apply(this, arguments);
        }, ms);
      };
    }

    document.addEventListener('keypress', clickEveryButton((event) => {
      const delegateTarget = event.target.closest('[data-input-search]');
      if (!delegateTarget) { return; }
      this._phones = this._phonesTemp.filter(phone => phone.name.toLowerCase()
        .includes(delegateTarget.value.toLowerCase()));
      this.show();
    }, 500));
  }

  async _getPhonesFromServer() {
    this._phones = await PhonesServices._getPhones();
    this._phonesTemp = this._phones;
    this.show();
  }

  show() {
    this._render();
  }

  _render() {
    this._element.innerHTML = `
    
      <table class="table">
        <tbody>
          <tr data-table-header>
            <th class="table__head table__filtered" data-table-item="age">AGE</th>
            <th class="table__head table__filtered" data-table-item="name">NAME</th>
            <th class="table__head">IMAGE</th>
            <th class="table__head">SNIPPET</th>
          </tr>
          ${this._phones.map(phone => `
            <tr>    
              <td class="table__item">${phone.age}</td>  
              <td class="table__item">${phone.name}</td>
              <td class="table__item">
                <img class="small__img" src = ${phone.imageUrl}
              </td>
              <td class="table__item">${phone.snippet}</td>
            </tr>
          `).join('')}
          
        </tbody>
      </table>
    `;
  }
}
