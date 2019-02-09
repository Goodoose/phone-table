export default class PhonesServices {
  static async _getPhones(sortBy, filteredBy) {
    const response = await fetch('./phones/phones.json');
    return await response.json();
  }
}

// I like it better))
/* export default class PhonesServices {
  static _getPhones(sortBy, filteredBy) {
    return fetch('./phones/phones.json')
      .then(response => response.json())
      .then(phones => phones.filter((phone) => {
        return phone.name.toLowerCase()
          .includes(filteredBy.toLowerCase());
      }))
      .then((phones) => {
        return phones.sort((a, b) => {
          if (a[sortBy] > b[sortBy]) {
            return 1;
          }
          if (a[sortBy] < b[sortBy]) {
            return -1;
          }
          return 0;
        });
      });
  }
} */
