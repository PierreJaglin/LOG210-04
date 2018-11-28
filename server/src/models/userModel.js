const bcrypt = require("bcryptjs");
const UserDBA = require("../dba/userDBA");
const nodemailer = require("nodemailer");

module.exports = class UserModel {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      secureConnection: false, // use SSL
      port: 587, // port for secure SMTP
      auth: {
        user: "log210_a2018@hotmail.com",
        pass: "nodejs_1"
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  get(userID) {
    const that = this;
    return new Promise(function(resolve, reject) {
      that.DBA_get(userID).then(sqlResult => {
        if (sqlResult.error) {
          return reject(sqlResult.error);
        } else {
          return resolve(sqlResult.row);
        }
      });
    });
  }

  DBA_get(userID) {
    return UserDBA.get(userID);
  }

  getAll() {
    const that = this;
    return new Promise(function(resolve, reject) {
      that.DBA_getAll().then(sqlResult => {
        if (sqlResult.error) {
          return reject(sqlResult.error);
        } else {
          return resolve(sqlResult.rows);
        }
      });
    });
  }

  DBA_getAll() {
    return UserDBA.getAll();
  }

  find(username) {
    const that = this;
    return new Promise(function(resolve, reject) {
      that.DBA_find(username).then(sqlResult => {
        if (sqlResult.error) {
          return reject(sqlResult.error);
        } else {
          return resolve(sqlResult.row);
        }
      });
    });
  }

  DBA_find(username) {
    return UserDBA.find(username);
  }

  create(user) {
    const that = this;

    return new Promise(function(resolve, reject) {
      that
        .DBA_create(user.name, user.email, user.profile, user.active)
        .then(sqlResult => {
          if (sqlResult.error) {
            if (sqlResult.error.code) {
              return reject("This user already exists.");
            }
            return reject(sqlResult.error);
          } else {
            return resolve(sqlResult.rowID);
          }
        })
        .catch(error => reject(error));
    });
  }

  DBA_create(name, email, profile, userActive) {
    const that = this;
    return UserDBA.create(
      name,
      that.generateHash("newuser"),
      email,
      profile,
      userActive
    );
  }

  update(user) {
    const that = this;

    return new Promise(function(resolve, reject) {
      that
        .DBA_update(
          user.id,
          user.name,
          user.email,
          user.profile,
          user.active,
          user.token
        )
        .then(sqlResult => {
          if (sqlResult.error) {
            if (sqlResult.error.code) {
              return reject("This user already exists.");
            }
            return reject(sqlResult.error);
          } else {
            return resolve(sqlResult.rowID);
          }
        })
        .catch(error => reject(error));
    });
  }

  DBA_update(userID, name, email, profile, userActive, token) {
    return UserDBA.update(userID, name, email, profile, userActive, token);
  }

  update_password(token, password) {
    const that = this;

    return new Promise(function(resolve, reject) {
      that
        .DBA_update_password(token, password)
        .then(() => resolve("Password changed"));
    });
  }

  DBA_update_password(token, password) {
    return UserDBA.update_password(token, this.generateHash(password));
  }

  remove(userID) {
    const that = this;
    return new Promise(function(resolve, reject) {
      that.DBA_remove(userID).then(sqlResult => {
        if (sqlResult.error) {
          return reject(sqlResult.error);
        } else {
          return resolve(sqlResult.id);
        }
      });
    });
  }

  DBA_remove(id) {
    return UserDBA.remove(id);
  }

  authenticate(username, password) {
    const that = this;
    return new Promise(function(resolve, reject) {
      that.DBA_authenticate(username, password).then(sqlResult => {
        if (sqlResult.error) {
          return reject(sqlResult.error);
        } else {
          return resolve(sqlResult.row);
        }
      });
    });
  }

  DBA_authenticate(username, password) {
    const that = this;
    return new Promise(function(resolve, reject) {
      UserDBA.getSecure(username).then(sqlResult => {
        if (sqlResult.error) {
          return resolve(sqlResult);
        }

        if (sqlResult.row === undefined) {
          sqlResult.error = "Invalid credentials";
          return resolve(sqlResult);
        }

        if (sqlResult.row.userActive === 0) {
          sqlResult.error =
            "Your user is inactive. Please contact your director to reactivate your account.";
          return resolve(sqlResult);
        }

        that
          .validPassword(password, sqlResult.row.userPassword)
          .then(result => {
            if (result === true) {
              return resolve(sqlResult);
            } else {
              sqlResult.error = "Invalid credentials";
              return resolve(sqlResult);
            }
          })
          .catch(error => {
            sqlResult.error = error;
            return resolve(sqlResult);
          });
      });
    });
  }

  block(username, token) {
    const that = this;
    return new Promise(function(resolve, reject) {
      that
        .find(username)
        .then(row => {
          if (row) {
            that
              .DBA_update(
                row.userID,
                row.userName,
                row.userEmail,
                row.profileID,
                false,
                token
              )
              .then(sqlResult =>
                that.DBA_createLog(sqlResult.rowID).then(() => resolve(1))
              );
          }
        })
        .catch(error => reject(error));
    });
  }

  DBA_createLog(id) {
    return UserDBA.createLog(id);
  }

  sendEmail(username, token) {
    const that = this;
    return new Promise(function(resolve, reject) {
      that.find(username).then(row => {
        var mailOptions = {
          from: "log210_a2018@hotmail.com",
          to: row.userEmail,
          subject: "Your LOG210 account has been banned",
          text:
            "Please contact your director to reset your password!\n" +
            "http://localhost:3000/users/reset?token=" +
            token
        };

        that.transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      });
    });
  }

  generateHash(password) {
    return bcrypt.hashSync(password, 10);
  }

  validPassword(password1, password2) {
    return new Promise(function(resolve, reject) {
      bcrypt
        .compare(password1, password2)
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  }
};
