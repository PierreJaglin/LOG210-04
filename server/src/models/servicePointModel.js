const SerivcePointDBA = require("../dba/servicePointDBA");
const AddressModel = require("./addressModel");

module.exports = class ServicePointModel {
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

  DBA_get(id) {
    return SerivcePointDBA.get(id);
  }

  getAll(id, active) {
    const that = this;
    return new Promise(function(resolve, reject) {
      that.DBA_getAll(id, active).then(sqlResult => {
        if (sqlResult.error) {
          return reject(sqlResult.error);
        } else {
          return resolve(sqlResult.rows);
        }
      });
    });
  }

  DBA_getAll(id, active) {
    if (id) {
      return SerivcePointDBA.getAllFromOrganism(id);
    } else if (active) {
      return SerivcePointDBA.getAllActive(active);
    } else {
      return SerivcePointDBA.getAll();
    }
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

  DBA_find(name) {
    return SerivcePointDBA.find(name);
  }

  create(servicePoint) {
    const that = this;

    return new Promise(function(resolve, reject) {
      that.addressModel
        .find(servicePoint.address.postalCode)
        .then(row => {
          // If Address already exist, we simply create the organism with the existing ID
          if (row) {
            that
              .DBA_create(
                servicePoint.name,
                row.addressID,
                servicePoint.phone,
                servicePoint.fax,
                servicePoint.email,
                servicePoint.active,
                servicePoint.organism
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
              .create(servicePoint.address)
              .then(id => {
                that
                  .DBA_create(
                    servicePoint.name,
                    id,
                    servicePoint.phone,
                    servicePoint.fax,
                    servicePoint.email,
                    servicePoint.active,
                    servicePoint.organism
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

  DBA_create(name, addressID, phone, fax, email, servicePointActive, organism) {
    return SerivcePointDBA.create(
      name,
      addressID,
      phone,
      fax,
      email,
      servicePointActive,
      organism
    );
  }

  update(servicePoint) {
    const that = this;

    return new Promise(function(resolve, reject) {
      that.addressModel
        .find(servicePoint.address.postalCode)
        .then(row => {
          // If Address already exist, we simply create the organism with the existing ID
          if (row) {
            that
              .DBA_update(
                servicePoint.id,
                servicePoint.name,
                row.addressID,
                servicePoint.phone,
                servicePoint.fax,
                servicePoint.email,
                servicePoint.active,
                servicePoint.organism
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
              .create(servicePoint.address)
              .then(id => {
                that
                  .DBA_update(
                    servicePoint.id,
                    servicePoint.name,
                    id,
                    servicePoint.phone,
                    servicePoint.fax,
                    servicePoint.email,
                    servicePoint.active,
                    servicePoint.organism
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

  DBA_update(
    id,
    name,
    addressID,
    phone,
    fax,
    email,
    servicePointActive,
    organism
  ) {
    return SerivcePointDBA.update(
      id,
      name,
      addressID,
      phone,
      fax,
      email,
      servicePointActive,
      organism
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
    return SerivcePointDBA.remove(id);
  }
};
