const OrganismReferentDBA = require("../dba/organismReferentDBA");
const AddressModel = require("./addressModel");

module.exports = class OrganismReferentModel {
  constructor() {
    this.addressModel = new AddressModel();
  }

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

  getAll(active) {
    const that = this;
    return new Promise(function(resolve, reject) {
      that.DBA_getAll(active).then(sqlResult => {
        if (sqlResult.error) {
          return reject(sqlResult.error);
        } else {
          return resolve(sqlResult.rows);
        }
      });
    });
  }

  getAllByOrganism(organismID) {
    const that = this;
    return new Promise(function(resolve, reject) {
      that.DBA_getAllByOrganism(organismID).then(sqlResult => {
        if (sqlResult.error) {
          return reject(sqlResult.error);
        } else {
          return resolve(sqlResult.rows);
        }
      });
    });
  }

  find(name) {
    const that = this;
    return new Promise(function(resolve, reject) {
      that.DBA_find(name).then(sqlResult => {
        if (sqlResult.error) {
          return reject(sqlResult.error);
        } else {
          return resolve(sqlResult.row);
        }
      });
    });
  }

  create(organismReferent) {
    const that = this;
    return new Promise(function(resolve, reject) {
      that.addressModel
        .find(organismReferent.address.postalCode)
        .then(row => {
          // If Address already exist, we simply create the organism referent with the existing ID
          if (row) {
            that
              .DBA_create(
                organismReferent.name,
                row.addressID,
                organismReferent.phone,
                organismReferent.fax,
                organismReferent.email,
                organismReferent.website,
                organismReferent.active,
                organismReferent.organism
              )
              .then(sqlResult => {
                if (sqlResult.error) {
                  return reject(sqlResult.error);
                } else {
                  return resolve(sqlResult.row);
                }
              });

            // If Address doesn't exist, we create it first, then we create the organism referent.
          } else {
            that.addressModel
              .create(organismReferent.address)
              .then(id => {
                that
                  .DBA_create(
                    organismReferent.name,
                    id,
                    organismReferent.phone,
                    organismReferent.fax,
                    organismReferent.email,
                    organismReferent.website,
                    organismReferent.active,
                    organismReferent.organism
                  )
                  .then(sqlResult => {
                    if (sqlResult.error) {
                      return reject(sqlResult.error);
                    } else {
                      return resolve(sqlResult.row);
                    }
                  });
              })
              .catch(error => reject(error));
          }
        })
        .catch(error => reject(error));
    });
  }

  update(organismReferent) {
    const that = this;
    return new Promise(function(resolve, reject) {
      that.addressModel
        .find(organismReferent.address.postalCode)
        .then(row => {
          // If Address already exist, we simply create the organism referent with the existing ID
          if (row) {
            that
              .DBA_update(
                organismReferent.id,
                organismReferent.name,
                row.addressID,
                organismReferent.phone,
                organismReferent.fax,
                organismReferent.email,
                organismReferent.website,
                organismReferent.active,
                organismReferent.organism
              )
              .then(sqlResult => {
                if (sqlResult.error) {
                  return reject(sqlResult.error);
                } else {
                  return resolve(sqlResult.row);
                }
              });

            // If Address doesn't exist, we create it first, then we create the organism referent.
          } else {
            that.addressModel
              .create(organismReferent.address)
              .then(id => {
                that
                  .DBA_update(
                    organismReferent.id,
                    organismReferent.name,
                    id,
                    organismReferent.phone,
                    organismReferent.fax,
                    organismReferent.email,
                    organismReferent.website,
                    organismReferent.active,
                    organismReferent.organism
                  )
                  .then(sqlResult => {
                    if (sqlResult.error) {
                      return reject(sqlResult.error);
                    } else {
                      return resolve(sqlResult.row);
                    }
                  });
              })
              .catch(error => reject(error));
          }
        })
        .catch(error => reject(error));
    });
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

  DBA_get(id) {
    return OrganismReferentDBA.get(id);
  }

  DBA_getOrganismReferent(id) {
    return OrganismReferentDBA.getOrganismReferent(id);
  }

  DBA_getAll(active) {
    if (active) {
      return OrganismReferentDBA.getAllActive(active);
    } else {
      return OrganismReferentDBA.getAll();
    }
  }

  DBA_getAllByOrganism(organismID) {
    return OrganismReferentDBA.getAllByOrganism(organismID);
  }

  DBA_find(name) {
    return OrganismReferentDBA.find(name);
  }

  DBA_create(name, addressID, phone, fax, email, website, active, organismID) {
    return OrganismReferentDBA.create(
      name,
      addressID,
      phone,
      fax,
      email,
      website,
      active,
      organismID
    );
  }

  DBA_update(
    id,
    name,
    addressID,
    phone,
    fax,
    email,
    website,
    active,
    organismID
  ) {
    return OrganismReferentDBA.update(
      id,
      name,
      addressID,
      phone,
      fax,
      email,
      website,
      active,
      organismID
    );
  }

  DBA_remove(id) {
    return OrganismReferentDBA.remove(id);
  }
};
