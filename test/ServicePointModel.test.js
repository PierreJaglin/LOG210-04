const ServicePointModel = require("../src/models/servicePointModel");
const AddressModel = require("../src/models/addressModel");

describe("Get ServicePoint Model tests", function() {
  test("Get ServicePoint Model tests - Fail", function(done) {
    let model = new ServicePointModel();

    model.DBA_get = jest.fn(
      id =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: "Get fails",
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
        expect(error).toEqual("Get fails");
        done();
      });
  });

  test("Get ServicePoint Model tests - Success", function(done) {
    let model = new ServicePointModel();

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
        expect(1).toEqual(0);
        done();
      });
  });
});

describe("GetAll ServicePoint Model tests", function() {
  test("GetAll ServicePoint Model tests - Fail", function(done) {
    let model = new ServicePointModel();

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

  test("GetAll ServicePoint Model tests - Success", function(done) {
    let model = new ServicePointModel();

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

describe("Find ServicePoint Model tests", function() {
  test("Find ServicePoint Model tests - Fail", function(done) {
    let model = new ServicePointModel();

    model.DBA_find = jest.fn(
      name =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: "Find fails",
            row: null
          });
        })
    );

    model
      .find("abc")
      .then(row => {
        expect(1).toEqual(0);
        done();
      })
      .catch(error => {
        expect(error).toEqual("Find fails");
        done();
      });
  });

  test("Find ServicePoint Model tests - Success", function(done) {
    let model = new ServicePointModel();

    model.DBA_find = jest.fn(
      name =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            row: name
          });
        })
    );

    model
      .find("abc")
      .then(row => {
        expect(row).toEqual("abc");
        done();
      })
      .catch(error => {
        expect(1).toEqual(0);
        done();
      });
  });
});

describe("Create ServicePoint Model tests", function() {
  describe("Create ServicePoint Model tests - Address Model fails", function() {
    test("Create ServicePoint Model tests - Address Model fails - Find query", function(done) {
      let model = new ServicePointModel();
      model.addressModel = new AddressModel();

      model.addressModel.find = jest.fn(
        postalCode =>
          new Promise(function(resolve, reject) {
            return reject("Find query fails.");
          })
      );

      const organism = {
        name: "test_model_create_address_model_fails_find",
        address: {
          number: 100,
          street: "abc",
          city: "abc",
          province: "abc",
          postalCode: "H4T1G6"
        },
        phone: "514-987-5161",
        fax: "514-987-5161",
        email: "a@a.com",
        active: false
      };

      model
        .create(organism)
        .then(row => {
          expect(1).toEqual(0);
          done();
        })
        .catch(error => {
          expect(error).toEqual("Find query fails.");
          done();
        });
    });

    test("Create ServicePoint Model tests - Address Model fails - Create query", function(done) {
      let model = new ServicePointModel();
      model.addressModel = new AddressModel();

      model.addressModel.find = jest.fn(
        postalCode =>
          new Promise(function(resolve, reject) {
            return resolve(null);
          })
      );

      model.addressModel.create = jest.fn(
        address =>
          new Promise(function(resolve, reject) {
            return reject("Create query fails.");
          })
      );

      const organism = {
        name: "test_model_create_address_model_fails_create",
        address: {
          number: 100,
          street: "abc",
          city: "abc",
          province: "abc",
          postalCode: "H4T1G6"
        },
        phone: "514-987-5161",
        fax: "514-987-5161",
        email: "a@a.com",
        active: false
      };

      model
        .create(organism)
        .then(row => {
          expect(1).toEqual(0);
          done();
        })
        .catch(error => {
          expect(error).toEqual("Create query fails.");
          done();
        });
    });
  });

  describe("Create ServicePoint Model tests - ServicePoint Model fails", function() {
    test("Create ServicePoint Model tests - ServicePoint Model fails - Create query - Existing address", function(done) {
      let model = new ServicePointModel();
      model.addressModel = new AddressModel();

      model.addressModel.find = jest.fn(
        postalCode =>
          new Promise(function(resolve, reject) {
            return resolve({
              addressID: 5
            });
          })
      );

      model.addressModel.create = jest.fn(
        address =>
          new Promise(function(resolve, reject) {
            return reject("ERROR : Should not be here.");
          })
      );

      model.DBA_create = jest.fn(
        (name, addressID, phone, fax, email, active) =>
          new Promise(function(resolve, reject) {
            return resolve({
              error: "Create query fails.",
              row: null
            });
          })
      );

      const organism = {
        name: "test_model_create_organism_model_fails_create_existing",
        address: {
          number: 100,
          street: "abc",
          city: "abc",
          province: "abc",
          postalCode: "H4T1G6"
        },
        phone: "514-987-5161",
        fax: "514-987-5161",
        email: "a@a.com",
        active: false
      };

      model
        .create(organism)
        .then(row => {
          expect(1).toEqual(0);
          done();
        })
        .catch(error => {
          expect(error).toEqual("Create query fails.");
          done();
        });
    });

    test("Create ServicePoint Model tests - ServicePoint Model fails - Create query - New address", function(done) {
      let model = new ServicePointModel();
      model.addressModel = new AddressModel();

      model.addressModel.find = jest.fn(
        postalCode =>
          new Promise(function(resolve, reject) {
            return resolve(null);
          })
      );

      model.addressModel.create = jest.fn(
        address =>
          new Promise(function(resolve, reject) {
            return resolve(5);
          })
      );

      model.DBA_create = jest.fn(
        (name, addressID, phone, fax, email, active) =>
          new Promise(function(resolve, reject) {
            return resolve({
              error: "Create query fails.",
              row: null
            });
          })
      );

      const organism = {
        name: "test_model_create_organism_model_fails_create_new",
        address: {
          number: 100,
          street: "abc",
          city: "abc",
          province: "abc",
          postalCode: "H4T1G6"
        },
        phone: "514-987-5161",
        fax: "514-987-5161",
        email: "a@a.com",
        active: false
      };

      model
        .create(organism)
        .then(row => {
          expect(1).toEqual(0);
          done();
        })
        .catch(error => {
          expect(error).toEqual("Create query fails.");
          done();
        });
    });
  });

  describe("Create ServicePoint Model tests - Success", function() {
    test("Create ServicePoint Model tests - Success - Existing address", function(done) {
      let model = new ServicePointModel();
      model.addressModel = new AddressModel();

      model.addressModel.find = jest.fn(
        postalCode =>
          new Promise(function(resolve, reject) {
            return resolve({
              addressID: 5
            });
          })
      );

      model.addressModel.create = jest.fn(
        address =>
          new Promise(function(resolve, reject) {
            return reject("ERROR : Should not be here.");
          })
      );

      model.DBA_create = jest.fn(
        (name, addressID, phone, fax, email, active) =>
          new Promise(function(resolve, reject) {
            return resolve({
              error: null,
              row: 1
            });
          })
      );

      const organism = {
        name: "test_model_create_organism_model_success_create_existing",
        address: {
          number: 100,
          street: "abc",
          city: "abc",
          province: "abc",
          postalCode: "H4T1G6"
        },
        phone: "514-987-5161",
        fax: "514-987-5161",
        email: "a@a.com",
        active: false
      };

      model
        .create(organism)
        .then(row => {
          expect(row).toEqual(1);
          done();
        })
        .catch(error => {
          expect(1).toEqual(0);
          done();
        });
    });

    test("Create ServicePoint Model tests - Success - New address", function(done) {
      let model = new ServicePointModel();
      model.addressModel = new AddressModel();

      model.addressModel.find = jest.fn(
        postalCode =>
          new Promise(function(resolve, reject) {
            return resolve(null);
          })
      );

      model.addressModel.create = jest.fn(
        address =>
          new Promise(function(resolve, reject) {
            return resolve(5);
          })
      );

      model.DBA_create = jest.fn(
        (name, addressID, phone, fax, email, active) =>
          new Promise(function(resolve, reject) {
            return resolve({
              error: null,
              row: 1
            });
          })
      );

      const organism = {
        name: "test_model_create_organism_model_success_create_new",
        address: {
          number: 100,
          street: "abc",
          city: "abc",
          province: "abc",
          postalCode: "H4T1G6"
        },
        phone: "514-987-5161",
        fax: "514-987-5161",
        email: "a@a.com",
        active: false
      };

      model
        .create(organism)
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
});

describe("Update ServicePoint Model tests", function() {
  describe("Update ServicePoint Model tests - Address Model fails", function() {
    test("Update ServicePoint Model tests - Address Model fails - Find query", function(done) {
      let model = new ServicePointModel();
      model.addressModel = new AddressModel();

      model.addressModel.find = jest.fn(
        postalCode =>
          new Promise(function(resolve, reject) {
            return reject("Find query fails.");
          })
      );

      const organism = {
        id: 1,
        name: "test_model_update_address_model_fails_find",
        address: {
          number: 100,
          street: "abc",
          city: "abc",
          province: "abc",
          postalCode: "H4T1G6"
        },
        phone: "514-987-5161",
        fax: "514-987-5161",
        email: "a@a.com",
        active: false
      };

      model
        .update(organism)
        .then(row => {
          expect(1).toEqual(0);
          done();
        })
        .catch(error => {
          expect(error).toEqual("Find query fails.");
          done();
        });
    });

    test("Update ServicePoint Model tests - Address Model fails - Create query", function(done) {
      let model = new ServicePointModel();
      model.addressModel = new AddressModel();

      model.addressModel.find = jest.fn(
        postalCode =>
          new Promise(function(resolve, reject) {
            return resolve(null);
          })
      );

      model.addressModel.create = jest.fn(
        address =>
          new Promise(function(resolve, reject) {
            return reject("Create query fails.");
          })
      );

      const organism = {
        id: 1,
        name: "test_model_update_address_model_fails_create",
        address: {
          number: 100,
          street: "abc",
          city: "abc",
          province: "abc",
          postalCode: "H4T1G6"
        },
        phone: "514-987-5161",
        fax: "514-987-5161",
        email: "a@a.com",
        active: false
      };

      model
        .update(organism)
        .then(row => {
          expect(1).toEqual(0);
          done();
        })
        .catch(error => {
          expect(error).toEqual("Create query fails.");
          done();
        });
    });
  });

  describe("Update ServicePoint Model tests - ServicePoint Model fails", function() {
    test("Update ServicePoint Model tests - ServicePoint Model fails - Update query - Existing address", function(done) {
      let model = new ServicePointModel();
      model.addressModel = new AddressModel();

      model.addressModel.find = jest.fn(
        postalCode =>
          new Promise(function(resolve, reject) {
            return resolve({
              addressID: 5
            });
          })
      );

      model.addressModel.create = jest.fn(
        address =>
          new Promise(function(resolve, reject) {
            return reject("ERROR : Should not be here.");
          })
      );

      model.DBA_update = jest.fn(
        (name, addressID, phone, fax, email, active) =>
          new Promise(function(resolve, reject) {
            return resolve({
              error: "Update query fails.",
              row: null
            });
          })
      );

      const organism = {
        id: 1,
        name: "test_model_update_organism_model_fails_update_existing",
        address: {
          number: 100,
          street: "abc",
          city: "abc",
          province: "abc",
          postalCode: "H4T1G6"
        },
        phone: "514-987-5161",
        fax: "514-987-5161",
        email: "a@a.com",
        active: false
      };

      model
        .update(organism)
        .then(row => {
          expect(1).toEqual(0);
          done();
        })
        .catch(error => {
          expect(error).toEqual("Update query fails.");
          done();
        });
    });

    test("Update ServicePoint Model tests - ServicePoint Model fails - Update query - New address", function(done) {
      let model = new ServicePointModel();
      model.addressModel = new AddressModel();

      model.addressModel.find = jest.fn(
        postalCode =>
          new Promise(function(resolve, reject) {
            return resolve(null);
          })
      );

      model.addressModel.create = jest.fn(
        address =>
          new Promise(function(resolve, reject) {
            return resolve(5);
          })
      );

      model.DBA_update = jest.fn(
        (name, addressID, phone, fax, email, active) =>
          new Promise(function(resolve, reject) {
            return resolve({
              error: "Update query fails.",
              row: null
            });
          })
      );

      const organism = {
        id: 1,
        name: "test_model_update_organism_model_fails_update_new",
        address: {
          number: 100,
          street: "abc",
          city: "abc",
          province: "abc",
          postalCode: "H4T1G6"
        },
        phone: "514-987-5161",
        fax: "514-987-5161",
        email: "a@a.com",
        active: false
      };

      model
        .update(organism)
        .then(row => {
          expect(1).toEqual(0);
          done();
        })
        .catch(error => {
          expect(error).toEqual("Update query fails.");
          done();
        });
    });
  });

  describe("Update ServicePoint Model tests - Success", function() {
    test("Update ServicePoint Model tests - Success - Existing address", function(done) {
      let model = new ServicePointModel();
      model.addressModel = new AddressModel();

      model.addressModel.find = jest.fn(
        postalCode =>
          new Promise(function(resolve, reject) {
            return resolve({
              addressID: 5
            });
          })
      );

      model.addressModel.create = jest.fn(
        address =>
          new Promise(function(resolve, reject) {
            return reject("ERROR : Should not be here.");
          })
      );

      model.DBA_update = jest.fn(
        (name, addressID, phone, fax, email, active) =>
          new Promise(function(resolve, reject) {
            return resolve({
              error: null,
              row: 1
            });
          })
      );

      const organism = {
        id: 1,
        name: "test_model_update_organism_model_success_update_existing",
        address: {
          number: 100,
          street: "abc",
          city: "abc",
          province: "abc",
          postalCode: "H4T1G6"
        },
        phone: "514-987-5161",
        fax: "514-987-5161",
        email: "a@a.com",
        active: false
      };

      model
        .update(organism)
        .then(row => {
          expect(row).toEqual(1);
          done();
        })
        .catch(error => {
          expect(1).toEqual(0);
          done();
        });
    });

    test("Update ServicePoint Model tests - Success - New address", function(done) {
      let model = new ServicePointModel();
      model.addressModel = new AddressModel();

      model.addressModel.find = jest.fn(
        postalCode =>
          new Promise(function(resolve, reject) {
            return resolve(null);
          })
      );

      model.addressModel.create = jest.fn(
        address =>
          new Promise(function(resolve, reject) {
            return resolve(5);
          })
      );

      model.DBA_update = jest.fn(
        (name, addressID, phone, fax, email, active) =>
          new Promise(function(resolve, reject) {
            return resolve({
              error: null,
              row: 1
            });
          })
      );

      const organism = {
        id: 1,
        name: "test_model_update_organism_model_success_update_new",
        address: {
          number: 100,
          street: "abc",
          city: "abc",
          province: "abc",
          postalCode: "H4T1G6"
        },
        phone: "514-987-5161",
        fax: "514-987-5161",
        email: "a@a.com",
        active: false
      };

      model
        .update(organism)
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
});

describe("Remove ServicePoint Model tests", function() {
  test("Remove ServicePoint Model tests - Fail", function(done) {
    let model = new ServicePointModel();

    model.DBA_remove = jest.fn(
      id =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: "Remove fails",
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
        expect(error).toEqual("Remove fails");
        done();
      });
  });

  test("Remove ServicePoint Model tests - Success", function(done) {
    let model = new ServicePointModel();

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
