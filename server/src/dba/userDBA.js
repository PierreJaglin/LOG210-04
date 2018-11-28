const sqlite3 = require("sqlite3").verbose();
const config = require("../config/config.js");

class UserDBA {
  constructor() {
    const dbPath = config.getDBPath();

    this.db = new sqlite3.Database(dbPath, function(err) {
      if (err) {
        console.log(
          "Error - User DBA : Could not connect to the database",
          err
        );
      }
    });
    this.db.configure("busyTimeout", 5000);
  }

  get(userID) {
    const that = this;

    const sql =
      "SELECT " +
      "USER.userID, " +
      "USER.userName, " +
      "USER.userEmail, " +
      "PROFILE.profileID, " +
      "PROFILE.profileDesc, " +
      "USER.userActive " +
      "FROM USER " +
      "INNER JOIN PROFILE ON USER.profileID=PROFILE.profileID " +
      "WHERE USER.userID = ?";

    return new Promise(function(resolve, reject) {
      that.db.get(sql, [userID], (error, row) =>
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
      "USER.userID, " +
      "USER.userName, " +
      "USER.userEmail, " +
      "PROFILE.profileID, " +
      "PROFILE.profileDesc, " +
      "USER.userActive " +
      "FROM USER " +
      "INNER JOIN PROFILE ON USER.profileID=PROFILE.profileID " +
      "ORDER BY userID";

    return new Promise(function(resolve, reject) {
      that.db.all(sql, (error, rows) =>
        resolve({
          error: error,
          rows: rows
        })
      );
    });
  }

  find(username) {
    const that = this;

    const sql =
      "SELECT " +
      "USER.userID, " +
      "USER.userName, " +
      "USER.userEmail, " +
      "PROFILE.profileID, " +
      "PROFILE.profileDesc, " +
      "USER.userActive " +
      "FROM USER " +
      "INNER JOIN PROFILE ON USER.profileID=PROFILE.profileID " +
      "WHERE userName = ?";

    return new Promise(function(resolve, reject) {
      that.db.get(sql, [username], (error, row) =>
        resolve({
          error: error,
          row: row
        })
      );
    });
  }

  getSecure(username) {
    const that = this;

    const sql = "SELECT * FROM USER WHERE userName = ?";

    return new Promise(function(resolve, reject) {
      that.db.get(sql, [username], (error, row) =>
        resolve({
          error: error,
          row: row
        })
      );
    });
  }

  create(name, password, email, profile, userActive) {
    const that = this;

    const sql =
      "INSERT INTO USER(userName, userPassword, userEmail, profileID, userActive)" +
      " VALUES(?, ?, ?, ?, ?)";

    return new Promise(function(resolve, reject) {
      that.db.run(sql, [name, password, email, profile, userActive], function(
        error
      ) {
        return resolve({
          error: error,
          rowID: this.lastID
        });
      });
    });
  }

  update(userID, name, email, profile, userActive, token) {
    const that = this;
    const sql =
      "UPDATE USER SET userName = ?, userEmail = ?, profileID = ?, userActive = ?, userToken = ?" +
      "WHERE userID = ?";

    return new Promise(function(resolve, reject) {
      that.db.run(
        sql,
        [name, email, profile, userActive, token, userID],
        error =>
          resolve({
            error: error,
            rowID: userID
          })
      );
    });
  }

  update_password(token, password) {
    const that = this;

    const sql =
      "UPDATE USER SET userPassword = ?, userActive = ?, userToken = ? WHERE userToken = ?";

    return new Promise(function(resolve, reject) {
      that.db.run(sql, [password, 1, null, token], error =>
        resolve({
          error: error,
          token: token
        })
      );
    });
  }

  createLog(id) {
    const that = this;
    const currentDate = new Date();

    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day = currentDate.getDate();
    day = (day < 10 ? "0" : "") + day;

    const sql = "INSERT INTO USER_LOG(userID, userLogDate)" + " VALUES(?, ?)";

    return new Promise(function(resolve, reject) {
      that.db.run(sql, [id, year + "-" + month + "-" + day], function(error) {
        return resolve({
          error: error,
          rowID: this.lastID
        });
      });
    });
  }

  remove(id) {
    const that = this;

    const sql = "DELETE FROM USER WHERE userID = ?";

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

module.exports = new UserDBA();
