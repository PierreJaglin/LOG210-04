const httpMocks = require("node-mocks-http");
const OrganismReferentController = require("../src/controllers/organismReferentController.js");

describe("Get Organism Referent Controller tests", function() {
  describe("Get Organism Referent Controller tests - Organism Referent is invalid", function() {
    test("Get Organism Referent Controller tests - Organism Referent is invalid - ID", function(done) {
      let controller = new OrganismReferentController();

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/organismReferent/",
        query: {
          id: NaN
        }
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual([
          "The ID is required and must be positive."
        ]);
        done();
      });

      controller.organismReferent_detail(request, response);
    });
  });

  describe("Get Organism Referent Controller tests - Model errors", function() {
    test("Get Organism Referent Controller tests - Model errors - Model fails", function(done) {
      let controller = new OrganismReferentController();

      // Mock function
      controller.get = jest.fn(
        id =>
          new Promise(function(resolve, reject) {
            return reject("Get query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/organismReferent/",
        query: {
          id: 1
        }
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual("Get query failed");
        done();
      });

      controller.organismReferent_detail(request, response);
    });

    test("Get Organism Referent Controller tests - Model errors - No organismReferent found", function(done) {
      let controller = new OrganismReferentController();

      // Mock function
      controller.get = jest.fn(
        id =>
          new Promise(function(resolve, reject) {
            return resolve(undefined);
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/organismReferent/",
        query: {
          id: 1
        }
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual("No organism referent found");
        done();
      });

      controller.organismReferent_detail(request, response);
    });
  });

  describe("Get Organism Referent Controller tests - Success", function() {
    test("Get Organism Referent Controller tests - Success", function(done) {
      const controller = new OrganismReferentController();

      controller.get = jest.fn(
        id =>
          new Promise(function(resolve, reject) {
            return resolve(id);
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/organismReferent/",
        query: {
          id: 1
        }
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual(1);
        done();
      });

      controller.organismReferent_detail(request, response);
    });
  });
});

describe("GetAll Organism Referent Controller tests", function() {
  describe("GetAll Organism Referent Controller tests - Model errors", function() {
    test("GetAll Organism Referent Controller tests - Model errors - Model fails", function(done) {
      let controller = new OrganismReferentController();

      // Mock function
      controller.getAll = jest.fn(
        () =>
          new Promise(function(resolve, reject) {
            return reject("GetAll query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/organismReferent/"
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual("GetAll query failed");
        done();
      });

      controller.organismReferent_list(request, response);
    });
  });

  describe("GetAll Organism Referent Controller tests - Success", function() {
    test("GetAll Organism Referent Controller tests - Success", function(done) {
      const controller = new OrganismReferentController();

      controller.getAll = jest.fn(
        () =>
          new Promise(function(resolve, reject) {
            return resolve([1, 2]);
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/organismReferent/"
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message[0]).toEqual(1);
        expect(data.message[1]).toEqual(2);
        done();
      });

      controller.organismReferent_list(request, response);
    });
  });
});

describe("Create Organism Referent Controller tests", function() {
  describe("Create Organism Referent Controller tests - Organism Referent is invalid", function() {
    test("Create Organism Referent Controller tests - Organism Referent is invalid - Name", function(done) {
      let controller = new OrganismReferentController();

      const organismReferent = {
        name: "",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: undefined,
        website: undefined,
        active: true,
        organism: 1
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organismReferent/create",
        body: {
          organismReferent: organismReferent
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual(["The name is required."]);
        done();
      });

      controller.organismReferent_create(request, response);
    });

    test("Create Organism Referent Controller tests - Organism Referent is invalid - Address number", function(done) {
      let controller = new OrganismReferentController();

      const organismReferent = {
        name: "test_controller_create_invalid_addressNumber",
        addressNumber: "a",
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: undefined,
        website: undefined,
        active: true,
        organism: 1
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organismReferent/create",
        body: {
          organismReferent: organismReferent
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual([
          "The address number is required and must be positive."
        ]);
        done();
      });

      controller.organismReferent_create(request, response);
    });

    test("Create Organism Referent Controller tests - Organism Referent is invalid - Street", function(done) {
      let controller = new OrganismReferentController();

      const organismReferent = {
        name: "test_controller_create_invalid_street",
        addressNumber: 8585,
        street: "",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: undefined,
        website: undefined,
        active: true,
        organism: 1
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organismReferent/create",
        body: {
          organismReferent: organismReferent
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual(["The street name is required."]);
        done();
      });

      controller.organismReferent_create(request, response);
    });

    test("Create Organism Referent Controller tests - Organism Referent is invalid - City", function(done) {
      let controller = new OrganismReferentController();

      const organismReferent = {
        name: "test_controller_create_invalid_city",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: undefined,
        website: undefined,
        active: true,
        organism: 1
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organismReferent/create",
        body: {
          organismReferent: organismReferent
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual(["The city name is required."]);
        done();
      });

      controller.organismReferent_create(request, response);
    });

    test("Create Organism Referent Controller tests - Organism Referent is invalid - Province", function(done) {
      let controller = new OrganismReferentController();

      const organismReferent = {
        name: "test_controller_create_invalid_province",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: undefined,
        website: undefined,
        active: true,
        organism: 1
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organismReferent/create",
        body: {
          organismReferent: organismReferent
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual(["The province name is required."]);
        done();
      });

      controller.organismReferent_create(request, response);
    });

    test("Create Organism Referent Controller tests - Organism Referent is invalid - Postal Code", function(done) {
      let controller = new OrganismReferentController();

      const organismReferent = {
        name: "test_controller_create_invalid_postalCode",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H16_t?y",
        phone: undefined,
        fax: undefined,
        email: undefined,
        website: undefined,
        active: true,
        organism: 1
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organismReferent/create",
        body: {
          organismReferent: organismReferent
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual([
          "The postal code is required and must match a pattern A1A1A1."
        ]);
        done();
      });

      controller.organismReferent_create(request, response);
    });

    test("Create Organism Referent Controller tests - Organism Referent is invalid - Phone", function(done) {
      let controller = new OrganismReferentController();

      const organismReferent = {
        name: "test_controller_create_invalid_phone",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: "5149478798",
        fax: undefined,
        email: undefined,
        website: undefined,
        active: true,
        organism: 1
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organismReferent/create",
        body: {
          organismReferent: organismReferent
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual([
          "If specified, the phone number must match a pattern 111-111-1111."
        ]);
        done();
      });

      controller.organismReferent_create(request, response);
    });

    test("Create Organism Referent Controller tests - Organism Referent is invalid - Fax", function(done) {
      let controller = new OrganismReferentController();

      const organismReferent = {
        name: "test_controller_create_invalid_fax",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: "5149478798",
        email: undefined,
        website: undefined,
        active: true,
        organism: 1
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organismReferent/create",
        body: {
          organismReferent: organismReferent
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual([
          "If specified, the fax number must match a pattern 111-111-1111."
        ]);
        done();
      });

      controller.organismReferent_create(request, response);
    });

    test("Create Organism Referent Controller tests - Organism Referent is invalid - Email", function(done) {
      let controller = new OrganismReferentController();

      const organismReferent = {
        name: "test_controller_create_invalid_email",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: "abc",
        website: undefined,
        website: undefined,
        active: true,
        organism: 1
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organismReferent/create",
        body: {
          organismReferent: organismReferent
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual([
          "If specified, the email must match a pattern a@a.a."
        ]);
        done();
      });

      controller.organismReferent_create(request, response);
    });

    test("Create Organism Referent Controller tests - Organism Referent is invalid - Active", function(done) {
      let controller = new OrganismReferentController();

      const organismReferent = {
        name: "test_controller_create_invalid_active",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: undefined,
        website: undefined,
        active: undefined,
        organism: 1
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organismReferent/create",
        body: {
          organismReferent: organismReferent
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual([
          "You must specify if the organism referent is active or not."
        ]);
        done();
      });

      controller.organismReferent_create(request, response);
    });
  });

  describe("Create Organism Referent Controller tests - Model errors", function() {
    test("Create Organism Referent Controller tests - Model errors - Create fails", function() {
      let controller = new OrganismReferentController();

      // Mock function
      controller.create = jest.fn(
        organismReferent =>
          new Promise(function(resolve, reject) {
            return reject("Create query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/organismReferent/"
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual("Create query failed");
        done();
      });

      controller.organismReferent_list(request, response);
    });

    test("Create Organism Referent Controller tests - Model errors - Find fails", function() {
      let controller = new OrganismReferentController();

      // Mock function
      controller.find = jest.fn(
        name =>
          new Promise(function(resolve, reject) {
            return reject("Find query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/organismReferent/"
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual("Find query failed");
        done();
      });

      controller.organismReferent_list(request, response);
    });
  });

  describe("Create Organism Referent Controller tests - Success", function() {
    test("Create Organism Referent Controller tests - Success", function(done) {
      let controller = new OrganismReferentController();

      controller.create = jest.fn(
        organismReferent =>
          new Promise(function(resolve, reject) {
            return resolve(organismReferent);
          })
      );

      controller.find = jest.fn(
        name =>
          new Promise(function(resolve, reject) {
            return resolve(organismReferent);
          })
      );

      const organismReferent = {
        name: "test_controller_create_success",
        addressNumber: 100,
        street: "abc",
        city: "abc",
        province: "abc",
        postalCode: "H4T1G6",
        phone: "514-987-5161",
        fax: "514-987-5161",
        email: "a@a.com",
        website: undefined,
        active: false,
        organism: 1
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organismReferent/create",
        body: {
          organismReferent: organismReferent
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual(organismReferent);
        done();
      });

      controller.organismReferent_create(request, response);
    });
  });
});

describe("Update Organism Referent Controller tests", function() {
  describe("Update Organism Referent Controller tests - Organism Referent is invalid", function() {
    test("Update Organism Referent Controller tests - Organism Referent is invalid - ID", function(done) {
      let controller = new OrganismReferentController();

      const organismReferent = {
        name: "test_controller_update_invalid_id",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: undefined,
        website: undefined,
        active: true,
        organism: 1
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organismReferent/update",
        body: {
          organismReferent: organismReferent
        },
        query: {
          id: NaN
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual([
          "The ID is required and must be positive."
        ]);
        done();
      });

      controller.organismReferent_update(request, response);
    });

    test("Update Organism Referent Controller tests - Organism Referent is invalid - Name", function(done) {
      let controller = new OrganismReferentController();

      const organismReferent = {
        name: "",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: undefined,
        website: undefined,
        active: true,
        organism: 1
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organismReferent/update",
        body: {
          organismReferent: organismReferent
        },
        query: {
          id: 1
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual(["The name is required."]);
        done();
      });

      controller.organismReferent_update(request, response);
    });

    test("Update Organism Referent Controller tests - Organism Referent is invalid - Address number", function(done) {
      let controller = new OrganismReferentController();

      const organismReferent = {
        name: "test_controller_update_invalid_addressNumber",
        addressNumber: "a",
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: undefined,
        website: undefined,
        active: true,
        organism: 1
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organismReferent/update",
        body: {
          organismReferent: organismReferent
        },
        query: {
          id: 1
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual([
          "The address number is required and must be positive."
        ]);
        done();
      });

      controller.organismReferent_update(request, response);
    });

    test("Update Organism Referent Controller tests - Organism Referent is invalid - Street", function(done) {
      let controller = new OrganismReferentController();

      const organismReferent = {
        name: "test_controller_update_invalid_street",
        addressNumber: 8585,
        street: "",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: undefined,
        website: undefined,
        active: true,
        organism: 1
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organismReferent/update",
        body: {
          organismReferent: organismReferent
        },
        query: {
          id: 1
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual(["The street name is required."]);
        done();
      });

      controller.organismReferent_update(request, response);
    });

    test("Update Organism Referent Controller tests - Organism Referent is invalid - City", function(done) {
      let controller = new OrganismReferentController();

      const organismReferent = {
        name: "test_controller_update_invalid_city",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: undefined,
        website: undefined,
        active: true,
        organism: 1
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organismReferent/update",
        body: {
          organismReferent: organismReferent
        },
        query: {
          id: 1
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual(["The city name is required."]);
        done();
      });

      controller.organismReferent_update(request, response);
    });

    test("Update Organism Referent Controller tests - Organism Referent is invalid - Province", function(done) {
      let controller = new OrganismReferentController();

      const organismReferent = {
        name: "test_controller_update_invalid_province",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: undefined,
        website: undefined,
        active: true,
        organism: 1
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organismReferent/update",
        body: {
          organismReferent: organismReferent
        },
        query: {
          id: 1
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual(["The province name is required."]);
        done();
      });

      controller.organismReferent_update(request, response);
    });

    test("Update Organism Referent Controller tests - Organism Referent is invalid - Postal Code", function(done) {
      let controller = new OrganismReferentController();

      const organismReferent = {
        name: "test_controller_update_invalid_postalCode",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H16_t?y",
        phone: undefined,
        fax: undefined,
        email: undefined,
        website: undefined,
        active: true,
        organism: 1
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organismReferent/update",
        body: {
          organismReferent: organismReferent
        },
        query: {
          id: 1
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual([
          "The postal code is required and must match a pattern A1A1A1."
        ]);
        done();
      });

      controller.organismReferent_update(request, response);
    });

    test("Update Organism Referent Controller tests - Organism Referent is invalid - Phone", function(done) {
      let controller = new OrganismReferentController();

      const organismReferent = {
        name: "test_controller_update_invalid_phone",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: "5149478798",
        fax: undefined,
        email: undefined,
        website: undefined,
        active: true,
        organism: 1
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organismReferent/update",
        body: {
          organismReferent: organismReferent
        },
        query: {
          id: 1
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual([
          "If specified, the phone number must match a pattern 111-111-1111."
        ]);
        done();
      });

      controller.organismReferent_update(request, response);
    });

    test("Update Organism Referent Controller tests - Organism Referent is invalid - Fax", function(done) {
      let controller = new OrganismReferentController();

      const organismReferent = {
        name: "test_controller_update_invalid_fax",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: "5149478798",
        email: undefined,
        website: undefined,
        active: true,
        organism: 1
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organismReferent/update",
        body: {
          organismReferent: organismReferent
        },
        query: {
          id: 1
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual([
          "If specified, the fax number must match a pattern 111-111-1111."
        ]);
        done();
      });

      controller.organismReferent_update(request, response);
    });

    test("Update Organism Referent Controller tests - Organism Referent is invalid - Email", function(done) {
      let controller = new OrganismReferentController();

      const organismReferent = {
        name: "test_controller_update_invalid_email",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: "abc",
        website: undefined,
        website: undefined,
        active: true,
        organism: 1
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organismReferent/update",
        body: {
          organismReferent: organismReferent
        },
        query: {
          id: 1
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual([
          "If specified, the email must match a pattern a@a.a."
        ]);
        done();
      });

      controller.organismReferent_update(request, response);
    });

    test("Update Organism Referent Controller tests - Organism Referent is invalid - Active", function(done) {
      let controller = new OrganismReferentController();

      const organismReferent = {
        name: "test_controller_update_invalid_active",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: undefined,
        website: undefined,
        active: undefined,
        organism: 1
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organismReferent/update",
        body: {
          organismReferent: organismReferent
        },
        query: {
          id: 1
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual([
          "You must specify if the organism referent is active or not."
        ]);
        done();
      });

      controller.organismReferent_update(request, response);
    });
  });

  describe("Update Organism Referent Controller tests - Model errors", function() {
    test("Update Organism Referent Controller tests - Model errors - Update fails", function() {
      let controller = new OrganismReferentController();

      // Mock function
      controller.update = jest.fn(
        organismReferent =>
          new Promise(function(resolve, reject) {
            return reject("Update query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/organismReferent/"
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual("Update query failed");
        done();
      });

      controller.organismReferent_list(request, response);
    });

    test("Update Organism Referent Controller tests - Model errors - Find fails", function() {
      let controller = new OrganismReferentController();

      // Mock function
      controller.get = jest.fn(
        name =>
          new Promise(function(resolve, reject) {
            return reject("Get query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/organismReferent/"
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual("Get query failed");
        done();
      });

      controller.organismReferent_list(request, response);
    });
  });

  describe("Update Organism Referent Controller tests - Success", function() {
    test("Update Organism Referent Controller tests - Success", function(done) {
      let controller = new OrganismReferentController();

      controller.update = jest.fn(
        organismReferent =>
          new Promise(function(resolve, reject) {
            return resolve(organismReferent);
          })
      );

      controller.get = jest.fn(
        id =>
          new Promise(function(resolve, reject) {
            return resolve({
              id: 1,
              organismReferent
            });
          })
      );

      const organismReferent = {
        name: "test_controller_update_success",
        addressNumber: 100,
        street: "abc",
        city: "abc",
        province: "abc",
        postalCode: "H4T1G6",
        phone: "514-987-5161",
        fax: "514-987-5161",
        email: "a@a.com",
        website: undefined,
        active: false,
        organism: 1
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organismReferent/update",
        body: {
          organismReferent: organismReferent
        },
        query: {
          id: 1
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual({
          id: 1,
          organismReferent
        });
        done();
      });

      controller.organismReferent_update(request, response);
    });
  });
});

describe("Delete Organism Referent Controller tests", function() {
  describe("Delete Organism Referent Controller tests - Organism Referent is invalid", function() {
    test("Delete Organism Referent Controller tests - Organism Referent is invalid - ID", function(done) {
      let controller = new OrganismReferentController();

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/organismReferent/",
        query: {
          id: NaN
        }
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual([
          "The ID is required and must be positive."
        ]);
        done();
      });

      controller.organismReferent_delete(request, response);
    });
  });

  describe("Delete Organism Referent Controller tests - Model errors", function() {
    test("Delete Organism Referent Controller tests - Model errors - Model fails", function(done) {
      let controller = new OrganismReferentController();

      // Mock function
      controller.remove = jest.fn(
        id =>
          new Promise(function(resolve, reject) {
            return reject("Delete query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/organismReferent/",
        query: {
          id: 1
        }
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual("Delete query failed");
        done();
      });

      controller.organismReferent_delete(request, response);
    });
  });

  describe("Delete Organism Referent Controller tests - Success", function() {
    test("Delete Organism Referent Controller tests - Success", function(done) {
      const controller = new OrganismReferentController();

      controller.remove = jest.fn(
        id =>
          new Promise(function(resolve, reject) {
            return resolve(id);
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/organismReferent/",
        query: {
          id: 1
        }
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual(1);
        done();
      });

      controller.organismReferent_delete(request, response);
    });
  });
});
