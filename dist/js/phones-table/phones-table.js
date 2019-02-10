// eslint-disable-next-line import/extensions
import PhonesServices from '../phone-service/phone-services.js';
// eslint-disable-next-line import/extensions
import Components from './components/components.js';

export default class PhonesTable extends Components {
  constructor({ element }) {
    super({ element });
    this.sortUpDown = true;
    this._phones = [];
    this._phonesTemp = [];
    this._getData();

    this._element.addEventListener('click', this.debounce((event) => {
      const sortedElem = event.target.closest('[data-table-sort]');
      if (!sortedElem) { return; }
      const sortBy = sortedElem.dataset.tableSort;
      this.sortUpDown = !this.sortUpDown;
      this._phones = this.sortPhones(this._phones, sortBy, this.sortUpDown);
      this._render();
    }, 100));

    document.addEventListener('keydown', this.debounce((event) => {
      const delegateTarget = event.target.closest('[data-input-search]');
      if (!delegateTarget) { return; }
      this._phones = this._phonesTemp.filter((phone) => {
        return Object.values(phone)
          .find(value => value.isSearchable && value.content.toLowerCase()
            .includes(delegateTarget.value.toLowerCase()));
      });
      this._render();
    }, 500));
  }

  async _getData() {
    const phoneData = await PhonesServices._getPhones();
    phoneData.forEach((phone) => {
      // eslint-disable-next-line no-param-reassign
      const newPhone = {
        age: {
          title: 'Возраст',
          content: phone.age,
          isSortable: true,
        },
        name: {
          title: 'Наименование',
          content: phone.name,
          isSortable: true,
          isSearchable: true,
        },
        imageUrl: {
          title: 'Картинка',
          content: phone.imageUrl,
          isImage: true,
        },
        snippet: {
          title: 'Описание',
          content: phone.snippet,
          isSearchable: true,
        },
      };
      this._phones.push(newPhone);
    });

    this._phonesTemp = this._phones;
    this._render();
  }

  _render() {
    this._element.innerHTML = `
    
      <table class="table">
        <thead>
          <tr data-table-header>

          ${Object.entries(this._phonesTemp[0]).map(([key, value]) => `

          <th ${value.isSortable ? `
            class="table__head table__filtered" data-table-sort="${key}"
            ` : 'class="table__head"'}>
            ${value.title}
          </th>

          `).join('')}
          </tr>
        </thead>
        <tbody>
          ${this._phones.map(phone => `
            <tr>    
              ${Object.values(phone).map(value => `

                <td class="table__item" ${value.isSearchable ? `
                  data-table-search="${phone.name.content}"` : ''}>

                  ${value.isImage ? `
                  <img class="small__img" src=${value.content}
                  ` : `${value.content}`}

                </td>

              `).join('')}
            </tr>
          `).join('')}
          
        </tbody>
      </table>
    `;
  }
}
