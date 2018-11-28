const httpMocks = require("node-mocks-http");
const OrganismController = require("../src/controllers/organismController.js");

describe("Get Organism Controller tests", function() {
  describe("Get Organism Controller tests - Organism is invalid", function() {
    test("Get Organism Controller tests - Organism is invalid - ID", function(done) {
      let controller = new OrganismController();

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/organism/",
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

      controller.organism_detail(request, response);
    });
  });

  describe("Get Organism Controller tests - Model errors", function() {
    test("Get Organism Controller tests - Model errors - Model fails", function(done) {
      let controller = new OrganismController();

      // Mock function
      controller.get = jest.fn(
        id =>
          new Promise(function(resolve, reject) {
            return reject("Get query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/organism/",
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

      controller.organism_detail(request, response);
    });

    test("Get Organism Controller tests - Model errors - No organism found", function(done) {
      let controller = new OrganismController();

      // Mock function
      controller.get = jest.fn(
        id =>
          new Promise(function(resolve, reject) {
            return resolve(undefined);
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/organism/",
        query: {
          id: 1
        }
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual("No organism found");
        done();
      });

      controller.organism_detail(request, response);
    });
  });

  describe("Get Organism Controller tests - Success", function() {
    test("Get Organism Controller tests - Success", function(done) {
      const controller = new OrganismController();

      controller.get = jest.fn(
        id =>
          new Promise(function(resolve, reject) {
            return resolve(id);
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/organism/",
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

      controller.organism_detail(request, response);
    });
  });
});

describe("GetAll Organism Controller tests", function() {
  describe("GetAll Organism Controller tests - Model errors", function() {
    test("GetAll Organism Controller tests - Model errors - Model fails", function(done) {
      let controller = new OrganismController();

      // Mock function
      controller.getAll = jest.fn(
        () =>
          new Promise(function(resolve, reject) {
            return reject("GetAll query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/organism/"
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual("GetAll query failed");
        done();
      });

      controller.organism_list(request, response);
    });
  });

  describe("GetAll Organism Controller tests - Success", function() {
    test("GetAll Organism Controller tests - Success", function(done) {
      const controller = new OrganismController();

      controller.getAll = jest.fn(
        () =>
          new Promise(function(resolve, reject) {
            return resolve([1, 2]);
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/organism/"
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

      controller.organism_list(request, response);
    });
  });
});

describe("Create Organism Controller tests", function() {
  describe("Create Organism Controller tests - Organism is invalid", function() {
    test("Create Organism Controller tests - Organism is invalid - Name", function(done) {
      let controller = new OrganismController();

      const organism = {
        name: "",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: undefined,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organism/create",
        body: {
          organism: organism
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

      controller.organism_create(request, response);
    });

    test("Create Organism Controller tests - Organism is invalid - Address number", function(done) {
      let controller = new OrganismController();

      const organism = {
        name: "test_controller_create_invalid_addressNumber",
        addressNumber: "a",
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: undefined,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organism/create",
        body: {
          organism: organism
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

      controller.organism_create(request, response);
    });

    test("Create Organism Controller tests - Organism is invalid - Street", function(done) {
      let controller = new OrganismController();

      const organism = {
        name: "test_controller_create_invalid_street",
        addressNumber: 8585,
        street: "",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: undefined,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organism/create",
        body: {
          organism: organism
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

      controller.organism_create(request, response);
    });

    test("Create Organism Controller tests - Organism is invalid - City", function(done) {
      let controller = new OrganismController();

      const organism = {
        name: "test_controller_create_invalid_city",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: undefined,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organism/create",
        body: {
          organism: organism
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

      controller.organism_create(request, response);
    });

    test("Create Organism Controller tests - Organism is invalid - Province", function(done) {
      let controller = new OrganismController();

      const organism = {
        name: "test_controller_create_invalid_province",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: undefined,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organism/create",
        body: {
          organism: organism
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

      controller.organism_create(request, response);
    });

    test("Create Organism Controller tests - Organism is invalid - Postal Code", function(done) {
      let controller = new OrganismController();

      const organism = {
        name: "test_controller_create_invalid_postalCode",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H16_t?y",
        phone: undefined,
        fax: undefined,
        email: undefined,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organism/create",
        body: {
          organism: organism
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

      controller.organism_create(request, response);
    });

    test("Create Organism Controller tests - Organism is invalid - Phone", function(done) {
      let controller = new OrganismController();

      const organism = {
        name: "test_controller_create_invalid_phone",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: "5149478798",
        fax: undefined,
        email: undefined,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organism/create",
        body: {
          organism: organism
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

      controller.organism_create(request, response);
    });

    test("Create Organism Controller tests - Organism is invalid - Fax", function(done) {
      let controller = new OrganismController();

      const organism = {
        name: "test_controller_create_invalid_fax",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: "5149478798",
        email: undefined,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organism/create",
        body: {
          organism: organism
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

      controller.organism_create(request, response);
    });

    test("Create Organism Controller tests - Organism is invalid - Email", function(done) {
      let controller = new OrganismController();

      const organism = {
        name: "test_controller_create_invalid_email",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: "abc",
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organism/create",
        body: {
          organism: organism
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

      controller.organism_create(request, response);
    });

    test("Create Organism Controller tests - Organism is invalid - Active", function(done) {
      let controller = new OrganismController();

      const organism = {
        name: "test_controller_create_invalid_active",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: undefined,
        active: undefined
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organism/create",
        body: {
          organism: organism
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual([
          "You must specify if the organism is active or not."
        ]);
        done();
      });

      controller.organism_create(request, response);
    });
  });

  describe("Create Organism Controller tests - Model errors", function() {
    test("Create Organism Controller tests - Model errors - Create fails", function() {
      let controller = new OrganismController();

      // Mock function
      controller.create = jest.fn(
        organism =>
          new Promise(function(resolve, reject) {
            return reject("Create query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/organism/"
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual("Create query failed");
        done();
      });

      controller.organism_list(request, response);
    });

    test("Create Organism Controller tests - Model errors - Find fails", function() {
      let controller = new OrganismController();

      // Mock function
      controller.find = jest.fn(
        name =>
          new Promise(function(resolve, reject) {
            return reject("Find query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/organism/"
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual("Find query failed");
        done();
      });

      controller.organism_list(request, response);
    });
  });

  describe("Create Organism Controller tests - Success", function() {
    test("Create Organism Controller tests - Success", function(done) {
      let controller = new OrganismController();

      controller.create = jest.fn(
        organism =>
          new Promise(function(resolve, reject) {
            return resolve(organism);
          })
      );

      controller.find = jest.fn(
        name =>
          new Promise(function(resolve, reject) {
            return resolve(organism);
          })
      );

      const organism = {
        name: "test_controller_create_success",
        addressNumber: 100,
        street: "abc",
        city: "abc",
        province: "abc",
        postalCode: "H4T1G6",
        phone: "514-987-5161",
        fax: "514-987-5161",
        email: "a@a.com",
        active: false
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organism/create",
        body: {
          organism: organism
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual(organism);
        done();
      });

      controller.organism_create(request, response);
    });
  });
});

describe("Update Organism Controller tests", function() {
  describe("Update Organism Controller tests - Organism is invalid", function() {
    test("Update Organism Controller tests - Organism is invalid - ID", function(done) {
      let controller = new OrganismController();

      const organism = {
        name: "test_controller_update_invalid_id",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: undefined,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organism/update",
        body: {
          organism: organism
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

      controller.organism_update(request, response);
    });

    test("Update Organism Controller tests - Organism is invalid - Name", function(done) {
      let controller = new OrganismController();

      const organism = {
        name: "",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: undefined,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organism/update",
        body: {
          organism: organism
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

      controller.organism_update(request, response);
    });

    test("Update Organism Controller tests - Organism is invalid - Address number", function(done) {
      let controller = new OrganismController();

      const organism = {
        name: "test_controller_update_invalid_addressNumber",
        addressNumber: "a",
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: undefined,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organism/update",
        body: {
          organism: organism
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

      controller.organism_update(request, response);
    });

    test("Update Organism Controller tests - Organism is invalid - Street", function(done) {
      let controller = new OrganismController();

      const organism = {
        name: "test_controller_update_invalid_street",
        addressNumber: 8585,
        street: "",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: undefined,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organism/update",
        body: {
          organism: organism
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

      controller.organism_update(request, response);
    });

    test("Update Organism Controller tests - Organism is invalid - City", function(done) {
      let controller = new OrganismController();

      const organism = {
        name: "test_controller_update_invalid_city",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: undefined,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organism/update",
        body: {
          organism: organism
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

      controller.organism_update(request, response);
    });

    test("Update Organism Controller tests - Organism is invalid - Province", function(done) {
      let controller = new OrganismController();

      const organism = {
        name: "test_controller_update_invalid_province",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: undefined,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organism/update",
        body: {
          organism: organism
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

      controller.organism_update(request, response);
    });

    test("Update Organism Controller tests - Organism is invalid - Postal Code", function(done) {
      let controller = new OrganismController();

      const organism = {
        name: "test_controller_update_invalid_postalCode",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H16_t?y",
        phone: undefined,
        fax: undefined,
        email: undefined,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organism/update",
        body: {
          organism: organism
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

      controller.organism_update(request, response);
    });

    test("Update Organism Controller tests - Organism is invalid - Phone", function(done) {
      let controller = new OrganismController();

      const organism = {
        name: "test_controller_update_invalid_phone",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: "5149478798",
        fax: undefined,
        email: undefined,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organism/update",
        body: {
          organism: organism
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

      controller.organism_update(request, response);
    });

    test("Update Organism Controller tests - Organism is invalid - Fax", function(done) {
      let controller = new OrganismController();

      const organism = {
        name: "test_controller_update_invalid_fax",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: "5149478798",
        email: undefined,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organism/update",
        body: {
          organism: organism
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

      controller.organism_update(request, response);
    });

    test("Update Organism Controller tests - Organism is invalid - Email", function(done) {
      let controller = new OrganismController();

      const organism = {
        name: "test_controller_update_invalid_email",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: "abc",
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organism/update",
        body: {
          organism: organism
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

      controller.organism_update(request, response);
    });

    test("Update Organism Controller tests - Organism is invalid - Active", function(done) {
      let controller = new OrganismController();

      const organism = {
        name: "test_controller_update_invalid_active",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: undefined,
        active: undefined
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organism/update",
        body: {
          organism: organism
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
          "You must specify if the organism is active or not."
        ]);
        done();
      });

      controller.organism_update(request, response);
    });
  });

  describe("Update Organism Controller tests - Model errors", function() {
    test("Update Organism Controller tests - Model errors - Update fails", function() {
      let controller = new OrganismController();

      // Mock function
      controller.update = jest.fn(
        organism =>
          new Promise(function(resolve, reject) {
            return reject("Update query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/organism/"
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual("Update query failed");
        done();
      });

      controller.organism_list(request, response);
    });

    test("Update Organism Controller tests - Model errors - Find fails", function() {
      let controller = new OrganismController();

      // Mock function
      controller.get = jest.fn(
        name =>
          new Promise(function(resolve, reject) {
            return reject("Get query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/organism/"
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual("Get query failed");
        done();
      });

      controller.organism_list(request, response);
    });
  });

  describe("Update Organism Controller tests - Success", function() {
    test("Update Organism Controller tests - Success", function(done) {
      let controller = new OrganismController();

      controller.update = jest.fn(
        organism =>
          new Promise(function(resolve, reject) {
            return resolve(organism);
          })
      );

      controller.get = jest.fn(
        id =>
          new Promise(function(resolve, reject) {
            return resolve({
              id: 1,
              organism
            });
          })
      );

      const organism = {
        name: "test_controller_update_success",
        addressNumber: 100,
        street: "abc",
        city: "abc",
        province: "abc",
        postalCode: "H4T1G6",
        phone: "514-987-5161",
        fax: "514-987-5161",
        email: "a@a.com",
        active: false
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/organism/update",
        body: {
          organism: organism
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
          organism
        });
        done();
      });

      controller.organism_update(request, response);
    });
  });
});

describe("Delete Organism Controller tests", function() {
  describe("Delete Organism Controller tests - Organism is invalid", function() {
    test("Delete Organism Controller tests - Organism is invalid - ID", function(done) {
      let controller = new OrganismController();

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/organism/",
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

      controller.organism_delete(request, response);
    });
  });

  describe("Delete Organism Controller tests - Model errors", function() {
    test("Delete Organism Controller tests - Model errors - Model fails", function(done) {
      let controller = new OrganismController();

      // Mock function
      controller.remove = jest.fn(
        id =>
          new Promise(function(resolve, reject) {
            return reject("Delete query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/organism/",
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

      controller.organism_delete(request, response);
    });
  });

  describe("Delete Organism Controller tests - Success", function() {
    test("Delete Organism Controller tests - Success", function(done) {
      const controller = new OrganismController();

      controller.remove = jest.fn(
        id =>
          new Promise(function(resolve, reject) {
            return resolve(id);
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/organism/",
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

      controller.organism_delete(request, response);
    });
  });
});
