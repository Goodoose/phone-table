// eslint-disable-next-line import/extensions
import PhonesServices from '../phone-service/phone-services.js';

export default class PhonesTable {
  constructor({ element }) {
    this._element = element;
    this._showCatalog();
  }

  _render() {
    this._element.innerHTML = `
      <table class="table">
        <tbody>  
          <tr>
              <th class="table__head">age</th>              
              <th class="table__head">id</th>
              <th class="table__head">imageUrl</th>
              <th class="table__head">name</th>
              <th class="table__head">snippet</th>
              <th class="table__head">carrier</th>
          </tr>
          ${this._phones.map(phone => `
            <tr>
                <td class="table__item">${phone.age}</td>                
                <td class="table__item">${phone.id}</td>
                <td class="table__item">
                  <img class="small__img" src = ${phone.imageUrl}
                </td>
                <td class="table__item">${phone.name}</td>
                <td class="table__item">${phone.snippet}</td>
                <td class="table__item">${phone.carrier ? phone.carrier : ''}</td>
            </tr>
          `).join('')}
          
        </tbody>
      </table>
    `;
  }

  async _showCatalog() {
    this._phones = await PhonesServices.getPhones();
    this._render();
  }
}
