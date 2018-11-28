const sqlite3 = require("sqlite3").verbose();
const config = require("../config/config.js");

class ReferentDBA {
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
      "REFERENT.referentID, " +
      "REFERENT.referentLastName, " +
      "REFERENT.referentFirstName, " +
      "REFERENT.referentTitle, " +
      "REFERENT.referentPhone, " +
      "REFERENT.referentOfficePhone, " +
      "REFERENT.referentFax, " +
      "REFERENT.referentEmail, " +
      "REFERENT.referentPrefFax, " +
      "REFERENT.referentPrefEmail, " +
      "REFERENT.referentPrefPaper " +
      "FROM REFERENT " +
      "WHERE REFERENT.referentID = ?";

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
      "REFERENT.referentID, " +
      "REFERENT.referentLastName, " +
      "REFERENT.referentFirstName, " +
      "REFERENT.referentTitle, " +
      "REFERENT.referentPhone, " +
      "REFERENT.referentOfficePhone, " +
      "REFERENT.referentFax, " +
      "REFERENT.referentEmail, " +
      "REFERENT.referentPrefFax, " +
      "REFERENT.referentPrefEmail, " +
      "REFERENT.referentPrefPaper " +
      "FROM REFERENT";

    return new Promise(function(resolve, reject) {
      that.db.all(sql, (error, rows) =>
        resolve({
          error: error,
          rows: rows
        })
      );
    });
  }

  getAllFromOrganismReferent(id) {
    var that = this;

    const sql =
      "SELECT " +
      "REFERENT.referentID, " +
      "REFERENT.referentLastName, " +
      "REFERENT.referentFirstName, " +
      "REFERENT.referentTitle, " +
      "REFERENT.referentPhone, " +
      "REFERENT.referentOfficePhone, " +
      "REFERENT.referentFax, " +
      "REFERENT.referentEmail, " +
      "REFERENT.referentPrefFax, " +
      "REFERENT.referentPrefEmail, " +
      "REFERENT.referentPrefPaper " +
      "FROM ((REFERENT " +
      "LEFT JOIN REFERENT_TO_ORGANISMRF ON REFERENT_TO_ORGANISMRF.referentID = REFERENT.referentID) " +
      "LEFT JOIN ORGANISM_REFERENT ON ORGANISM_REFERENT.organismReferentID = REFERENT_TO_ORGANISMRF.organismReferentID) " +
      "WHERE ORGANISM_REFERENT.organismReferentID = ?";

    return new Promise(function(resolve, reject) {
      that.db.all(sql, [id], (error, rows) =>
        resolve({
          error: error,
          rows: rows
        })
      );
    });
  }

  findByEmail(email) {
    const that = this;

    const sql =
      "SELECT " +
      "REFERENT.referentID, " +
      "REFERENT.referentLastName, " +
      "REFERENT.referentFirstName, " +
      "REFERENT.referentTitle, " +
      "REFERENT.referentPhone, " +
      "REFERENT.referentOfficePhone, " +
      "REFERENT.referentFax, " +
      "REFERENT.referentEmail, " +
      "REFERENT.referentPrefFax, " +
      "REFERENT.referentPrefEmail, " +
      "REFERENT.referentPrefPaper " +
      "FROM REFERENT " +
      "WHERE REFERENT.referentEmail = ?";

    return new Promise(function(resolve, reject) {
      that.db.get(sql, [email], (error, row) =>
        resolve({
          error: error,
          row: row
        })
      );
    });
  }

  create(
    lastName,
    firstName,
    title,
    phone,
    officePhone,
    fax,
    email,
    prefFax,
    prefEmail,
    prefPaper
  ) {
    const that = this;

    const sql =
      "INSERT INTO " +
      "REFERENT(referentLastName, referentFirstName, referentTitle, " +
      "referentPhone, referentOfficePhone, referentFax, referentEmail, " +
      "referentPrefFax, referentPrefEmail, referentPrefPaper) " +
      "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    return new Promise(function(resolve, reject) {
      that.db.run(
        sql,
        [
          lastName,
          firstName,
          title,
          phone,
          officePhone,
          fax,
          email,
          prefFax,
          prefEmail,
          prefPaper
        ],
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
    lastName,
    firstName,
    title,
    phone,
    officePhone,
    fax,
    email,
    prefFax,
    prefEmail,
    prefPaper
  ) {
    const that = this;

    const sql =
      "UPDATE REFERENT " +
      "SET referentLastName = ?, referentFirstName = ?, referentTitle = ?, " +
      "referentPhone = ?, referentOfficePhone = ?, referentFax = ?, referentEmail = ?, " +
      "referentPrefFax = ?, referentPrefEmail = ?, referentPrefPaper = ?" +
      "WHERE referentID = ?";

    return new Promise(function(resolve, reject) {
      that.db.run(
        sql,
        [
          lastName,
          firstName,
          title,
          phone,
          officePhone,
          fax,
          email,
          prefFax,
          prefEmail,
          prefPaper,
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

    const sql = "DELETE FROM REFERENT WHERE referentID = ?";

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

module.exports = new ReferentDBA();
