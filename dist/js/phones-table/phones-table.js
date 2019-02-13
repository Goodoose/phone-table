import PhonesServices from '../phone-service/phone-services.js';
import Component from './component/component.js';

export default class PhonesTable extends Component {
  constructor({ element }) {
    super({ element });
    this.typeSortUpOrDown = true;
    this._phones = [];
    this._phonesTemp = [];
    this._render();
    this._getData();
  }

  async _getData() {
    this.phoneData = await PhonesServices.getPhones();
    this._initialPhones();
  }

  _initialPhones() {
    this.phoneData.forEach((phone) => {
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
    this._renderTableHeader();
    this._renderTableBody();
    this._addEvenListeners();
  }

  _addEvenListeners() {
    this._element.addEventListener('click', this.debounce((event) => {
      const sortedElem = event.target.closest('[data-table-sort]');
      if (!sortedElem) { return; }
      const sortBy = sortedElem.dataset.tableSort;
      this.typeSortUpOrDown = !this.typeSortUpOrDown;
      this._phones = this._phones.sort((a, b) => {
        if (typeof a[sortBy].content === 'number') {
          if (this.typeSortUpOrDown) {
            return a[sortBy].content - b[sortBy].content;
          }
          return b[sortBy].content - a[sortBy].content;
        }
        if (this.typeSortUpOrDown) {
          return a[sortBy].content.localeCompare(b[sortBy].content);
        }
        return b[sortBy].content.localeCompare(a[sortBy].content);
      });
      this._renderTableBody();
    }, 100));

    this._element.addEventListener('keydown', this.debounce((event) => {
      const query = event.target.closest('[data-input-search]');
      if (!query) {
        return;
      }
      this._phones = this._phonesTemp.filter(phone => Object.values(phone)
        .find((property) => {
          if (property.isSearchable) {
            const phoneContent = property.content.toLowerCase();
            const queryContent = query.value.toLowerCase();
            return phoneContent.includes(queryContent);
          }
          return false;
        }));
      this._renderTableBody();
    }, 500));
  }

  _renderTableBody() {
    const tableBody = this._element.querySelector('[data-table-body]');
    tableBody.innerHTML = `
      ${ this._phones.map(phone => `
        <tr>    
          ${Object.values(phone).map(value => `

            <td class="table__item" ${value.isSearchable // eslint-disable-next-line indent
              ? `
              data-table-search="${phone.name.content}"
              ` : ''}>

              ${value.isImage // eslint-disable-next-line indent
                ? `
                <img class="small__img" src=${value.content}
                ` : `${value.content}` // eslint-disable-next-line indent
              }
            </td>

          `).join('')}
        </tr>
      `).join('')}
    `;
  }

  _renderTableHeader() {
    const tableHeader = this._element.querySelector('[data-table-header]');
    tableHeader.innerHTML = `
    
      <tr>

        ${Object.entries(this._phonesTemp[0]).map(([key, value]) => `

          <th 
            ${value.isSortable // eslint-disable-next-line indent
              ? `
              class="table__head table__filtered" data-table-sort="${key}"
              ` : 'class="table__head"' // eslint-disable-next-line indent
            }
          >
            ${value.title}
          </th>

        `).join('')}
      </tr>
    `;
  }

  _render() {
    this._element.innerHTML = `
      <p> 
        search:
        <br />
        <input type="text" data-input-search>
      </p>
      <br />
      <br />
    
      <table class="table">

        <thead data-table-header></thead>

        <tbody data-table-body></tbody>

      </table>
    `;
  }
}
