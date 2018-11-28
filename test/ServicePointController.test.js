const httpMocks = require("node-mocks-http");
const ServicePointController = require("../src/controllers/servicePointController.js");

describe("Get ServicePoint Controller tests", function() {
  describe("Get ServicePoint Controller tests - ServicePoint is invalid", function() {
    test("Get ServicePoint Controller tests - ServicePoint is invalid - ID", function(done) {
      let controller = new ServicePointController();

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/servicePoint/",
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

      controller.servicePoint_detail(request, response);
    });
  });

  describe("Get ServicePoint Controller tests - Model errors", function() {
    test("Get ServicePoint Controller tests - Model errors - Model fails", function(done) {
      let controller = new ServicePointController();

      // Mock function
      controller.get = jest.fn(
        id =>
          new Promise(function(resolve, reject) {
            return reject("Get query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/servicePoint/",
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

      controller.servicePoint_detail(request, response);
    });

    test("Get ServicePoint Controller tests - Model errors - No service point found", function(done) {
      let controller = new ServicePointController();

      // Mock function
      controller.get = jest.fn(
        id =>
          new Promise(function(resolve, reject) {
            return resolve(undefined);
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/servicePoint/",
        query: {
          id: 1
        }
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual("No service point found");
        done();
      });

      controller.servicePoint_detail(request, response);
    });
  });

  describe("Get ServicePoint Controller tests - Success", function() {
    test("Get ServicePoint Controller tests - Success", function(done) {
      const controller = new ServicePointController();

      controller.get = jest.fn(
        id =>
          new Promise(function(resolve, reject) {
            return resolve(id);
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/servicePoint/",
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

      controller.servicePoint_detail(request, response);
    });
  });
});

describe("GetAll ServicePoint Controller tests", function() {
  describe("GetAll ServicePoint Controller tests - Model errors", function() {
    test("GetAll ServicePoint Controller tests - Model errors - Model fails", function(done) {
      let controller = new ServicePointController();

      // Mock function
      controller.getAll = jest.fn(
        () =>
          new Promise(function(resolve, reject) {
            return reject("GetAll query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/servicePoint/"
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual("GetAll query failed");
        done();
      });

      controller.servicePoint_list(request, response);
    });
  });

  describe("GetAll ServicePoint Controller tests - Success", function() {
    test("GetAll ServicePoint Controller tests - Success", function(done) {
      const controller = new ServicePointController();

      controller.getAll = jest.fn(
        () =>
          new Promise(function(resolve, reject) {
            return resolve([1, 2]);
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/servicePoint/"
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

      controller.servicePoint_list(request, response);
    });
  });
});

describe("Create ServicePoint Controller tests", function() {
  describe("Create ServicePoint Controller tests - ServicePoint is invalid", function() {
    test("Create ServicePoint Controller tests - ServicePoint is invalid - Name", function(done) {
      let controller = new ServicePointController();

      const servicePoint = {
        name: "",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: undefined,
        organism: 1,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/servicePoint/create",
        body: {
          servicePoint: servicePoint
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

      controller.servicePoint_create(request, response);
    });

    test("Create ServicePoint Controller tests - ServicePoint is invalid - Address number", function(done) {
      let controller = new ServicePointController();

      const servicePoint = {
        name: "test_controller_create_invalid_addressNumber",
        addressNumber: "a",
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: undefined,
        organism: 1,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/servicePoint/create",
        body: {
          servicePoint: servicePoint
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

      controller.servicePoint_create(request, response);
    });

    test("Create ServicePoint Controller tests - ServicePoint is invalid - Street", function(done) {
      let controller = new ServicePointController();

      const servicePoint = {
        name: "test_controller_create_invalid_street",
        addressNumber: 8585,
        street: "",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: undefined,
        organism: 1,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/servicePoint/create",
        body: {
          servicePoint: servicePoint
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

      controller.servicePoint_create(request, response);
    });

    test("Create ServicePoint Controller tests - ServicePoint is invalid - City", function(done) {
      let controller = new ServicePointController();

      const servicePoint = {
        name: "test_controller_create_invalid_city",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: undefined,
        organism: 1,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/servicePoint/create",
        body: {
          servicePoint: servicePoint
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

      controller.servicePoint_create(request, response);
    });

    test("Create ServicePoint Controller tests - ServicePoint is invalid - Province", function(done) {
      let controller = new ServicePointController();

      const servicePoint = {
        name: "test_controller_create_invalid_province",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: undefined,
        organism: 1,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/servicePoint/create",
        body: {
          servicePoint: servicePoint
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

      controller.servicePoint_create(request, response);
    });

    test("Create ServicePoint Controller tests - ServicePoint is invalid - Postal Code", function(done) {
      let controller = new ServicePointController();

      const servicePoint = {
        name: "test_controller_create_invalid_postalCode",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H16_t?y",
        phone: undefined,
        fax: undefined,
        email: undefined,
        organism: 1,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/servicePoint/create",
        body: {
          servicePoint: servicePoint
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

      controller.servicePoint_create(request, response);
    });

    test("Create ServicePoint Controller tests - ServicePoint is invalid - Phone", function(done) {
      let controller = new ServicePointController();

      const servicePoint = {
        name: "test_controller_create_invalid_phone",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: "5149478798",
        fax: undefined,
        email: undefined,
        organism: 1,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/servicePoint/create",
        body: {
          servicePoint: servicePoint
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

      controller.servicePoint_create(request, response);
    });

    test("Create ServicePoint Controller tests - ServicePoint is invalid - Fax", function(done) {
      let controller = new ServicePointController();

      const servicePoint = {
        name: "test_controller_create_invalid_fax",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: "5149478798",
        email: undefined,
        organism: 1,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/servicePoint/create",
        body: {
          servicePoint: servicePoint
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

      controller.servicePoint_create(request, response);
    });

    test("Create ServicePoint Controller tests - ServicePoint is invalid - Email", function(done) {
      let controller = new ServicePointController();

      const servicePoint = {
        name: "test_controller_create_invalid_email",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: "abc",
        organism: 1,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/servicePoint/create",
        body: {
          servicePoint: servicePoint
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

      controller.servicePoint_create(request, response);
    });

    test("Create ServicePoint Controller tests - ServicePoint is invalid - Active", function(done) {
      let controller = new ServicePointController();

      const servicePoint = {
        name: "test_controller_create_invalid_active",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: undefined,
        organism: 1,
        active: undefined
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/servicePoint/create",
        body: {
          servicePoint: servicePoint
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual([
          "You must specify if the service point is active or not."
        ]);
        done();
      });

      controller.servicePoint_create(request, response);
    });
  });

  describe("Create ServicePoint Controller tests - Model errors", function() {
    test("Create ServicePoint Controller tests - Model errors - Create fails", function() {
      let controller = new ServicePointController();

      // Mock function
      controller.create = jest.fn(
        servicePoint =>
          new Promise(function(resolve, reject) {
            return reject("Create query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/servicePoint/"
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual("Create query failed");
        done();
      });

      controller.servicePoint_list(request, response);
    });

    test("Create ServicePoint Controller tests - Model errors - Find fails", function() {
      let controller = new ServicePointController();

      // Mock function
      controller.find = jest.fn(
        name =>
          new Promise(function(resolve, reject) {
            return reject("Find query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/servicePoint/"
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual("Find query failed");
        done();
      });

      controller.servicePoint_list(request, response);
    });
  });

  describe("Create ServicePoint Controller tests - Success", function() {
    test("Create ServicePoint Controller tests - Success", function(done) {
      let controller = new ServicePointController();

      controller.create = jest.fn(
        servicePoint =>
          new Promise(function(resolve, reject) {
            return resolve(servicePoint);
          })
      );

      controller.find = jest.fn(
        name =>
          new Promise(function(resolve, reject) {
            return resolve(servicePoint);
          })
      );

      const servicePoint = {
        name: "test_controller_create_success",
        addressNumber: 100,
        street: "abc",
        city: "abc",
        province: "abc",
        postalCode: "H4T1G6",
        phone: "514-987-5161",
        fax: "514-987-5161",
        email: "a@a.com",
        organism: 1,
        active: false
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/servicePoint/create",
        body: {
          servicePoint: servicePoint
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual(servicePoint);
        done();
      });

      controller.servicePoint_create(request, response);
    });
  });
});

describe("Update ServicePoint Controller tests", function() {
  describe("Update ServicePoint Controller tests - ServicePoint is invalid", function() {
    test("Update ServicePoint Controller tests - ServicePoint is invalid - ID", function(done) {
      let controller = new ServicePointController();

      const servicePoint = {
        name: "test_controller_update_invalid_id",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: undefined,
        organism: 1,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/servicePoint/update",
        body: {
          servicePoint: servicePoint
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

      controller.servicePoint_update(request, response);
    });

    test("Update ServicePoint Controller tests - ServicePoint is invalid - Name", function(done) {
      let controller = new ServicePointController();

      const servicePoint = {
        name: "",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: undefined,
        organism: 1,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/servicePoint/update",
        body: {
          servicePoint: servicePoint
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

      controller.servicePoint_update(request, response);
    });

    test("Update ServicePoint Controller tests - ServicePoint is invalid - Address number", function(done) {
      let controller = new ServicePointController();

      const servicePoint = {
        name: "test_controller_update_invalid_addressNumber",
        addressNumber: "a",
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: undefined,
        organism: 1,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/servicePoint/update",
        body: {
          servicePoint: servicePoint
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

      controller.servicePoint_update(request, response);
    });

    test("Update ServicePoint Controller tests - ServicePoint is invalid - Street", function(done) {
      let controller = new ServicePointController();

      const servicePoint = {
        name: "test_controller_update_invalid_street",
        addressNumber: 8585,
        street: "",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: undefined,
        organism: 1,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/servicePoint/update",
        body: {
          servicePoint: servicePoint
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

      controller.servicePoint_update(request, response);
    });

    test("Update ServicePoint Controller tests - ServicePoint is invalid - City", function(done) {
      let controller = new ServicePointController();

      const servicePoint = {
        name: "test_controller_update_invalid_city",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: undefined,
        organism: 1,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/servicePoint/update",
        body: {
          servicePoint: servicePoint
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

      controller.servicePoint_update(request, response);
    });

    test("Update ServicePoint Controller tests - ServicePoint is invalid - Province", function(done) {
      let controller = new ServicePointController();

      const servicePoint = {
        name: "test_controller_update_invalid_province",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: undefined,
        organism: 1,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/servicePoint/update",
        body: {
          servicePoint: servicePoint
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

      controller.servicePoint_update(request, response);
    });

    test("Update ServicePoint Controller tests - ServicePoint is invalid - Postal Code", function(done) {
      let controller = new ServicePointController();

      const servicePoint = {
        name: "test_controller_update_invalid_postalCode",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H16_t?y",
        phone: undefined,
        fax: undefined,
        email: undefined,
        organism: 1,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/servicePoint/update",
        body: {
          servicePoint: servicePoint
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

      controller.servicePoint_update(request, response);
    });

    test("Update ServicePoint Controller tests - ServicePoint is invalid - Phone", function(done) {
      let controller = new ServicePointController();

      const servicePoint = {
        name: "test_controller_update_invalid_phone",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: "5149478798",
        fax: undefined,
        email: undefined,
        organism: 1,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/servicePoint/update",
        body: {
          servicePoint: servicePoint
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

      controller.servicePoint_update(request, response);
    });

    test("Update ServicePoint Controller tests - ServicePoint is invalid - Fax", function(done) {
      let controller = new ServicePointController();

      const servicePoint = {
        name: "test_controller_update_invalid_fax",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: "5149478798",
        email: undefined,
        organism: 1,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/servicePoint/update",
        body: {
          servicePoint: servicePoint
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

      controller.servicePoint_update(request, response);
    });

    test("Update ServicePoint Controller tests - ServicePoint is invalid - Email", function(done) {
      let controller = new ServicePointController();

      const servicePoint = {
        name: "test_controller_update_invalid_email",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: "abc",
        organism: 1,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/servicePoint/update",
        body: {
          servicePoint: servicePoint
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

      controller.servicePoint_update(request, response);
    });

    test("Update ServicePoint Controller tests - ServicePoint is invalid - Active", function(done) {
      let controller = new ServicePointController();

      const servicePoint = {
        name: "test_controller_update_invalid_active",
        addressNumber: 8585,
        street: "Chemin de la Côte-de-Liesse",
        city: "Saint-Laurent",
        province: "Quebec",
        postalCode: "H4T1G6",
        phone: undefined,
        fax: undefined,
        email: undefined,
        organism: 1,
        active: undefined
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/servicePoint/update",
        body: {
          servicePoint: servicePoint
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
          "You must specify if the service point is active or not."
        ]);
        done();
      });

      controller.servicePoint_update(request, response);
    });
  });

  describe("Update ServicePoint Controller tests - Model errors", function() {
    test("Update ServicePoint Controller tests - Model errors - Update fails", function() {
      let controller = new ServicePointController();

      // Mock function
      controller.update = jest.fn(
        servicePoint =>
          new Promise(function(resolve, reject) {
            return reject("Update query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/servicePoint/"
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual("Update query failed");
        done();
      });

      controller.servicePoint_list(request, response);
    });

    test("Update ServicePoint Controller tests - Model errors - Find fails", function() {
      let controller = new ServicePointController();

      // Mock function
      controller.get = jest.fn(
        name =>
          new Promise(function(resolve, reject) {
            return reject("Get query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/servicePoint/"
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual("Get query failed");
        done();
      });

      controller.servicePoint_list(request, response);
    });
  });

  describe("Update ServicePoint Controller tests - Success", function() {
    test("Update ServicePoint Controller tests - Success", function(done) {
      let controller = new ServicePointController();

      controller.update = jest.fn(
        servicePoint =>
          new Promise(function(resolve, reject) {
            return resolve(servicePoint);
          })
      );

      controller.get = jest.fn(
        id =>
          new Promise(function(resolve, reject) {
            return resolve({
              id: 1,
              servicePoint
            });
          })
      );

      const servicePoint = {
        name: "test_controller_update_success",
        addressNumber: 100,
        street: "abc",
        city: "abc",
        province: "abc",
        postalCode: "H4T1G6",
        phone: "514-987-5161",
        fax: "514-987-5161",
        email: "a@a.com",
        organism: 1,
        active: false
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/servicePoint/update",
        body: {
          servicePoint: servicePoint
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
          servicePoint
        });
        done();
      });

      controller.servicePoint_update(request, response);
    });
  });
});

describe("Delete ServicePoint Controller tests", function() {
  describe("Delete ServicePoint Controller tests - ServicePoint is invalid", function() {
    test("Delete ServicePoint Controller tests - ServicePoint is invalid - ID", function(done) {
      let controller = new ServicePointController();

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/servicePoint/",
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

      controller.servicePoint_delete(request, response);
    });
  });

  describe("Delete ServicePoint Controller tests - Model errors", function() {
    test("Delete ServicePoint Controller tests - Model errors - Model fails", function(done) {
      let controller = new ServicePointController();

      // Mock function
      controller.remove = jest.fn(
        id =>
          new Promise(function(resolve, reject) {
            return reject("Delete query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/servicePoint/",
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

      controller.servicePoint_delete(request, response);
    });
  });

  describe("Delete ServicePoint Controller tests - Success", function() {
    test("Delete ServicePoint Controller tests - Success", function(done) {
      const controller = new ServicePointController();

      controller.remove = jest.fn(
        id =>
          new Promise(function(resolve, reject) {
            return resolve(id);
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/servicePoint/",
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

      controller.servicePoint_delete(request, response);
    });
  });
});
