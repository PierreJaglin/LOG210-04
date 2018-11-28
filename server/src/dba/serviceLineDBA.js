const sqlite3 = require("sqlite3").verbose();
const config = require("../config/config.js");

class ServiceLineDBA {
  constructor() {
    const dbPath = config.getDBPath();

    this.db = new sqlite3.Database(dbPath, function(err) {
      if (err) {
        console.log(
          "Error - ServiceLine DBA : Could not connect to the database",
          err
        );
      }
    });
    this.db.configure("busyTimeout", 5000);
  }

  get(id) {
    const that = this;

    const sql = "SELECT * FROM SERVICE_LINE WHERE serviceLineID = ?";

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

    const sql = "SELECT * FROM SERVICE_LINE";

    return new Promise(function(resolve, reject) {
      that.db.all(sql, (error, rows) =>
        resolve({
          error: error,
          rows: rows
        })
      );
    });
  }

  findByService(id) {
    const that = this;

    const sql = "SELECT * FROM SERVICE_LINE WHERE serviceID = ?";

    return new Promise(function(resolve, reject) {
      that.db.get(sql, [id], (error, row) =>
        resolve({
          error: error,
          row: row
        })
      );
    });
  }

  findByServicePoint(id) {
    const that = this;

    const sql = "SELECT * FROM SERVICE_LINE WHERE servicePointID = ?";

    return new Promise(function(resolve, reject) {
      that.db.all(sql, [id], (error, rows) =>
        resolve({
          error: error,
          rows: rows
        })
      );
    });
  }

  create(idPointDeService, idService) {
    const that = this;

    const sql =
      "INSERT INTO " +
      "SERVICE_LINE(servicePointID, serviceID) " +
      "VALUES(?,?)";

    return new Promise(function(resolve, reject) {
      that.db.run(sql, [idPointDeService, idService], function(error) {
        return resolve({
          error: error,
          rowID: this.lastID
        });
      });
    });
  }

  update(serviceLineID, servicePointID, serviceID) {
    const that = this;

    const sql =
      "UPDATE SERVICE_LINE " +
      "SET servicePointID = ? , serviceID = ?" +
      "WHERE serviceLineID = ?";

    return new Promise(function(resolve, reject) {
      that.db.run(sql, [servicePointID, serviceID, serviceLineID], function(
        error
      ) {
        return resolve({
          error: error,
          rowID: this.lastID
        });
      });
    });
  }

  remove(id) {
    const that = this;

    const sql = "DELETE FROM SERVICE_LINE WHERE serviceLineID = ?";

    return new Promise(function(resolve, reject) {
      that.db.run(sql, [id], error =>
        resolve({
          error: error,
          id: id
        })
      );
    });
  }

  removeFromService(id) {
    const that = this;

    const sql = "DELETE FROM SERVICE_LINE WHERE serviceID = ?";

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

module.exports = new ServiceLineDBA();
