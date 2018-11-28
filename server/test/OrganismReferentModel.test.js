const OrganismReferentModel = require("../src/models/organismReferentModel");
const AddressModel = require("../src/models/addressModel");

describe("Get Organism Referent Model tests", function() {
  test("Get Organism Referent Model tests - Fail", function(done) {
    let model = new OrganismReferentModel();

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

  test("Get Organism Referent Model tests - Success", function(done) {
    let model = new OrganismReferentModel();

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

describe("GetAll Organism Referent Model tests", function() {
  test("GetAll Organism Referent Model tests - Fail", function(done) {
    let model = new OrganismReferentModel();

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
      .then(rows => {
        expect(1).toEqual(0);
        done();
      })
      .catch(error => {
        expect(error).toEqual("GetAll fails");
        done();
      });
  });

  test("GetAll Organism Referent Model tests - Success", function(done) {
    let model = new OrganismReferentModel();

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

describe("GetAllByOrganism Organism Referent Model tests", function() {
  test("GetAllByOrganism Organism Referent Model tests - Fail", function(done) {
    let model = new OrganismReferentModel();

    model.DBA_getAllByOrganism = jest.fn(
      id =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: "Get fails",
            row: null
          });
        })
    );

    model
      .getAllByOrganism(1)
      .then(sqlResult => {
        expect(1).toEqual(0);
        done();
      })
      .catch(error => {
        expect(error).toEqual("Get fails");
        done();
      });
  });

  test("GetAllByOrganism Organism Referent Model tests - Success", function(done) {
    let model = new OrganismReferentModel();

    model.DBA_getAllByOrganism = jest.fn(
      id =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            rows: id
          });
        })
    );

    model
      .getAllByOrganism(1)
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

describe("Find Organism Referent Model tests", function() {
  test("Find Organism Referent Model tests - Fail", function(done) {
    let model = new OrganismReferentModel();

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

  test("Find Organism Referent Model tests - Success", function(done) {
    let model = new OrganismReferentModel();

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

describe("Create Organism Referent Model tests", function() {
  describe("Create Organism Referent Model tests - Address Model fails", function() {
    test("Create Organism Referent Model tests - Address Model fails - Find query", function(done) {
      let model = new OrganismReferentModel();
      model.addressModel = new AddressModel();

      model.addressModel.find = jest.fn(
        postalCode =>
          new Promise(function(resolve, reject) {
            return reject("Find query fails.");
          })
      );

      const organismReferent = {
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
        .create(organismReferent)
        .then(row => {
          expect(1).toEqual(0);
          done();
        })
        .catch(error => {
          expect(error).toEqual("Find query fails.");
          done();
        });
    });

    test("Create Organism Referent Model tests - Address Model fails - Create query", function(done) {
      let model = new OrganismReferentModel();
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

      const organismReferent = {
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
        .create(organismReferent)
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

  describe("Create Organism Referent Model tests - Organism Referent Model fails", function() {
    test("Create Organism Referent Model tests - Organism Referent Model fails - Create query - Existing address", function(done) {
      let model = new OrganismReferentModel();
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
        (name, addressID, phone, fax, email, website, active, organismID) =>
          new Promise(function(resolve, reject) {
            return resolve({
              error: "Create query fails.",
              row: null
            });
          })
      );

      const organismReferent = {
        name: "test_model_create_organismReferent_model_fails_create_existing",
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
        .create(organismReferent)
        .then(row => {
          expect(1).toEqual(0);
          done();
        })
        .catch(error => {
          expect(error).toEqual("Create query fails.");
          done();
        });
    });

    test("Create Organism Referent Model tests - Organism Referent Model fails - Create query - New address", function(done) {
      let model = new OrganismReferentModel();
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
        (name, addressID, phone, fax, email, website, active, organismID) =>
          new Promise(function(resolve, reject) {
            return resolve({
              error: "Create query fails.",
              row: null
            });
          })
      );

      const organismReferent = {
        name: "test_model_create_organismReferent_model_fails_create_new",
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
        .create(organismReferent)
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

  describe("Create Organism Referent Model tests - Success", function() {
    test("Create Organism Referent Model tests - Success - Existing address", function(done) {
      let model = new OrganismReferentModel();
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
        (name, addressID, phone, fax, email, webiste, active, organismID) =>
          new Promise(function(resolve, reject) {
            return resolve({
              error: null,
              row: 1
            });
          })
      );

      const organismReferent = {
        name:
          "test_model_create_organismReferent_model_success_create_existing",
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
        website: undefined,
        active: false,
        organism: 1
      };

      model
        .create(organismReferent)
        .then(row => {
          expect(row).toEqual(1);
          done();
        })
        .catch(error => {
          expect(1).toEqual(0);
          done();
        });
    });

    test("Create Organism Referent Model tests - Success - New address", function(done) {
      let model = new OrganismReferentModel();
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
        (name, addressID, phone, fax, email, website, active, organismID) =>
          new Promise(function(resolve, reject) {
            return resolve({
              error: null,
              row: 1
            });
          })
      );

      const organismReferent = {
        name: "test_model_create_organismReferent_model_success_create_new",
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
        website: undefined,
        active: false,
        organism: 1
      };

      model
        .create(organismReferent)
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
});

describe("Update Organism Referent Model tests", function() {
  describe("Update Organism Referent Model tests - Address Model fails", function() {
    test("Update Organism Referent Model tests - Address Model fails - Find query", function(done) {
      let model = new OrganismReferentModel();
      model.addressModel = new AddressModel();

      model.addressModel.find = jest.fn(
        postalCode =>
          new Promise(function(resolve, reject) {
            return reject("Find query fails.");
          })
      );

      const organismReferent = {
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
        website: undefined,
        active: false,
        organism: 1
      };

      model
        .update(organismReferent)
        .then(row => {
          expect(1).toEqual(0);
          done();
        })
        .catch(error => {
          expect(error).toEqual("Find query fails.");
          done();
        });
    });

    test("Update Organism Referent Model tests - Address Model fails - Create query", function(done) {
      let model = new OrganismReferentModel();
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

      const organismReferent = {
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
        webiste: undefined,
        active: false,
        organism: 1
      };

      model
        .update(organismReferent)
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

  describe("Update Organism Referent Model tests - Organism Referent Model fails", function() {
    test("Update Organism Referent Model tests - Organism Referent Model fails - Update query - Existing address", function(done) {
      let model = new OrganismReferentModel();
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
        (name, addressID, phone, fax, email, website, active, organismID) =>
          new Promise(function(resolve, reject) {
            return resolve({
              error: "Update query fails.",
              row: null
            });
          })
      );

      const organismReferent = {
        id: 1,
        name: "test_model_update_organismReferent_model_fails_update_existing",
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
        website: undefined,
        active: false,
        organism: 1
      };

      model
        .update(organismReferent)
        .then(row => {
          expect(1).toEqual(0);
          done();
        })
        .catch(error => {
          expect(error).toEqual("Update query fails.");
          done();
        });
    });

    test("Update Organism Referent Model tests - Organism Referent Model fails - Update query - New address", function(done) {
      let model = new OrganismReferentModel();
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
        (name, addressID, phone, fax, email, website, active, organismID) =>
          new Promise(function(resolve, reject) {
            return resolve({
              error: "Update query fails.",
              row: null
            });
          })
      );

      const organismReferent = {
        id: 1,
        name: "test_model_update_organismReferent_model_fails_update_new",
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
        website: undefined,
        active: false,
        organism: 1
      };

      model
        .update(organismReferent)
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

  describe("Update Organism Referent Model tests - Organism Referent Model fails", function() {
    test("Update Organism Referent Model tests - Success - Existing address", function(done) {
      let model = new OrganismReferentModel();
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
        (name, addressID, phone, fax, email, website, active, organismID) =>
          new Promise(function(resolve, reject) {
            return resolve({
              error: null,
              row: 1
            });
          })
      );

      const organismReferent = {
        id: 1,
        name:
          "test_model_update_organismReferent_model_success_update_existing",
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
        website: undefined,
        active: false,
        organism: 1
      };

      model
        .update(organismReferent)
        .then(row => {
          expect(row).toEqual(1);
          done();
        })
        .catch(error => {
          expect(1).toEqual(0);
          done();
        });
    });

    test("Update Organism Referent Model tests - Success - New address", function(done) {
      let model = new OrganismReferentModel();
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
        (name, addressID, phone, fax, email, website, active, organismID) =>
          new Promise(function(resolve, reject) {
            return resolve({
              error: null,
              row: 1
            });
          })
      );

      const organismReferent = {
        id: 1,
        name: "test_model_update_organismReferent_model_success_update_new",
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
        website: undefined,
        active: false,
        organism: 1
      };

      model
        .update(organismReferent)
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

describe("Remove Organism Referent Model tests", function() {
  test("Remove Organism Referent Model tests - Fail", function(done) {
    let model = new OrganismReferentModel();

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

  test("Remove Organism Referent Model tests - Success", function(done) {
    let model = new OrganismReferentModel();

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
