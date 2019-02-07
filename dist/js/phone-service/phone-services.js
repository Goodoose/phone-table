export default class PhoneServices {
  static getPhones() {
    const url = './phones/phones.json';
    return fetch(url)
      .then(response => response.json())
      .then(data => data);
  }
}
