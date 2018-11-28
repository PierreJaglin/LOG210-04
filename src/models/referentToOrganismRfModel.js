const ReferentToOrganismRfDBA = require("../dba/referentToOrganismRfDBA");

module.exports = class ReferentToOrganismRfModel {
  constructor() {}

  get(id) {
    const that = this;
    return new Promise(function(resolve, reject) {
      that.DBA_get(id).then(sqlResult => {
        if (sqlResult.error) {
          return reject(sqlResult.error);
        } else {
          return resolve(sqlResult.row);
        }
      });
    });
  }

  DBA_get(id) {
    return ReferentToOrganismRfDBA.get(id);
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
    return ReferentToOrganismRfDBA.getAll();
  }

  getAllFromReferent(id) {
    const that = this;
    return new Promise(function(resolve, reject) {
      that.DBA_getAllFromReferent(id).then(sqlResult => {
        if (sqlResult.error) {
          return reject(sqlResult.error);
        } else {
          return resolve(sqlResult.rows);
        }
      });
    });
  }

  DBA_getAllFromReferent(id) {
    return ReferentToOrganismRfDBA.getAllFromReferent(id);
  }

  findByReferent(id) {
    const that = this;
    return new Promise(function(resolve, reject) {
      that.DBA_findByReferent(id).then(sqlResult => {
        if (sqlResult.error) {
          return reject(sqlResult.error);
        } else {
          return resolve(sqlResult.row);
        }
      });
    });
  }

  DBA_findByReferent(id) {
    return ReferentToOrganismRfDBA.findByReferent(id);
  }

  findByOrganismReferent(id) {
    const that = this;
    return new Promise(function(resolve, reject) {
      that.DBA_findByOrganismReferent(id).then(sqlResult => {
        if (sqlResult.error) {
          return reject(sqlResult.error);
        } else {
          return resolve(sqlResult.row);
        }
      });
    });
  }

  DBA_findByOrganismReferent(id) {
    return ReferentToOrganismRfDBA.findByOrganismReferent(id);
  }

  create(referentToOrganismRf) {
    const that = this;
    return new Promise(function(resolve, reject) {
      that
        .DBA_create(
          referentToOrganismRf.referentID,
          referentToOrganismRf.organismReferentID
        )
        .then(sqlResult => {
          if (sqlResult.error) {
            return reject(sqlResult.error);
          } else {
            return resolve(sqlResult.rowID);
          }
        })
        .catch(error => reject(error));
    });
  }

  DBA_create(referentID, organismReferentID) {
    return ReferentToOrganismRfDBA.create(referentID, organismReferentID);
  }

  update(referentToOrganismRf) {
    const that = this;
    return new Promise(function(resolve, reject) {
      that
        .DBA_update(
          referentToOrganismRf.referentToOrganismRfID,
          referentToOrganismRf.referentID,
          referentToOrganismRf.organismReferentID
        )
        .then(sqlResult => {
          if (sqlResult.error) {
            return reject(sqlResult.error);
          } else {
            return resolve(sqlResult.rowID);
          }
        })
        .catch(error => reject(error));
    });
  }

  DBA_update(referentToOrganismRfID, referentID, organismReferentID) {
    return ReferentToOrganismRfDBA.update(
      referentToOrganismRfID,
      referentID,
      organismReferentID
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
    return ReferentToOrganismRfDBA.remove(id);
  }

  removeFromReferent(id) {
    const that = this;
    return new Promise(function(resolve, reject) {
      that.DBA_removeFromReferent(id).then(sqlResult => {
        if (sqlResult.error) {
          return reject(sqlResult.error);
        } else {
          return resolve(sqlResult.id);
        }
      });
    });
  }

  DBA_removeFromReferent(id) {
    return ReferentToOrganismRfDBA.removeFromReferent(id);
  }
};
