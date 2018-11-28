const ReferentModel = require("../src/models/referentModel");
const RfModel = require("../src/models/referentToOrganismRfModel");

jest.setTimeout(10000);
describe("Get Referent Model tests", function() {
  test("Get Referent Model tests - Fail", function(done) {
    let model = new ReferentModel();
    let rfModel = new RfModel();

    model.DBA_get = jest.fn(
      id =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: "Get fails",
            row: null
          });
        })
    );

    rfModel.getAllFromReferent = jest.fn(
      id =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            rows: [
              {
                organismReferentID: 1
              },
              {
                organismReferentID: 2
              }
            ]
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
        expect(error).toEqual("Get fails");
        done();
      });
  });

  test("Get Referent Model tests - Success", function(done) {
    let model = new ReferentModel();

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
        expect(row).toBeDefined();
        done();
      })
      .catch(error => {
        expect(error).toEqual(0);
        done();
      });
  });
});

describe("GetAll Referent Model tests", function() {
  test("GetAll Referent Model tests - Fail", function(done) {
    let model = new ReferentModel();

    model.DBA_getAll = jest.fn(
      () =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: "GetAll fails",
            row: null
          });
        })
    );

    model
      .getAll()
      .then(row => {
        expect(1).toEqual(0);
        done();
      })
      .catch(error => {
        expect(error).toEqual("GetAll fails");
        done();
      });
  });

  test("GetAll Referent Model tests - Success", function(done) {
    let model = new ReferentModel();

    model.DBA_getAll = jest.fn(
      () =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            rows: 1
          });
        })
    );

    model
      .getAll()
      .then(rows => {
        expect(rows).toEqual(1);
        done();
      })
      .catch(error => {
        expect(1).toEqual(0);
        done();
      });
  });
});

describe("Create Referent Model tests", function() {
  test("Create Referent Model tests - Fail", function(done) {
    let model = new ReferentModel();

    model.DBA_create = jest.fn(
      (
        lastName,
        firstName,
        title,
        phone,
        officePhone,
        fax,
        email,
        prefFax,
        prefEmail,
        prefPaper
      ) =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: "Create query fails.",
            row: null
          });
        })
    );

    const referent = {
      lastName: "lastNameCreateFail",
      firstName: "firstNameCreateFail",
      title: "titleCreateFail",
      phone: "514-987-5161",
      officePhone: "514-987-5161",
      fax: "514-987-5161",
      email: "emailCreateFail@a.com",
      prefFax: false,
      prefEmail: true,
      prefPaper: false,
      organismsReferents: [1, 2]
    };

    model
      .create(referent)
      .then(row => {
        expect(1).toEqual(0);
        done();
      })
      .catch(error => {
        expect(error).toEqual("Create query fails.");
        done();
      });
  });

  test("Create Referent Model tests - Success", function(done) {
    let model = new ReferentModel();
    let rfModel = new RfModel();

    model.DBA_create = jest.fn(
      (
        lastName,
        firstName,
        title,
        phone,
        officePhone,
        fax,
        email,
        prefFax,
        prefEmail,
        prefPaper
      ) =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            rowID: 1
          });
        })
    );

    model.findByEmail = jest.fn(
      email =>
        new Promise(function(resolve, reject) {
          resolve(1);
        })
    );

    rfModel.create = jest.fn(
      rf =>
        new Promise(function(resolve, reject) {
          resolve(1);
        })
    );

    const referent = {
      lastName: "lastNameCreateFail",
      firstName: "firstNameCreateFail",
      title: "titleCreateFail",
      phone: "514-987-5161",
      officePhone: "514-987-5161",
      fax: "514-987-5161",
      email: "emailCreateFail@a.com",
      prefFax: false,
      prefEmail: true,
      prefPaper: false,
      organismsReferents: [1, 2]
    };

    model
      .create(referent)
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

describe("Update Referent Model tests", function() {
  test("Update Referent Model tests - Fail", function(done) {
    let model = new ReferentModel();

    model.DBA_update = jest.fn(
      (
        lastName,
        firstName,
        title,
        phone,
        officePhone,
        fax,
        email,
        prefFax,
        prefEmail,
        prefPaper
      ) =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: "Update query fails.",
            row: null
          });
        })
    );

    const referent = {
      id: 1,
      lastName: "lastNameUpdateFail",
      firstName: "firstNameUpdateFail",
      title: "titleUpdateFail",
      phone: "514-987-5161",
      officePhone: "514-987-5161",
      fax: "514-987-5161",
      email: "emailUpdateFail@a.com",
      prefFax: false,
      prefEmail: true,
      prefPaper: false,
      organismsReferents: [1, 2]
    };

    model
      .update(referent)
      .then(row => {
        expect(1).toEqual(0);
        done();
      })
      .catch(error => {
        expect(error).toEqual("Update query fails.");
        done();
      });
  });

  test("Update Referent Model tests - Success", function(done) {
    let model = new ReferentModel();
    let rfModel = new RfModel();

    model.DBA_update = jest.fn(
      (
        lastName,
        firstName,
        title,
        phone,
        officePhone,
        fax,
        email,
        prefFax,
        prefEmail,
        prefPaper
      ) =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            row: 1
          });
        })
    );

    rfModel.remove = jest.fn(
      id =>
        new Promise(function(resolve, reject) {
          resolve(1);
        })
    );

    rfModel.create = jest.fn(
      rf =>
        new Promise(function(resolve, reject) {
          resolve(1);
        })
    );

    const referent = {
      id: 1,
      lastName: "lastNameUpdateFail",
      firstName: "firstNameUpdateFail",
      title: "titleUpdateFail",
      phone: "514-987-5161",
      officePhone: "514-987-5161",
      fax: "514-987-5161",
      email: "emailUpdateFail@a.com",
      prefFax: false,
      prefEmail: true,
      prefPaper: false,
      organismsReferents: [1, 2]
    };

    model
      .update(referent)
      .then(rowID => {
        expect(1).toEqual(1);
        done();
      })
      .catch(error => {
        expect(1).toEqual(0);
        done();
      });
  });
});

describe("Remove Referent Model tests", function() {
  test("Remove Referent Model tests - Fail", function(done) {
    let model = new ReferentModel();

    model.DBA_remove = jest.fn(
      id =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: "Remove fail.",
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
        expect(error).toEqual("Remove fail.");
        done();
      });
  });

  test("Remove Referent Model tests - Fail", function(done) {
    let model = new ReferentModel();

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
        expect(1).toEqual(0);
        done();
      });
  });
});
