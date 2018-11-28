const ServiceLineModel = require("../src/models/serviceLineModel");

describe("Get Service Line Model tests", function() {
  test("Get Service Line Model tests - Model fails", function(done) {
    let model = new ServiceLineModel();

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

  test("Get Service Line Model tests - Model Success", function(done) {
    let model = new ServiceLineModel();

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

describe("GetAll Service Line Model tests", function() {
  test("GetAll Service Line Model tests - Model fails", function(done) {
    let model = new ServiceLineModel();

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

  test("GetAll Service Line Model tests - Model Success", function(done) {
    let model = new ServiceLineModel();

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

describe("FindByService Service Line Model tests", function() {
  test("FindByService Service Line Model tests - Model fails", function(done) {
    let model = new ServiceLineModel();

    model.DBA_findByService = jest.fn(
      id =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: "Find query fails.",
            row: id
          });
        })
    );

    model
      .findByService(1)
      .then(row => {
        expect(1).toEqual(0);
        done();
      })
      .catch(error => {
        expect(error).toEqual("Find query fails.");
        done();
      });
  });

  test("FindByService Service Line Model tests - Model Success", function(done) {
    let model = new ServiceLineModel();

    model.DBA_findByService = jest.fn(
      id =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            row: id
          });
        })
    );

    model
      .findByService(1)
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

describe("FindByServicePoint Service Line Model tests", function() {
  test("FindByServicePoint Service Line Model tests - Model fails", function(done) {
    let model = new ServiceLineModel();

    model.DBA_findByServicePoint = jest.fn(
      id =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: "Find query fails.",
            row: id
          });
        })
    );

    model
      .findByServicePoint(1)
      .then(row => {
        expect(1).toEqual(0);
        done();
      })
      .catch(error => {
        expect(error).toEqual("Find query fails.");
        done();
      });
  });

  test("FindByServicePoint Service Line Model tests - Model Success", function(done) {
    let model = new ServiceLineModel();

    model.DBA_findByServicePoint = jest.fn(
      id =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            row: id
          });
        })
    );

    model
      .findByServicePoint(1)
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

describe("Create Service Line Model tests", function() {
  test("Create Service Line Model tests - Model fails", function(done) {
    let model = new ServiceLineModel();

    model.DBA_create = jest.fn(
      (serviceID, servicePointID) =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: "Create query fails.",
            rowID: null
          });
        })
    );

    model
      .create({ servicePointID: 1, serviceID: 1 })
      .then(rowID => {
        expect(1).toEqual(0);
        done();
      })
      .catch(error => {
        expect(error).toEqual("Create query fails.");
        done();
      });
  });

  test("Create Service Line Model tests - Model success", function(done) {
    let model = new ServiceLineModel();

    model.DBA_create = jest.fn(
      (idPointDeService, idService) =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            rowID: idService
          });
        })
    );

    model
      .create({ servicePointID: 1, serviceID: 1 })
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

describe("Update Service Line Model tests", function() {
  test("Update Service Line Model tests - Model fails", function(done) {
    let model = new ServiceLineModel();

    model.DBA_update = jest.fn(
      (id, serviceID, servicePointID) =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: "Update query fails.",
            rowID: null
          });
        })
    );

    model
      .update({ serviceLineID: 1, servicePointID: 1, serviceID: 1 })
      .then(rowID => {
        expect(1).toEqual(0);
        done();
      })
      .catch(error => {
        expect(error).toEqual("Update query fails.");
        done();
      });
  });

  test("Update Service Line Model tests - Model success", function(done) {
    let model = new ServiceLineModel();

    model.DBA_update = jest.fn(
      (id, idPointDeService, idService) =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            rowID: idService
          });
        })
    );

    model
      .update({ serviceLineID: 1, servicePointID: 1, serviceID: 1 })
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

describe("Remove Service Line Model tests", function() {
  test("Remove Service Line Model tests - Model fails", function(done) {
    let model = new ServiceLineModel();

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

  test("Remove Service Line Model tests - Model success", function(done) {
    let model = new ServiceLineModel();

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

describe("RemoveFromService Service Line Model tests", function() {
  test("RemoveFromService Service Line Model tests - Model fails", function(done) {
    let model = new ServiceLineModel();

    model.DBA_removeFromService = jest.fn(
      id =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: "RemoveFromService query fails.",
            id: null
          });
        })
    );

    model
      .removeFromService(1)
      .then(id => {
        expect(1).toEqual(0);
        done();
      })
      .catch(error => {
        expect(error).toEqual("RemoveFromService query fails.");
        done();
      });
  });

  test("RemoveFromService Service Line Model tests - Model success", function(done) {
    let model = new ServiceLineModel();

    model.DBA_removeFromService = jest.fn(
      id =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            id: id
          });
        })
    );

    model
      .removeFromService(1)
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
