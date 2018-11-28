const sqlite3 = require("sqlite3").verbose();
const config = require("../config/config.js");

class AddressDBA {
  constructor() {
    const dbPath = config.getDBPath();

    this.db = new sqlite3.Database(dbPath, function(err) {
      if (err) {
        console.log(
          "Error - Address DBA : Could not connect to the database",
          err
        );
      }
    });
    this.db.configure("busyTimeout", 5000);
  }

  /*
  get(id) {
    const that = this;

    const sql = "SELECT * FROM ADDRESS WHERE addressID = ?";

    return new Promise(function(resolve, reject) {
      that.db.get(sql, [id], (error, row) =>
        resolve({
          error: error,
          row: row
        })
      );
    });
  }
  */

  /*
  getAll() {
    const that = this;

    const sql = "SELECT * FROM ADDRESS";

    return new Promise(function(resolve, reject) {
      that.db.all(sql, (error, rows) =>
        resolve({
          error: error,
          rows: rows
        })
      );
    });
  }
  */

  find(postalCode) {
    const that = this;

    const sql = "SELECT * FROM ADDRESS WHERE addressPostalCode = ?";

    return new Promise(function(resolve, reject) {
      that.db.get(sql, [postalCode], (error, row) =>
        resolve({
          error: error,
          row: row
        })
      );
    });
  }

  create(number, street, city, province, postalCode) {
    const that = this;

    const sql =
      "INSERT INTO " +
      "ADDRESS(addressNumber, addressStreet, addressCity, " +
      "addressProvince, addressPostalCode) " +
      "VALUES(?, ?, ?, ?, ?)";

    return new Promise(function(resolve, reject) {
      that.db.run(sql, [number, street, city, province, postalCode], function(
        error
      ) {
        return resolve({
          error: error,
          row: this.lastID
        });
      });
    });
  }

  /*
  update(id, number, street, city, province, postalCode) {
    const that = this;

    const sql =
      "UPDATE ADDRESS " +
      "SET addressNumber = ?, addressStreet = ?, addressCity = ?, " +
      "addressProvince = ?, addressPostalCode = ?" +
      "WHERE addressID = ?";

    return new Promise(function(resolve, reject) {
      that.db.run(
        sql,
        [number, street, city, province, postalCode, id],
        error =>
          resolve({
            error: error,
            row: id
          })
      );
    });
  }
  */

  removeByPostalCode(postalCode) {
    const that = this;

    const sql = "DELETE FROM ADDRESS WHERE addressPostalCode = ?";

    return new Promise(function(resolve, reject) {
      that.db.run(sql, [postalCode], error =>
        resolve({
          error: error,
          postalCode: postalCode
        })
      );
    });
  }
}

module.exports = new AddressDBA();
