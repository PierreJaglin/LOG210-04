const sqlite3 = require("sqlite3").verbose();
const config = require("../config/config.js");

class ServiceDBA {
  constructor() {
    const dbPath = config.getDBPath();

    this.db = new sqlite3.Database(dbPath, function(err) {
      if (err) {
        console.log(
          "Error - Service DBA : Could not connect to the database",
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
      "SERVICE.serviceID, " +
      "SERVICE.serviceName, " +
      "SERVICE.serviceDescription, " +
      "SERVICE.serviceActif, " +
      "SERVICE_POINT.servicePointID, " +
      "SERVICE_POINT.servicePointName, " +
      "HISTORIQUE_TARIFICATION_SERVICE.historiqueTarificationServiceTarificationParent, " +
      "HISTORIQUE_TARIFICATION_SERVICE.historiqueTarificationServiceTarificationSubventionee, " +
      "HISTORIQUE_TARIFICATION_SERVICE.historiqueTarificationServiceTarificationCISSS, " +
      "MAX(HISTORIQUE_TARIFICATION_SERVICE.historiqueTarificationServiceDateEntreeVigueur) as dateEntreeVigueur " +
      "FROM (((SERVICE " +
      "LEFT JOIN SERVICE_LINE ON SERVICE_LINE.serviceID = SERVICE.serviceID) " +
      "LEFT JOIN SERVICE_POINT ON SERVICE_POINT.servicePointID = SERVICE_LINE.servicePointID) " +
      "LEFT JOIN HISTORIQUE_TARIFICATION_SERVICE ON HISTORIQUE_TARIFICATION_SERVICE.serviceID = SERVICE.serviceID) " +
      "WHERE SERVICE.serviceID = ?";

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
      "serviceID, " +
      "serviceName, " +
      "serviceDescription, " +
      "serviceActif " +
      "FROM SERVICE";

    return new Promise(function(resolve, reject) {
      that.db.all(sql, (error, rows) =>
        resolve({
          error: error,
          rows: rows
        })
      );
    });
  }

  getAllFromServicePoint(id) {
    var that = this;

    const sql =
      "SELECT " +
      "SERVICE.serviceID, " +
      "SERVICE.serviceName, " +
      "SERVICE.serviceDescription, " +
      "SERVICE.serviceActif, " +
      "SERVICE_POINT.servicePointID, " +
      "SERVICE_POINT.servicePointName " +
      "FROM ((SERVICE " +
      "LEFT JOIN SERVICE_LINE ON SERVICE_LINE.serviceID = SERVICE.serviceID) " +
      "LEFT JOIN SERVICE_POINT ON SERVICE_POINT.servicePointID = SERVICE_LINE.servicePointID) " +
      "WHERE SERVICE_POINT.servicePointID = ?";

    return new Promise(function(resolve, reject) {
      that.db.all(sql, [id], (error, rows) =>
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
      "serviceID, " +
      "serviceName, " +
      "serviceDescription, " +
      "serviceActif " +
      "FROM SERVICE " +
      "WHERE serviceName = ? ";

    return new Promise(function(resolve, reject) {
      that.db.get(sql, [name], (error, row) =>
        resolve({
          error: error,
          row: row
        })
      );
    });
  }

  create(name, description, serviceActive) {
    const that = this;

    const sql =
      "INSERT INTO " +
      "SERVICE(serviceName, serviceDescription, " +
      "serviceActif) " +
      "VALUES(?,?,?)";

    return new Promise(function(resolve, reject) {
      that.db.run(sql, [name, description, serviceActive], function(error) {
        return resolve({
          error: error,
          rowID: this.lastID
        });
      });
    });
  }

  update(id, name, description, serviceActive) {
    const that = this;

    const sql =
      "UPDATE SERVICE " +
      "SET serviceName = ?, serviceDescription = ?, serviceActif = ? " +
      "WHERE serviceID = ?";

    return new Promise(function(resolve, reject) {
      that.db.run(sql, [name, description, serviceActive, id], error =>
        resolve({
          error: error,
          rowID: id
        })
      );
    });
  }

  remove(id) {
    const that = this;

    const sql = "DELETE FROM SERVICE WHERE serviceID = ?";

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

module.exports = new ServiceDBA();
