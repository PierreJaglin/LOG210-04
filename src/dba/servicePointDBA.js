const sqlite3 = require("sqlite3").verbose();
const config = require("../config/config.js");

class ServicePointDBA {
  constructor() {
    const dbPath = config.getDBPath();

    this.db = new sqlite3.Database(dbPath, function(err) {
      if (err) {
        console.log(
          "Error - ServicePoint DBA : Could not connect to the database",
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
      "SERVICE_POINT.servicePointID, " +
      "SERVICE_POINT.servicePointName, " +
      "ADDRESS.addressNumber, " +
      "ADDRESS.addressStreet, " +
      "ADDRESS.addressCity, " +
      "ADDRESS.addressProvince, " +
      "ADDRESS.addressPostalCode, " +
      "SERVICE_POINT.servicePointPhone, " +
      "SERVICE_POINT.servicePointFax, " +
      "SERVICE_POINT.servicePointEmail, " +
      "SERVICE_POINT.servicePointActive, " +
      "ORGANISM.organismID, " +
      "ORGANISM.organismName " +
      "FROM SERVICE_POINT " +
      "INNER JOIN ADDRESS ON SERVICE_POINT.addressID=ADDRESS.addressID " +
      "INNER JOIN ORGANISM ON ORGANISM.organismID = SERVICE_POINT.organismID " +
      "WHERE SERVICE_POINT.servicePointID = ?";

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
      "SERVICE_POINT.servicePointID, " +
      "SERVICE_POINT.servicePointName, " +
      "ADDRESS.addressNumber, " +
      "ADDRESS.addressStreet, " +
      "ADDRESS.addressCity, " +
      "ADDRESS.addressProvince, " +
      "ADDRESS.addressPostalCode, " +
      "SERVICE_POINT.servicePointPhone, " +
      "SERVICE_POINT.servicePointFax, " +
      "SERVICE_POINT.servicePointEmail, " +
      "SERVICE_POINT.servicePointActive, " +
      "ORGANISM.organismID, " +
      "ORGANISM.organismName " +
      "FROM SERVICE_POINT " +
      "INNER JOIN ADDRESS ON SERVICE_POINT.addressID=ADDRESS.addressID " +
      "INNER JOIN ORGANISM ON ORGANISM.organismID = SERVICE_POINT.organismID " +
      "ORDER BY SERVICE_POINT.servicePointID";

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
      "SERVICE_POINT.servicePointID, " +
      "SERVICE_POINT.servicePointName, " +
      "ADDRESS.addressNumber, " +
      "ADDRESS.addressStreet, " +
      "ADDRESS.addressCity, " +
      "ADDRESS.addressProvince, " +
      "ADDRESS.addressPostalCode, " +
      "SERVICE_POINT.servicePointPhone, " +
      "SERVICE_POINT.servicePointFax, " +
      "SERVICE_POINT.servicePointEmail, " +
      "SERVICE_POINT.servicePointActive, " +
      "ORGANISM.organismID, " +
      "ORGANISM.organismName " +
      "FROM SERVICE_POINT " +
      "INNER JOIN ADDRESS ON SERVICE_POINT.addressID=ADDRESS.addressID " +
      "INNER JOIN ORGANISM ON ORGANISM.organismID = SERVICE_POINT.organismID " +
      "WHERE SERVICE_POINT.servicePointActive = ? " +
      "ORDER BY SERVICE_POINT.servicePointID";

    return new Promise(function(resolve, reject) {
      that.db.all(sql, [active], (error, rows) =>
        resolve({
          error: error,
          rows: rows
        })
      );
    });
  }

  getAllFromOrganism(id) {
    var that = this;

    const sql =
      "SELECT " +
      "SERVICE_POINT.servicePointID, " +
      "SERVICE_POINT.servicePointName, " +
      "ADDRESS.addressNumber, " +
      "ADDRESS.addressStreet, " +
      "ADDRESS.addressCity, " +
      "ADDRESS.addressProvince, " +
      "ADDRESS.addressPostalCode, " +
      "SERVICE_POINT.servicePointPhone, " +
      "SERVICE_POINT.servicePointFax, " +
      "SERVICE_POINT.servicePointEmail, " +
      "SERVICE_POINT.servicePointActive, " +
      "ORGANISM.organismID, " +
      "ORGANISM.organismName " +
      "FROM SERVICE_POINT " +
      "INNER JOIN ADDRESS ON SERVICE_POINT.addressID=ADDRESS.addressID " +
      "INNER JOIN ORGANISM ON ORGANISM.organismID = SERVICE_POINT.organismID " +
      "WHERE SERVICE_POINT.organismID = ? " +
      "ORDER BY SERVICE_POINT.servicePointID";

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
      "SERVICE_POINT.servicePointID, " +
      "SERVICE_POINT.servicePointName, " +
      "ADDRESS.addressNumber, " +
      "ADDRESS.addressStreet, " +
      "ADDRESS.addressCity, " +
      "ADDRESS.addressProvince, " +
      "ADDRESS.addressPostalCode, " +
      "SERVICE_POINT.servicePointPhone, " +
      "SERVICE_POINT.servicePointFax, " +
      "SERVICE_POINT.servicePointEmail, " +
      "SERVICE_POINT.servicePointActive, " +
      "ORGANISM.organismID, " +
      "ORGANISM.organismName " +
      "FROM SERVICE_POINT " +
      "INNER JOIN ADDRESS ON SERVICE_POINT.addressID=ADDRESS.addressID " +
      "INNER JOIN ORGANISM ON ORGANISM.organismID = SERVICE_POINT.organismID " +
      "WHERE SERVICE_POINT.servicePointName = ?";

    return new Promise(function(resolve, reject) {
      that.db.get(sql, [name], (error, row) =>
        resolve({
          error: error,
          row: row
        })
      );
    });
  }

  create(name, addressID, phone, fax, email, servicePointActive, organismID) {
    const that = this;

    const sql =
      "INSERT INTO " +
      "SERVICE_POINT(servicePointName, addressID, servicePointPhone, " +
      "servicePointFax, servicePointEmail, servicePointActive, " +
      "organismID) " +
      "VALUES(?, ?, ?, ?, ?, ?, ?)";

    return new Promise(function(resolve, reject) {
      that.db.run(
        sql,
        [name, addressID, phone, fax, email, servicePointActive, organismID],
        function(error) {
          return resolve({
            error: error,
            rowID: this.lastID
          });
        }
      );
    });
  }

  update(
    id,
    name,
    addressID,
    phone,
    fax,
    email,
    servicePointActive,
    organismID
  ) {
    const that = this;

    const sql =
      "UPDATE SERVICE_POINT " +
      "SET servicePointName = ?, addressID = ?, servicePointPhone = ?, " +
      "servicePointFax = ?, servicePointEmail = ?, servicePointActive = ?, " +
      "organismID = ?" +
      "WHERE servicePointID = ?";

    return new Promise(function(resolve, reject) {
      that.db.run(
        sql,
        [
          name,
          addressID,
          phone,
          fax,
          email,
          servicePointActive,
          organismID,
          id
        ],
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

    const sql = "DELETE FROM SERVICE_POINT WHERE servicePointID = ?";

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

module.exports = new ServicePointDBA();
