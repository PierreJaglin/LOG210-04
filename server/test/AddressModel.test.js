const AddressModel = require("../src/models/addressModel");

describe("Find Address Model tests", function() {
  test("Find Address Model tests - Fail", function(done) {
    let model = new AddressModel();

    model.DBA_find = jest.fn(
      postalCode =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: "Find query fails.",
            row: null
          });
        })
    );

    model
      .find("aaaaaa")
      .then(row => {
        expect(1).toEqual(0);
        done();
      })
      .catch(error => {
        expect(error).toEqual("Find query fails.");
        done();
      });
  });

  test("Find Address Model tests - Success", function(done) {
    let model = new AddressModel();

    model.DBA_find = jest.fn(
      postalCode =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            row: 1
          });
        })
    );

    model
      .find("aaaaaa")
      .then(row => {
        expect(row).toEqual(1);
        done();
      })
      .catch(error => {
        expect(1).toEqual(0);
        done();
      });
  });
});

describe("Create Address Model tests", function() {
  test("Create Address Model tests - Fail", function(done) {
    let model = new AddressModel();

    model.DBA_create = jest.fn(
      (number, street, city, province, postalCode) =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: "Create query fails.",
            row: null
          });
        })
    );

    const address = {
      number: 1,
      street: "abc",
      city: "abc",
      province: "abc",
      postalCode: "aaaaaa"
    };

    model
      .create(address)
      .then(row => {
        expect(1).toEqual(0);
        done();
      })
      .catch(error => {
        expect(error).toEqual("Create query fails.");
        done();
      });
  });

  test("Create Address Model tests - Success", function(done) {
    let model = new AddressModel();

    model.DBA_create = jest.fn(
      (number, street, city, province, postalCode) =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            row: 1
          });
        })
    );

    const address = {
      number: 1,
      street: "abc",
      city: "abc",
      province: "abc",
      postalCode: "aaaaaa"
    };

    model
      .create(address)
      .then(row => {
        expect(row).toEqual(1);
        done();
      })
      .catch(error => {
        expect(1).toEqual(0);
        done();
      });
  });
});

describe("Remove Address Model tests", function() {
  test("Remove Address Model tests - Fail", function(done) {
    let model = new AddressModel();

    model.DBA_remove = jest.fn(
      postalCode =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: "Remove query fails.",
            id: null
          });
        })
    );

    const address = {
      number: 1,
      street: "abc",
      city: "abc",
      province: "abc",
      postalCode: "aaaaaa"
    };

    model
      .remove(address.postalCode)
      .then(id => {
        expect(1).toEqual(0);
        done();
      })
      .catch(error => {
        expect(error).toEqual("Remove query fails.");
        done();
      });
  });

  test("Remove Address Model tests - Success", function(done) {
    let model = new AddressModel();

    model.DBA_remove = jest.fn(
      postalCode =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            id: 1
          });
        })
    );

    const address = {
      number: 1,
      street: "abc",
      city: "abc",
      province: "abc",
      postalCode: "aaaaaa"
    };

    model
      .remove(address.postalCode)
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
