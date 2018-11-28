const sqlite3 = require("sqlite3").verbose();
const config = require("../config/config.js");

class OrganismReferentDBA {
  constructor() {
    const dbPath = config.getDBPath();

    this.db = new sqlite3.Database(dbPath, function(err) {
      if (err) {
        console.log(
          "Error - organismReferentModel : could not connect to the database",
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
      "ORGANISM_REFERENT.organismReferentID, " +
      "ORGANISM_REFERENT.organismReferentName, " +
      "ADDRESS.addressNumber, " +
      "ADDRESS.addressStreet," +
      "ADDRESS.addressCity, " +
      "ADDRESS.addressProvince, " +
      "ADDRESS.addressPostalCode, " +
      "ORGANISM_REFERENT.organismReferentPhone, " +
      "ORGANISM_REFERENT.organismReferentFax, " +
      "ORGANISM_REFERENT.organismReferentEmail, " +
      "ORGANISM_REFERENT.organismReferentWebsite, " +
      "ORGANISM.organismID, " +
      "ORGANISM.organismName, " +
      "ORGANISM_REFERENT.organismReferentActive " +
      "FROM ORGANISM_REFERENT, ORGANISM " +
      "INNER JOIN ADDRESS ON ORGANISM_REFERENT.addressID=ADDRESS.addressID " +
      "WHERE ORGANISM_REFERENT.organismReferentID = ? AND " +
      "ORGANISM_REFERENT.organismID=ORGANISM.organismID";

    return new Promise(function(resolve, reject) {
      that.db.get(sql, [id], function(error, row) {
        return resolve({
          error: error,
          row: row
        });
      });
    });
  }

  getAll() {
    const that = this;

    const sql =
      "SELECT " +
      "ORGANISM_REFERENT.organismReferentID, " +
      "ORGANISM_REFERENT.organismReferentName, " +
      "ADDRESS.addressNumber, " +
      "ADDRESS.addressStreet," +
      "ADDRESS.addressCity, " +
      "ADDRESS.addressProvince, " +
      "ADDRESS.addressPostalCode, " +
      "ORGANISM_REFERENT.organismReferentPhone, " +
      "ORGANISM_REFERENT.organismReferentFax, " +
      "ORGANISM_REFERENT.organismReferentEmail, " +
      "ORGANISM_REFERENT.organismReferentWebsite, " +
      "ORGANISM.organismID, " +
      "ORGANISM.organismName, " +
      "ORGANISM_REFERENT.organismReferentActive " +
      "FROM ORGANISM_REFERENT, ORGANISM " +
      "INNER JOIN ADDRESS ON ORGANISM_REFERENT.addressID=ADDRESS.addressID " +
      "WHERE ORGANISM_REFERENT.organismID=ORGANISM.organismID";

    return new Promise(function(resolve, reject) {
      that.db.all(sql, function(error, rows) {
        return resolve({
          error: error,
          rows: rows
        });
      });
    });
  }

  getAllActive(active) {
    const that = this;

    const sql =
      "SELECT " +
      "ORGANISM_REFERENT.organismReferentID, " +
      "ORGANISM_REFERENT.organismReferentName, " +
      "ADDRESS.addressNumber, " +
      "ADDRESS.addressStreet," +
      "ADDRESS.addressCity, " +
      "ADDRESS.addressProvince, " +
      "ADDRESS.addressPostalCode, " +
      "ORGANISM_REFERENT.organismReferentPhone, " +
      "ORGANISM_REFERENT.organismReferentFax, " +
      "ORGANISM_REFERENT.organismReferentEmail, " +
      "ORGANISM_REFERENT.organismReferentWebsite, " +
      "ORGANISM.organismID, " +
      "ORGANISM.organismName, " +
      "ORGANISM_REFERENT.organismReferentActive " +
      "FROM ((ORGANISM_REFERENT " +
      "LEFT JOIN ADDRESS ON ORGANISM_REFERENT.addressID=ADDRESS.addressID) " +
      "LEFT JOIN ORGANISM ON ORGANISM_REFERENT.organismID=ORGANISM.organismID) " +
      "WHERE ORGANISM_REFERENT.organismReferentActive = ?";

    return new Promise(function(resolve, reject) {
      that.db.all(sql, [active], function(error, rows) {
        return resolve({
          error: error,
          rows: rows
        });
      });
    });
  }

  getAllByOrganism(organismID) {
    const that = this;

    const sql =
      "SELECT " +
      "ORGANISM_REFERENT.organismReferentID, " +
      "ORGANISM_REFERENT.organismReferentName, " +
      "ADDRESS.addressNumber, " +
      "ADDRESS.addressStreet," +
      "ADDRESS.addressCity, " +
      "ADDRESS.addressProvince, " +
      "ADDRESS.addressPostalCode, " +
      "ORGANISM_REFERENT.organismReferentPhone, " +
      "ORGANISM_REFERENT.organismReferentFax, " +
      "ORGANISM_REFERENT.organismReferentEmail, " +
      "ORGANISM_REFERENT.organismReferentWebsite, " +
      "ORGANISM.organismID, " +
      "ORGANISM.organismName, " +
      "ORGANISM_REFERENT.organismReferentActive " +
      "FROM ORGANISM_REFERENT, ORGANISM " +
      "INNER JOIN ADDRESS ON ORGANISM_REFERENT.addressID=ADDRESS.addressID " +
      "WHERE ORGANISM_REFERENT.organismID = ? AND " +
      "ORGANISM_REFERENT.organismID=ORGANISM.organismID";

    return new Promise(function(resolve, reject) {
      that.db.all(sql, [organismID], function(error, rows) {
        return resolve({
          error: error,
          rows: rows
        });
      });
    });
  }

  find(name) {
    const that = this;

    const sql =
      "SELECT " +
      "ORGANISM_REFERENT.organismReferentID, " +
      "ORGANISM_REFERENT.organismReferentName, " +
      "ADDRESS.addressNumber, " +
      "ADDRESS.addressStreet," +
      "ADDRESS.addressCity, " +
      "ADDRESS.addressProvince, " +
      "ADDRESS.addressPostalCode, " +
      "ORGANISM_REFERENT.organismReferentPhone, " +
      "ORGANISM_REFERENT.organismReferentFax, " +
      "ORGANISM_REFERENT.organismReferentEmail, " +
      "ORGANISM_REFERENT.organismReferentWebsite, " +
      "ORGANISM_REFERENT.organismReferentActive, " +
      "ORGANISM.organismID, " +
      "ORGANISM.organismName " +
      "FROM ORGANISM_REFERENT, ORGANISM " +
      "INNER JOIN ADDRESS ON ORGANISM_REFERENT.addressID=ADDRESS.addressID " +
      "WHERE organismReferentName = ? AND " +
      "ORGANISM_REFERENT.organismID=ORGANISM.organismID";

    return new Promise(function(resolve, reject) {
      that.db.get(sql, [name], function(error, row) {
        return resolve({
          error: error,
          row: row
        });
      });
    });
  }

  create(name, addressID, phone, fax, email, siteWeb, active, organismID) {
    const that = this;

    const sql =
      "INSERT INTO " +
      "ORGANISM_REFERENT(organismReferentName, addressID, organismReferentPhone, organismReferentFax, " +
      "organismReferentEmail, organismReferentWebSite, organismReferentActive, organismID) " +
      "VALUES(?,?,?,?,?,?,?,?)";

    return new Promise(function(resolve, reject) {
      that.db.run(
        sql,
        [name, addressID, phone, fax, email, siteWeb, active, organismID],
        function(error) {
          return resolve({
            error: error,
            rowID: this.lastID
          });
        }
      );
    });
  }

  update(id, name, addressID, phone, fax, email, siteWeb, active, organismID) {
    const that = this;

    const sql =
      "UPDATE ORGANISM_REFERENT " +
      "SET organismReferentName = ?, addressID = ?, organismReferentPhone = ?, organismReferentFax = ?, " +
      "organismReferentEmail = ?, organismReferentWebSite = ?, organismReferentActive = ?, organismID = ?" +
      "WHERE organismReferentID = ?";

    return new Promise(function(resolve, reject) {
      that.db.run(
        sql,
        [name, addressID, phone, fax, email, siteWeb, active, organismID, id],
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

    const sql = "DELETE FROM ORGANISM_REFERENT WHERE organismReferentID = ?";

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

module.exports = new OrganismReferentDBA();
