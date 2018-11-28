const sqlite3 = require("sqlite3").verbose();
const config = require("../config/config.js");

class ReferentToOrganismRfDBA {
  constructor() {
    const dbPath = config.getDBPath();

    this.db = new sqlite3.Database(dbPath, function(err) {
      if (err) {
        console.log(
          "Error - ReferentToOrganismRf DBA : Could not connect to the database",
          err
        );
      }
    });
    this.db.configure("busyTimeout", 5000);
  }

  get(id) {
    const that = this;

    const sql =
      "SELECT * FROM REFERENT_TO_ORGANISMRF " +
      "WHERE referentToOrganismRfID = ?";

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

    const sql = "SELECT * FROM REFERENT_TO_ORGANISMRF";

    return new Promise(function(resolve, reject) {
      that.db.all(sql, (error, rows) =>
        resolve({
          error: error,
          rows: rows
        })
      );
    });
  }

  getAllFromReferent(id) {
    var that = this;

    const sql = "SELECT * FROM REFERENT_TO_ORGANISMRF WHERE referentID = ?";

    return new Promise(function(resolve, reject) {
      that.db.all(sql, [id], (error, rows) =>
        resolve({
          error: error,
          rows: rows
        })
      );
    });
  }

  findByReferent(id) {
    const that = this;

    const sql = "SELECT * FROM REFERENT_TO_ORGANISMRF WHERE referentID = ?";

    return new Promise(function(resolve, reject) {
      that.db.get(sql, [id], (error, row) =>
        resolve({
          error: error,
          row: row
        })
      );
    });
  }

  findByOrganismReferent(id) {
    const that = this;

    const sql =
      "SELECT * FROM REFERENT_TO_ORGANISMRF WHERE organismReferentID = ?";

    return new Promise(function(resolve, reject) {
      that.db.all(sql, [id], (error, rows) =>
        resolve({
          error: error,
          rows: rows
        })
      );
    });
  }

  create(referentID, organismReferentID) {
    const that = this;

    const sql =
      "INSERT INTO " +
      "REFERENT_TO_ORGANISMRF(referentID, organismReferentID) " +
      "VALUES(?,?)";

    return new Promise(function(resolve, reject) {
      that.db.run(sql, [referentID, organismReferentID], function(error) {
        return resolve({
          error: error,
          rowID: this.lastID
        });
      });
    });
  }

  update(referentToOrganismRfID, referentID, organismReferentID) {
    const that = this;

    const sql =
      "UPDATE REFERENT_TO_ORGANISMRF " +
      "SET referentID = ? , organismReferentID = ?" +
      "WHERE referentToOrganismRfID = ?";

    return new Promise(function(resolve, reject) {
      that.db.run(
        sql,
        [referentToOrganismRfID, referentID, organismReferentID],
        function(error) {
          return resolve({
            error: error,
            rowID: this.lastID
          });
        }
      );
    });
  }

  remove(id) {
    const that = this;

    const sql =
      "DELETE FROM REFERENT_TO_ORGANISMRF WHERE referentToOrganismRfID = ?";

    return new Promise(function(resolve, reject) {
      that.db.run(sql, [id], error =>
        resolve({
          error: error,
          id: id
        })
      );
    });
  }

  removeFromReferent(id) {
    const that = this;

    const sql = "DELETE FROM REFERENT_TO_ORGANISMRF WHERE referentID = ?";

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

module.exports = new ReferentToOrganismRfDBA();
