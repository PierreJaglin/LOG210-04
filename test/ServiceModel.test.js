const ServiceModel = require("../src/models/serviceModel");
const ServiceLineModel = require("../src/models/serviceLineModel");
const HistoriqueModel = require("../src/models/historiqueTarificationServiceModel");

describe("Get Service Model tests", function() {
  test("Get Service Model tests - Model fails", function(done) {
    let model = new ServiceModel();

    model.DBA_get = jest.fn(
      id =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: "Get query fails.",
            row: null
          });
        })
    );

    model
      .get(1)
      .then(row => {
        expect(1).toEqual(0);
        done();
      })
      .catch(error => {
        expect(error).toEqual("Get query fails.");
        done();
      });
  });

  test("Get Service Model tests - Model Success", function(done) {
    let model = new ServiceModel();

    model.DBA_get = jest.fn(
      id =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            row: id
          });
        })
    );

    model
      .get(1)
      .then(row => {
        expect(row).toEqual(1);
        done();
      })
      .catch(error => {
        expect(error).toEqual(0);
        done();
      });
  });
});

describe("GetAll Service Model tests", function() {
  test("GetAll Service Model tests - Model fails", function(done) {
    let model = new ServiceModel();

    model.DBA_getAll = jest.fn(
      () =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: "GetAll query fails.",
            rows: null
          });
        })
    );

    model
      .getAll()
      .then(rows => {
        expect(1).toEqual(0);
        done();
      })
      .catch(error => {
        expect(error).toEqual("GetAll query fails.");
        done();
      });
  });

  test("GetAll Service Model tests - Model Success", function(done) {
    let model = new ServiceModel();

    model.DBA_getAll = jest.fn(
      () =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            rows: [1, 2]
          });
        })
    );

    model
      .getAll()
      .then(rows => {
        expect(rows).toEqual([1, 2]);
        done();
      })
      .catch(error => {
        expect(error).toEqual(0);
        done();
      });
  });
});

describe("Create Service Model tests", function() {
  test("Create Service Model tests - Service Line Model fails", function(done) {
    let model = new ServiceModel();
    model.serviceLineModel = new ServiceLineModel();
    model.historiqueModel = new HistoriqueModel();

    model.serviceLineModel.create = jest.fn(
      serviceLine =>
        new Promise(function(resolve, reject) {
          return reject("Create query fails.");
        })
    );

    model.historiqueModel.create = jest.fn(
      historique =>
        new Promise(function(resolve, reject) {
          return reject("Should not be here.");
        })
    );

    model.DBA_create = jest.fn(
      (name, desc, active) =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            rowID: name
          });
        })
    );

    model.DBA_find = jest.fn(
      name =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            row: {
              serviceID: 1
            }
          });
        })
    );

    const service = {
      id: 0,
      name: "test1",
      description: "",
      parent: 0,
      subvention: true,
      cisss: 0,
      dateEntreeVigueur: "2018-11-10",
      servicePoint: 1,
      active: true
    };

    model
      .create(service)
      .then(row => {
        expect(1).toEqual(0);
        done();
      })
      .catch(error => {
        expect(error).toEqual("Create query fails.");
        done();
      });
  });

  test("Create Service Model tests - Historique Model fails", function(done) {
    let model = new ServiceModel();
    model.serviceLineModel = new ServiceLineModel();
    model.historiqueModel = new HistoriqueModel();

    model.serviceLineModel.create = jest.fn(
      serviceLine =>
        new Promise(function(resolve, reject) {
          return resolve(1);
        })
    );

    model.historiqueModel.create = jest.fn(
      historique =>
        new Promise(function(resolve, reject) {
          return reject("Create query fails.");
        })
    );

    model.DBA_create = jest.fn(
      (name, desc, active) =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            rowID: name
          });
        })
    );

    model.DBA_find = jest.fn(
      name =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            row: {
              serviceID: 1
            }
          });
        })
    );

    const service = {
      id: 0,
      name: "test2",
      description: "",
      parent: 0,
      subvention: true,
      cisss: 0,
      dateEntreeVigueur: "2018-11-10",
      servicePoint: 1,
      active: true
    };

    model
      .create(service)
      .then(row => {
        expect(1).toEqual(0);
        done();
      })
      .catch(error => {
        expect(error).toEqual("Create query fails.");
        done();
      });
  });

  test("Create Service Model tests - Model fails", function(done) {
    let model = new ServiceModel();
    model.serviceLineModel = new ServiceLineModel();
    model.historiqueModel = new HistoriqueModel();

    model.serviceLineModel.create = jest.fn(
      serviceLine =>
        new Promise(function(resolve, reject) {
          return resolve(1);
        })
    );

    model.historiqueModel.create = jest.fn(
      historique =>
        new Promise(function(resolve, reject) {
          return resolve(1);
        })
    );

    model.DBA_create = jest.fn(
      (name, desc, active) =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: "Create query fails.",
            rowID: null
          });
        })
    );

    model.DBA_find = jest.fn(
      name =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            row: {
              serviceID: 1
            }
          });
        })
    );

    const service = {
      id: 0,
      name: "test3",
      description: "",
      parent: 0,
      subvention: true,
      cisss: 0,
      dateEntreeVigueur: "2018-11-10",
      servicePoint: 1,
      active: true
    };

    model
      .create(service)
      .then(rowID => {
        expect(1).toEqual(0);
        done();
      })
      .catch(error => {
        expect(error).toEqual("Create query fails.");
        done();
      });
  });

  test("Create Service Model tests - Model success", function(done) {
    let model = new ServiceModel();
    model.serviceLineModel = new ServiceLineModel();
    model.historiqueModel = new HistoriqueModel();

    model.serviceLineModel.create = jest.fn(
      serviceLine =>
        new Promise(function(resolve, reject) {
          return resolve(1);
        })
    );

    model.historiqueModel.create = jest.fn(
      historique =>
        new Promise(function(resolve, reject) {
          return resolve(1);
        })
    );

    model.DBA_create = jest.fn(
      (name, desc, active) =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            rowID: name
          });
        })
    );

    model.DBA_find = jest.fn(
      name =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: "Create query fails.",
            row: {
              serviceID: 1
            }
          });
        })
    );

    const service = {
      id: 0,
      name: "test4",
      description: "",
      parent: 0,
      subvention: true,
      cisss: 0,
      dateEntreeVigueur: "2018-11-10",
      servicePoint: 1,
      active: true
    };

    model
      .create(service)
      .then(rowID => {
        expect(rowID).toEqual("test4");
        done();
      })
      .catch(error => {
        expect(error).toEqual(0);
        done();
      });
  });
});

describe("Update Service Model tests", function() {
  test("Update Service Model tests - Service Line Model fails", function(done) {
    let model = new ServiceModel();
    model.serviceLineModel = new ServiceLineModel();
    model.historiqueModel = new HistoriqueModel();

    model.serviceLineModel.findByService = jest.fn(
      id =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            row: {
              serviceLineID: 1
            }
          });
        })
    );

    model.serviceLineModel.update = jest.fn(
      serviceLine =>
        new Promise(function(resolve, reject) {
          return reject("Update query fails.");
        })
    );

    model.historiqueModel.create = jest.fn(
      historique =>
        new Promise(function(resolve, reject) {
          return reject("Should not be here.");
        })
    );

    model.DBA_update = jest.fn(
      (id, name, desc, active) =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            rowID: id
          });
        })
    );

    const service = {
      id: 0,
      name: "test",
      description: "",
      parent: 0,
      subvention: true,
      cisss: 0,
      dateEntreeVigueur: "2018-11-10",
      servicePoint: 1,
      active: true
    };

    model
      .update(service)
      .then(row => {
        expect(1).toEqual(0);
        done();
      })
      .catch(error => {
        expect(error).toEqual("Update query fails.");
        done();
      });
  });

  test("Update Service Model tests - Historique Model fails", function(done) {
    let model = new ServiceModel();
    model.serviceLineModel = new ServiceLineModel();
    model.historiqueModel = new HistoriqueModel();

    model.serviceLineModel.update = jest.fn(
      serviceLine =>
        new Promise(function(resolve, reject) {
          return resolve(1);
        })
    );

    model.serviceLineModel.findByService = jest.fn(
      id =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            row: {
              serviceLineID: 1
            }
          });
        })
    );

    model.historiqueModel.create = jest.fn(
      historique =>
        new Promise(function(resolve, reject) {
          return reject("Create query fails.");
        })
    );

    model.DBA_update = jest.fn(
      (id, name, desc, active) =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            rowID: id
          });
        })
    );

    const service = {
      id: 0,
      name: "test",
      description: "",
      parent: 0,
      subvention: true,
      cisss: 0,
      dateEntreeVigueur: "2018-11-10",
      servicePoint: 1,
      active: true
    };

    model
      .update(service)
      .then(row => {
        expect(1).toEqual(0);
        done();
      })
      .catch(error => {
        expect(error).toEqual("Create query fails.");
        done();
      });
  });

  test("Update Service Model tests - Model fails", function(done) {
    let model = new ServiceModel();
    model.serviceLineModel = new ServiceLineModel();
    model.historiqueModel = new HistoriqueModel();

    model.serviceLineModel.findByService = jest.fn(
      id =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            row: {
              serviceLineID: 1
            }
          });
        })
    );

    model.serviceLineModel.update = jest.fn(
      serviceLine =>
        new Promise(function(resolve, reject) {
          return resolve(1);
        })
    );

    model.historiqueModel.create = jest.fn(
      historique =>
        new Promise(function(resolve, reject) {
          return resolve(1);
        })
    );

    model.DBA_update = jest.fn(
      (id, name, desc, active) =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: "Update query fails.",
            rowID: null
          });
        })
    );

    model
      .update({ id: 1, name: "test", description: "test", serviceActif: true })
      .then(rowID => {
        expect(1).toEqual(0);
        done();
      })
      .catch(error => {
        expect(error).toEqual("Update query fails.");
        done();
      });
  });

  test("Update Service Model tests - Model success", function(done) {
    let model = new ServiceModel();
    model.serviceLineModel = new ServiceLineModel();
    model.historiqueModel = new HistoriqueModel();

    model.serviceLineModel.findByService = jest.fn(
      id =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            row: {
              serviceLineID: 1
            }
          });
        })
    );

    model.serviceLineModel.update = jest.fn(
      serviceLine =>
        new Promise(function(resolve, reject) {
          return resolve(1);
        })
    );

    model.historiqueModel.create = jest.fn(
      historique =>
        new Promise(function(resolve, reject) {
          return resolve(1);
        })
    );

    model.DBA_update = jest.fn(
      (id, name, desc, active) =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            rowID: id
          });
        })
    );

    model.DBA_find = jest.fn(
      name =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            row: {
              serviceID: 1
            }
          });
        })
    );

    const service = {
      id: 1,
      name: "test",
      description: "",
      parent: 0,
      subvention: true,
      cisss: 0,
      dateEntreeVigueur: "2018-11-10",
      servicePoint: 1,
      active: true
    };

    model
      .update(service)
      .then(rowID => {
        expect(rowID).toEqual(1);
        done();
      })
      .catch(error => {
        expect(error).toEqual(0);
        done();
      });
  });
});

describe("Remove Service Model tests", function() {
  test("Remove Service Model tests - Model fails", function(done) {
    let model = new ServiceModel();

    model.serviceLineModel.removeFromService = jest.fn(
      id =>
        new Promise(function(resolve, reject) {
          return resolve(1);
        })
    );

    model.DBA_remove = jest.fn(
      id =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: "Remove query fails.",
            id: null
          });
        })
    );

    model
      .remove(1)
      .then(id => {
        expect(1).toEqual(0);
        done();
      })
      .catch(error => {
        expect(error).toEqual("Remove query fails.");
        done();
      });
  });

  test("Remove Service Model tests - Model success", function(done) {
    let model = new ServiceModel();

    model.serviceLineModel.removeFromService = jest.fn(
      id =>
        new Promise(function(resolve, reject) {
          return resolve(1);
        })
    );

    model.DBA_remove = jest.fn(
      id =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            id: id
          });
        })
    );

    model
      .remove(1)
      .then(id => {
        expect(id).toEqual(1);
        done();
      })
      .catch(error => {
        expect(error).toEqual(0);
        done();
      });
  });
});
