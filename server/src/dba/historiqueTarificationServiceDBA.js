const sqlite3 = require("sqlite3").verbose();
const config = require("../config/config.js");

class HistoriqueTarificationServiceDBA {
  constructor() {
    const dbPath = config.getDBPath();

    this.db = new sqlite3.Database(dbPath, function(err) {
      if (err) {
        console.log(
          "Error - HistoriqueTarificationService DBA : Could not connect to the database",
          err
        );
      }
    });
    this.db.configure("busyTimeout", 5000);
  }

  get(id) {
    const that = this;

    const sql =
      "SELECT * FROM HISTORIQUE_TARIFICATION_SERVICE " +
      "WHERE historiqueTarificationServiceID = ?";

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
    const that = this;

    const sql =
      "SELECT " +
      "HISTORIQUE_TARIFICATION_SERVICE.historiqueTarificationServiceID, " +
      "HISTORIQUE_TARIFICATION_SERVICE.historiqueTarificationServiceTarificationParent, " +
      "HISTORIQUE_TARIFICATION_SERVICE.historiqueTarificationServiceTarificationSubventionee, " +
      "HISTORIQUE_TARIFICATION_SERVICE.historiqueTarificationServiceDateEntreeVigueur," +
      "HISTORIQUE_TARIFICATION_SERVICE.historiqueTarificationServiceTarificationCISSS, " +
      "SERVICE.serviceID, " +
      "SERVICE.serviceName " +
      "FROM HISTORIQUE_TARIFICATION_SERVICE " +
      "INNER JOIN SERVICE ON SERVICE.serviceID=HISTORIQUE_TARIFICATION_SERVICE.serviceID " +
      "ORDER BY HISTORIQUE_TARIFICATION_SERVICE.historiqueTarificationServiceDateEntreeVigueur DESC";

    return new Promise(function(resolve, reject) {
      that.db.all(sql, (error, rows) =>
        resolve({
          error: error,
          rows: rows
        })
      );
    });
  }

  find(serviceID) {
    const that = this;

    const sql =
      "SELECT * FROM HISTORIQUE_TARIFICATION_SERVICE WHERE serviceID = ?";

    return new Promise(function(resolve, reject) {
      that.db.get(sql, [serviceID], (error, row) =>
        resolve({
          error: error,
          row: row
        })
      );
    });
  }

  create(
    serviceID,
    tarificationParent,
    subventionee,
    tarificationCISSS,
    dateEntreeVigueur
  ) {
    const that = this;

    const sql =
      "INSERT INTO " +
      "HISTORIQUE_TARIFICATION_SERVICE(serviceID, historiqueTarificationServiceTarificationParent, " +
      "historiqueTarificationServiceTarificationSubventionee, historiqueTarificationServiceTarificationCISSS, " +
      "historiqueTarificationServiceDateEntreeVigueur) " +
      "VALUES(?, ?, ?, ?, ?)";

    return new Promise(function(resolve, reject) {
      that.db.run(
        sql,
        [
          serviceID,
          tarificationParent,
          subventionee,
          tarificationCISSS,
          dateEntreeVigueur
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
    serviceID,
    tarificationParent,
    subventionee,
    tarificationCISSS,
    dateEntreeVigueur
  ) {
    const that = this;

    const sql =
      "UPDATE HISTORIQUE_TARIFICATION_SERVICE " +
      "SET serviceID = ?, historiqueTarificationServiceTarificationParent = ?, historiqueTarificationServiceTarificationSubventionee = ?, " +
      "historiqueTarificationServiceTarificationCISSS = ?, historiqueTarificationServiceDateEntreeVigueur = ? " +
      "WHERE historiqueTarificationServiceID = ?";

    return new Promise(function(resolve, reject) {
      that.db.run(
        sql,
        [
          serviceID,
          tarificationParent,
          subventionee,
          tarificationCISSS,
          dateEntreeVigueur,
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

  removeFromService(id) {
    const that = this;

    const sql =
      "DELETE FROM HISTORIQUE_TARIFICATION_SERVICE WHERE serviceID = ?";

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

module.exports = new HistoriqueTarificationServiceDBA();
