const AddressDBA = require("../dba/addressDBA");

module.exports = class AddressModel {
  find(postalCode) {
    const that = this;
    return new Promise(function(resolve, reject) {
      that.DBA_find(postalCode).then(sqlResult => {
        if (sqlResult.error) {
          return reject(sqlResult.error);
        } else {
          return resolve(sqlResult.row);
        }
      });
    });
  }

  create(address) {
    const that = this;
    return new Promise(function(resolve, reject) {
      that
        .DBA_create(
          address.number,
          address.street,
          address.city,
          address.province,
          address.postalCode
        )
        .then(sqlResult => {
          if (sqlResult.error) {
            return reject(sqlResult.error);
          } else {
            return resolve(sqlResult.row);
          }
        });
    });
  }

  remove(postalCode) {
    const that = this;
    return new Promise(function(resolve, reject) {
      that.DBA_remove(postalCode).then(sqlResult => {
        if (sqlResult.error) {
          return reject(sqlResult.error);
        } else {
          return resolve(sqlResult.id);
        }
      });
    });
  }

  DBA_find(name) {
    return AddressDBA.find(name);
  }

  DBA_create(number, street, city, province, postalCode) {
    return AddressDBA.create(number, street, city, province, postalCode);
  }

  DBA_remove(postalCode) {
    return AddressDBA.removeByPostalCode(postalCode);
  }
};
