const sqlite3 = require("sqlite3").verbose();
const config = require("../config/config.js");

class OrganismDBA {
  constructor() {
    const dbPath = config.getDBPath();

    this.db = new sqlite3.Database(dbPath, function(err) {
      if (err) {
        console.log(
          "Error - Organism DBA : Could not connect to the database",
          err
        );
      }
    });
    this.db.configure("busyTimeout", 5000);
  }

  get(id) {
    const that = this;

    const sql =
      "SELECT " +
      "ORGANISM.organismID, " +
      "ORGANISM.organismName, " +
      "ADDRESS.addressNumber, " +
      "ADDRESS.addressStreet," +
      "ADDRESS.addressCity, " +
      "ADDRESS.addressProvince, " +
      "ADDRESS.addressPostalCode, " +
      "ORGANISM.organismPhone, " +
      "ORGANISM.organismFax, " +
      "ORGANISM.organismEmail, " +
      "ORGANISM.organismActive " +
      "FROM ORGANISM " +
      "INNER JOIN ADDRESS ON ORGANISM.addressID=ADDRESS.addressID " +
      "WHERE organismID = ?";

    return new Promise(function(resolve, reject) {
      that.db.get(sql, [id], (error, row) =>
        resolve({
          error: error,
          row: row
        })
      );
    });
  }

  getAll() {
    var that = this;

    const sql =
      "SELECT " +
      "ORGANISM.organismID, " +
      "ORGANISM.organismName, " +
      "ADDRESS.addressNumber, " +
      "ADDRESS.addressStreet," +
      "ADDRESS.addressCity, " +
      "ADDRESS.addressProvince, " +
      "ADDRESS.addressPostalCode, " +
      "ORGANISM.organismPhone, " +
      "ORGANISM.organismFax, " +
      "ORGANISM.organismEmail, " +
      "ORGANISM.organismActive " +
      "FROM ORGANISM " +
      "INNER JOIN ADDRESS ON ORGANISM.addressID=ADDRESS.addressID";

    return new Promise(function(resolve, reject) {
      that.db.all(sql, (error, rows) =>
        resolve({
          error: error,
          rows: rows
        })
      );
    });
  }

  getAllActive(active) {
    var that = this;

    const sql =
      "SELECT " +
      "ORGANISM.organismID, " +
      "ORGANISM.organismName, " +
      "ADDRESS.addressNumber, " +
      "ADDRESS.addressStreet," +
      "ADDRESS.addressCity, " +
      "ADDRESS.addressProvince, " +
      "ADDRESS.addressPostalCode, " +
      "ORGANISM.organismPhone, " +
      "ORGANISM.organismFax, " +
      "ORGANISM.organismEmail, " +
      "ORGANISM.organismActive " +
      "FROM ORGANISM " +
      "INNER JOIN ADDRESS ON ORGANISM.addressID=ADDRESS.addressID " +
      "WHERE ORGANISM.organismActive = ?";

    return new Promise(function(resolve, reject) {
      that.db.all(sql, [active], (error, rows) =>
        resolve({
          error: error,
          rows: rows
        })
      );
    });
  }

  find(name) {
    const that = this;

    const sql =
      "SELECT " +
      "ORGANISM.organismID, " +
      "ORGANISM.organismName, " +
      "ADDRESS.addressNumber, " +
      "ADDRESS.addressStreet," +
      "ADDRESS.addressCity, " +
      "ADDRESS.addressProvince, " +
      "ADDRESS.addressPostalCode, " +
      "ORGANISM.organismPhone, " +
      "ORGANISM.organismFax, " +
      "ORGANISM.organismEmail, " +
      "ORGANISM.organismActive " +
      "FROM ORGANISM " +
      "INNER JOIN ADDRESS ON ORGANISM.addressID=ADDRESS.addressID " +
      "WHERE organismName = ?";

    return new Promise(function(resolve, reject) {
      that.db.get(sql, [name], (error, row) =>
        resolve({
          error: error,
          row: row
        })
      );
    });
  }

  create(name, addressID, phone, fax, email, active) {
    const that = this;

    const sql =
      "INSERT INTO " +
      "ORGANISM(organismName, addressID, organismPhone, " +
      "organismFax, organismEmail, organismActive) " +
      "VALUES(?, ?, ?, ?, ?, ?)";

    return new Promise(function(resolve, reject) {
      that.db.run(sql, [name, addressID, phone, fax, email, active], function(
        error
      ) {
        return resolve({
          error: error,
          rowID: this.lastID
        });
      });
    });
  }

  update(id, name, addressID, phone, fax, email, active) {
    const that = this;

    const sql =
      "UPDATE ORGANISM " +
      "SET organismName = ?, addressID = ?, organismPhone = ?, " +
      "organismFax = ?, organismEmail = ?, organismActive = ?" +
      "WHERE organismID = ?";

    return new Promise(function(resolve, reject) {
      that.db.run(
        sql,
        [name, addressID, phone, fax, email, active, id],
        error =>
          resolve({
            error: error,
            rowID: id
          })
      );
    });
  }

  remove(id) {
    const that = this;

    const sql = "DELETE FROM ORGANISM WHERE organismID = ?";

    return new Promise(function(resolve, reject) {
      that.db.run(sql, [id], error =>
        resolve({
          error: error,
          id: id
        })
      );
    });
  }
}

module.exports = new OrganismDBA();
