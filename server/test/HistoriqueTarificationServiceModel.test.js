const HistoriqueModel = require("../src/models/historiqueTarificationServiceModel");

describe("Get HistoriqueTarificationService Model tests", function() {
  test("Get HistoriqueTarificationService Model tests - Model fails", function(done) {
    let model = new HistoriqueModel();

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

  test("Get HistoriqueTarificationService Model tests - Model Success", function(done) {
    let model = new HistoriqueModel();

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

describe("GetAll HistoriqueTarificationService Model tests", function() {
  test("GetAll HistoriqueTarificationService Model tests - Model fails", function(done) {
    let model = new HistoriqueModel();

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

  test("GetAll HistoriqueTarificationService Model tests - Model Success", function(done) {
    let model = new HistoriqueModel();

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

describe("Find HistoriqueTarificationService Model tests", function() {
  test("Find HistoriqueTarificationService Model tests - Model fails", function(done) {
    let model = new HistoriqueModel();

    model.DBA_find = jest.fn(
      serviceID =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: "Find query fails.",
            row: null
          });
        })
    );

    model
      .find(1)
      .then(row => {
        expect(1).toEqual(0);
        done();
      })
      .catch(error => {
        expect(error).toEqual("Find query fails.");
        done();
      });
  });

  test("Find HistoriqueTarificationService Model tests - Model Success", function(done) {
    let model = new HistoriqueModel();

    model.DBA_find = jest.fn(
      serviceID =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            row: serviceID
          });
        })
    );

    model
      .find(1)
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

describe("Create HistoriqueTarificationService Model tests", function() {
  test("Create HistoriqueTarificationService Model tests - Model fails", function(done) {
    let model = new HistoriqueModel();

    model.DBA_create = jest.fn(
      (serviceID, parent, subventionee, cisss, dateEntreeVigueur) =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: "Create query fails.",
            rowID: null
          });
        })
    );

    model
      .create({
        serviceID: 1,
        tarificationParent: 99,
        tarificationSubventionee: true,
        tarificationCISSS: 99,
        dateEntreeVigueur: "2018-11-17"
      })
      .then(rowID => {
        expect(1).toEqual(0);
        done();
      })
      .catch(error => {
        expect(error).toEqual("Create query fails.");
        done();
      });
  });

  test("Create HistoriqueTarificationService Model tests - Model success", function(done) {
    let model = new HistoriqueModel();

    model.DBA_create = jest.fn(
      (serviceID, parent, subventionee, cisss, dateEntreeVigueur) =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            rowID: serviceID
          });
        })
    );

    model
      .create({
        serviceID: 1,
        tarificationParent: 99,
        tarificationSubventionee: true,
        tarificationCISSS: 99,
        dateEntreeVigueur: "2018-11-17"
      })
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

describe("Update HistoriqueTarificationService Model tests", function() {
  test("Update HistoriqueTarificationService Model tests - Model fails", function(done) {
    let model = new HistoriqueModel();

    model.DBA_update = jest.fn(
      (id, serviceID, parent, subventionee, cisss, dateEntreeVigueur) =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: "Update query fails.",
            rowID: null
          });
        })
    );

    model
      .update({
        id: 1,
        serviceID: 1,
        tarificationParent: 99,
        tarificationSubventionee: true,
        tarificationCISSS: 99,
        dateEntreeVigueur: "2018-11-17"
      })
      .then(rowID => {
        expect(1).toEqual(0);
        done();
      })
      .catch(error => {
        expect(error).toEqual("Update query fails.");
        done();
      });
  });

  test("Update HistoriqueTarificationService Model tests - Model success", function(done) {
    let model = new HistoriqueModel();

    model.DBA_update = jest.fn(
      (id, serviceID, parent, subventionee, cisss, dateEntreeVigueur) =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            rowID: id
          });
        })
    );

    model
      .update({
        id: 1,
        serviceID: 1,
        tarificationParent: 99,
        tarificationSubventionee: true,
        tarificationCISSS: 99,
        dateEntreeVigueur: "2018-11-17"
      })
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

describe("RemoveFromService HistoriqueTarificationService Model tests", function() {
  test("RemoveFromService HistoriqueTarificationService Model tests - Model fails", function(done) {
    let model = new HistoriqueModel();

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

  test("RemoveFromService HistoriqueTarificationService Model tests - Model success", function(done) {
    let model = new HistoriqueModel();

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
