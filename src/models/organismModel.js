const OrganismDBA = require("../dba/organismDBA");
const AddressModel = require("./addressModel");

module.exports = class OrganismModel {
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

  create(organism) {
    const that = this;
    return new Promise(function(resolve, reject) {
      that.addressModel
        .find(organism.address.postalCode)
        .then(row => {
          // If Address already exist, we simply create the organism with the existing ID
          if (row) {
            that
              .DBA_create(
                organism.name,
                row.addressID,
                organism.phone,
                organism.fax,
                organism.email,
                organism.active
              )
              .then(sqlResult => {
                if (sqlResult.error) {
                  return reject(sqlResult.error);
                } else {
                  return resolve(sqlResult.row);
                }
              });

            // If Address doesn't exist, we create it first, then we create the organism.
          } else {
            that.addressModel
              .create(organism.address)
              .then(id => {
                that
                  .DBA_create(
                    organism.name,
                    id,
                    organism.phone,
                    organism.fax,
                    organism.email,
                    organism.active
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

  update(organism) {
    const that = this;
    return new Promise(function(resolve, reject) {
      that.addressModel
        .find(organism.address.postalCode)
        .then(row => {
          // If Address already exist, we simply create the organism with the existing ID
          if (row) {
            that
              .DBA_update(
                organism.id,
                organism.name,
                row.addressID,
                organism.phone,
                organism.fax,
                organism.email,
                organism.active
              )
              .then(sqlResult => {
                if (sqlResult.error) {
                  return reject(sqlResult.error);
                } else {
                  return resolve(sqlResult.row);
                }
              });

            // If Address doesn't exist, we create it first, then we create the organism.
          } else {
            that.addressModel
              .create(organism.address)
              .then(id => {
                that
                  .DBA_update(
                    organism.id,
                    organism.name,
                    id,
                    organism.phone,
                    organism.fax,
                    organism.email,
                    organism.active
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
    return OrganismDBA.get(id);
  }

  DBA_getAll(active) {
    if (active) {
      return OrganismDBA.getAllActive(active);
    } else {
      return OrganismDBA.getAll(active);
    }
  }

  DBA_find(name) {
    return OrganismDBA.find(name);
  }

  DBA_create(name, addressID, phone, fax, email, active) {
    return OrganismDBA.create(name, addressID, phone, fax, email, active);
  }

  DBA_update(id, name, addressID, phone, fax, email, active) {
    return OrganismDBA.update(id, name, addressID, phone, fax, email, active);
  }

  DBA_remove(id) {
    return OrganismDBA.remove(id);
  }
};
