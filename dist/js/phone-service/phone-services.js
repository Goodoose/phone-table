export default class PhonesServices {
  static async getPhones() {
    const response = await fetch('./phones/phones.json');
    // eslint-disable-next-line no-return-await
    return await response.json();
  }
}
