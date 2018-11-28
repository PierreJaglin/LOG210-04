const HistoriqueTarificationServiceDBA = require("../dba/historiqueTarificationServiceDBA");

module.exports = class HistoriqueTarificationServiceModel {
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
    return HistoriqueTarificationServiceDBA.get(id);
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
    return HistoriqueTarificationServiceDBA.getAll();
  }

  find(serviceID) {
    const that = this;
    return new Promise(function(resolve, reject) {
      that.DBA_find(serviceID).then(sqlResult => {
        if (sqlResult.error) {
          return reject(sqlResult.error);
        } else {
          return resolve(sqlResult.row);
        }
      });
    });
  }

  DBA_find(serviceID) {
    return HistoriqueTarificationServiceDBA.find(serviceID);
  }

  create(historiqueTarificationService) {
    const that = this;

    return new Promise(function(resolve, reject) {
      that
        .DBA_create(
          historiqueTarificationService.serviceID,
          historiqueTarificationService.tarificationParent,
          historiqueTarificationService.tarificationSubventionee,
          historiqueTarificationService.tarificationCISSS,
          historiqueTarificationService.dateEntreeVigueur
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

  DBA_create(
    serviceID,
    tarificationParent,
    subventionee,
    tarificationCISSS,
    dateEntreeVigueur
  ) {
    return HistoriqueTarificationServiceDBA.create(
      serviceID,
      tarificationParent,
      subventionee,
      tarificationCISSS,
      dateEntreeVigueur
    );
  }

  update(historiqueTarificationService) {
    const that = this;

    return new Promise(function(resolve, reject) {
      that
        .DBA_update(
          historiqueTarificationService.id,
          historiqueTarificationService.serviceID,
          historiqueTarificationService.tarificationParent,
          historiqueTarificationService.tarificationSubventionee,
          historiqueTarificationService.tarificationCISSS,
          historiqueTarificationService.dateEntreeVigueur
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

  DBA_update(
    id,
    serviceID,
    tarificationParent,
    subventionee,
    tarificationCISSS,
    dateEntreeVigueur
  ) {
    return HistoriqueTarificationServiceDBA.update(
      id,
      serviceID,
      tarificationParent,
      subventionee,
      tarificationCISSS,
      dateEntreeVigueur
    );
  }

  removeFromService(serviceID) {
    const that = this;
    return new Promise(function(resolve, reject) {
      that.DBA_removeFromService(serviceID).then(sqlResult => {
        if (sqlResult.error) {
          return reject(sqlResult.error);
        } else {
          return resolve(sqlResult.id);
        }
      });
    });
  }

  DBA_removeFromService(id) {
    return HistoriqueTarificationServiceDBA.removeFromService(id);
  }
};
