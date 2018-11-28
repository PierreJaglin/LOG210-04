const ServiceLineDBA = require("../dba/serviceLineDBA");

module.exports = class ListeServiceModel {
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
    return ServiceLineDBA.get(id);
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
    return ServiceLineDBA.getAll();
  }

  findByService(id) {
    const that = this;
    return new Promise(function(resolve, reject) {
      that.DBA_findByService(id).then(sqlResult => {
        if (sqlResult.error) {
          return reject(sqlResult.error);
        } else {
          return resolve(sqlResult.row);
        }
      });
    });
  }

  DBA_findByService(id) {
    return ServiceLineDBA.findByService(id);
  }

  findByServicePoint(id) {
    const that = this;
    return new Promise(function(resolve, reject) {
      that.DBA_findByServicePoint(id).then(sqlResult => {
        if (sqlResult.error) {
          return reject(sqlResult.error);
        } else {
          return resolve(sqlResult.row);
        }
      });
    });
  }

  DBA_findByServicePoint(id) {
    return ServiceLineDBA.findByServicePoint(id);
  }

  create(serviceLine) {
    const that = this;
    return new Promise(function(resolve, reject) {
      that
        .DBA_create(serviceLine.servicePointID, serviceLine.serviceID)
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

  DBA_create(idPointDeService, idService) {
    return ServiceLineDBA.create(idPointDeService, idService);
  }

  update(serviceLine) {
    const that = this;
    return new Promise(function(resolve, reject) {
      that
        .DBA_update(
          serviceLine.serviceLineID,
          serviceLine.servicePointID,
          serviceLine.serviceID
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

  DBA_update(serviceLineID, servicePointID, serviceID) {
    return ServiceLineDBA.update(serviceLineID, servicePointID, serviceID);
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
    return ServiceLineDBA.remove(id);
  }

  removeFromService(id) {
    const that = this;
    return new Promise(function(resolve, reject) {
      that.DBA_removeFromService(id).then(sqlResult => {
        if (sqlResult.error) {
          return reject(sqlResult.error);
        } else {
          return resolve(sqlResult.id);
        }
      });
    });
  }

  DBA_removeFromService(id) {
    return ServiceLineDBA.removeFromService(id);
  }
};
