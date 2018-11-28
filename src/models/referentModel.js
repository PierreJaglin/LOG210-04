const ReferentDBA = require("../dba/referentDBA");
const RfOrganismRf = require("./referentToOrganismRfModel");

module.exports = class ReferentModel {
  constructor() {
    this.rfOrganismModel = new RfOrganismRf();
  }

  get(id) {
    const that = this;
    return new Promise(function(resolve, reject) {
      that.DBA_get(id).then(sqlResult => {
        if (sqlResult.error) {
          return reject(sqlResult.error);
        } else {
          that.rfOrganismModel.getAllFromReferent(id).then(rows => {
            var listID = [];

            rows.forEach(element => {
              listID.push(element.organismReferentID);
            });
            var result = {
              referentID: sqlResult.row.referentID,
              referentLastName: sqlResult.row.referentLastName,
              referentFirstName: sqlResult.row.referentFirstName,
              referentTitle: sqlResult.row.referentTitle,
              referentPhone: sqlResult.row.referentPhone,
              referentOfficePhone: sqlResult.row.referentOfficePhone,
              referentFax: sqlResult.row.referentFax,
              referentEmail: sqlResult.row.referentEmail,
              referentPrefFax: sqlResult.row.referentPrefFax,
              referentPrefEmail: sqlResult.row.referentPrefEmail,
              referentPrefPaper: sqlResult.row.referentPrefPaper,
              organismsReferents: listID
            };
            return resolve(result);
          });
        }
      });
    });
  }

  DBA_get(id) {
    return ReferentDBA.get(id);
  }

  getAll(id) {
    const that = this;
    return new Promise(function(resolve, reject) {
      that.DBA_getAll(id).then(sqlResult => {
        if (sqlResult.error) {
          return reject(sqlResult.error);
        } else {
          return resolve(sqlResult.rows);
        }
      });
    });
  }

  DBA_getAll(id) {
    if (id) {
      return ReferentDBA.getAllFromOrganismReferent(id);
    } else {
      return ReferentDBA.getAll();
    }
  }

  findByEmail(email) {
    const that = this;
    return new Promise(function(resolve, reject) {
      that.DBA_findByEmail(email).then(sqlResult => {
        if (sqlResult.error) {
          return reject(sqlResult.error);
        } else {
          return resolve(sqlResult.row);
        }
      });
    });
  }

  DBA_findByEmail(email) {
    return ReferentDBA.findByEmail(email);
  }

  create(referent) {
    const that = this;
    return new Promise(function(resolve, reject) {
      that
        .DBA_create(
          referent.lastName,
          referent.firstName,
          referent.title,
          referent.phone,
          referent.officePhone,
          referent.fax,
          referent.email,
          referent.prefFax,
          referent.prefEmail,
          referent.prefPaper
        )
        .then(sqlResult => {
          if (sqlResult.error) {
            return reject(sqlResult.error);
          } else {
            that.findByEmail(referent.email).then(row => {
              referent.organismsReferents.forEach(element => {
                that.rfOrganismModel
                  .create({
                    referentID: row.referentID,
                    organismReferentID: parseInt(element)
                  })
                  .catch(error =>
                    console.log("Creation de RF : " + element + " - " + error)
                  );
              });
            });
            return resolve(sqlResult.rowID);
          }
        })
        .catch(error => reject(error));
    });
  }

  DBA_create(
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
    return ReferentDBA.create(
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
    );
  }

  update(referent) {
    const that = this;
    return new Promise(function(resolve, reject) {
      that
        .DBA_update(
          referent.id,
          referent.lastName,
          referent.firstName,
          referent.title,
          referent.phone,
          referent.officePhone,
          referent.fax,
          referent.email,
          referent.prefFax,
          referent.prefEmail,
          referent.prefPaper
        )
        .then(sqlResult => {
          if (sqlResult.error) {
            return reject(sqlResult.error);
          } else {
            that.rfOrganismModel.removeFromReferent(referent.id).then(id =>
              referent.organismsReferents.forEach(element => {
                that.rfOrganismModel
                  .create({
                    referentID: referent.id,
                    organismReferentID: parseInt(element)
                  })
                  .catch(error =>
                    console.log("Creation de RF : " + element + " - " + error)
                  );
              })
            );
            return resolve(sqlResult.rowID);
          }
        })
        .catch(error => reject(error));
    });
  }

  DBA_update(
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
    return ReferentDBA.update(
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
    );
  }

  remove(id) {
    const that = this;
    return new Promise(function(resolve, reject) {
      that.DBA_remove(id).then(sqlResult => {
        if (sqlResult.error) {
          return reject(sqlResult.error);
        } else {
          return resolve(sqlResult.id);
        }
      });
    });
  }

  DBA_remove(id) {
    return ReferentDBA.remove(id);
  }
};
