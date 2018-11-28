const ServiceDBA = require("../dba/serviceDBA");
const ServiceLineModel = require("../models/ServiceLineModel");
const HistoriqueModel = require("../models/historiqueTarificationServiceModel");

module.exports = class ServiceModel {
  constructor() {
    this.serviceLineModel = new ServiceLineModel();
    this.historiqueModel = new HistoriqueModel();
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
    return ServiceDBA.get(id);
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
      return ServiceDBA.getAllFromServicePoint(id);
    } else {
      return ServiceDBA.getAll();
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
    return ServiceDBA.find(name);
  }

  create(service) {
    const that = this;

    const historique = {
      serviceID: service.id,
      tarificationParent: service.parent,
      tarificationSubventionee: service.subvention,
      tarificationCISSS: service.cisss,
      dateEntreeVigueur: service.dateEntreeVigueur
    };
    return new Promise(function(resolve, reject) {
      that
        .DBA_create(service.name, service.description, service.active)
        .then(createSqlResult => {
          if (createSqlResult.error) {
            return reject(createSqlResult.error);
          } else {
            that
              .DBA_find(service.name)
              .then(sqlResult =>
                that.serviceLineModel
                  .create({
                    serviceID: sqlResult.row.serviceID,
                    servicePointID: service.servicePoint
                  })
                  .then(rowID =>
                    that.historiqueModel
                      .create(historique)
                      .then(rowID => resolve(createSqlResult.rowID))
                      .catch(error => reject(error))
                  )
                  .catch(error => reject(error))
              )
              .catch(error => reject(error));
          }
        });
    });
  }

  DBA_create(name, description, serviceActive) {
    return ServiceDBA.create(name, description, serviceActive);
  }

  update(service) {
    const that = this;

    const historique = {
      serviceID: service.id,
      tarificationParent: service.parent,
      tarificationSubventionee: service.subvention,
      tarificationCISSS: service.cisss,
      dateEntreeVigueur: service.dateEntreeVigueur
    };

    return new Promise(function(resolve, reject) {
      that.serviceLineModel.findByService(service.id).then(row =>
        that.serviceLineModel
          .update({
            serviceLineID: row.serviceLineID,
            serviceID: service.id,
            servicePointID: service.servicePoint
          })
          .then(rowID =>
            that
              .DBA_update(
                service.id,
                service.name,
                service.description,
                service.active
              )
              .then(sqlResult => {
                if (sqlResult.error) {
                  return reject(sqlResult.error);
                } else {
                  that.historiqueModel
                    .create(historique)
                    .then(rowID => resolve(sqlResult.rowID))
                    .catch(error => reject(error));
                }
              })
          )
          .catch(error => reject(error))
      );
    });
  }

  DBA_update(id, name, description, serviceActive) {
    return ServiceDBA.update(id, name, description, serviceActive);
  }

  remove(id) {
    const that = this;
    return new Promise(function(resolve, reject) {
      that.serviceLineModel.removeFromService(id).then(() =>
        that.DBA_remove(id).then(sqlResult => {
          if (sqlResult.error) {
            return reject(sqlResult.error);
          } else {
            return resolve(sqlResult.id);
          }
        })
      );
    });
  }

  DBA_remove(id) {
    return ServiceDBA.remove(id);
  }
};
