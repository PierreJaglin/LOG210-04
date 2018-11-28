const httpMocks = require("node-mocks-http");
const ServiceController = require("../src/controllers/serviceController.js");

describe("Get Service Controller tests", function() {
  describe("Get Service Controller tests - Service is invalid", function() {
    test("Get Service Controller tests - Service is invalid - ID", function(done) {
      let controller = new ServiceController();

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/service/",
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

      controller.service_detail(request, response);
    });
  });

  describe("Get Service Controller tests - Model errors", function() {
    test("Get Service Controller tests - Model errors - Model fails", function(done) {
      let controller = new ServiceController();

      // Mock function
      controller.get = jest.fn(
        id =>
          new Promise(function(resolve, reject) {
            return reject("Get query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/service/",
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

      controller.service_detail(request, response);
    });

    test("Get Service Controller tests - Model errors - No service found", function(done) {
      let controller = new ServiceController();

      // Mock function
      controller.get = jest.fn(
        id =>
          new Promise(function(resolve, reject) {
            return resolve(undefined);
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/service/",
        query: {
          id: 1
        }
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual("No service found");
        done();
      });

      controller.service_detail(request, response);
    });
  });

  describe("Get Service Controller tests - Success", function() {
    test("Get Service Controller tests - Success", function(done) {
      const controller = new ServiceController();

      controller.get = jest.fn(
        id =>
          new Promise(function(resolve, reject) {
            return resolve(id);
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/service/",
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

      controller.service_detail(request, response);
    });
  });
});

describe("GetAll Service Controller tests", function() {
  describe("GetAll Service Controller tests - Model errors", function() {
    test("GetAll Service Controller tests - Model errors - Model fails", function(done) {
      let controller = new ServiceController();

      // Mock function
      controller.getAll = jest.fn(
        () =>
          new Promise(function(resolve, reject) {
            return reject("GetAll query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/service/"
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual("GetAll query failed");
        done();
      });

      controller.service_list(request, response);
    });
  });

  describe("GetAll Service Controller tests - Success", function() {
    test("GetAll Service Controller tests - Success", function(done) {
      const controller = new ServiceController();

      controller.getAll = jest.fn(
        () =>
          new Promise(function(resolve, reject) {
            return resolve([1, 2]);
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/service/"
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

      controller.service_list(request, response);
    });
  });
});

describe("Create Service Controller tests", function() {
  describe("Create Service Controller tests - Service is invalid", function() {
    test("Create Service Controller tests - Service is invalid - Name", function(done) {
      let controller = new ServiceController();

      const service = {
        name: "",
        description: "",
        parent: 0,
        subvention: true,
        cisss: 0,
        dateEntreeVigueur: "2018-11-10",
        servicePoint: 1,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/service/create",
        body: {
          service: service
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

      controller.service_create(request, response);
    });

    test("Create Service Controller tests - Service is invalid - Active", function(done) {
      let controller = new ServiceController();

      const service = {
        name: "test_controller_create_invalid_active",
        description: "",
        parent: 0,
        subvention: true,
        cisss: 0,
        dateEntreeVigueur: "2018-11-10",
        servicePoint: 1,
        active: undefined
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/service/create",
        body: {
          service: service
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual([
          "You must specify if the service is active or not."
        ]);
        done();
      });

      controller.service_create(request, response);
    });
  });

  describe("Create Service Controller tests - Model errors", function() {
    test("Create Service Controller tests - Model errors - Create fails", function() {
      let controller = new ServiceController();

      // Mock function
      controller.create = jest.fn(
        service =>
          new Promise(function(resolve, reject) {
            return reject("Create query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/service/"
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual("Create query failed");
        done();
      });

      controller.service_list(request, response);
    });

    test("Create Service Controller tests - Model errors - Find fails", function() {
      let controller = new ServiceController();

      // Mock function
      controller.find = jest.fn(
        name =>
          new Promise(function(resolve, reject) {
            return reject("Find query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/service/"
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual("Find query failed");
        done();
      });

      controller.service_list(request, response);
    });
  });

  describe("Create Service Controller tests - Success", function() {
    test("Create Service Controller tests - Success", function(done) {
      let controller = new ServiceController();

      controller.create = jest.fn(
        service =>
          new Promise(function(resolve, reject) {
            return resolve(service);
          })
      );

      controller.find = jest.fn(
        name =>
          new Promise(function(resolve, reject) {
            return resolve(service);
          })
      );

      const service = {
        name: "test_controller_create_success",
        description: "",
        parent: 0,
        subvention: true,
        cisss: 0,
        dateEntreeVigueur: "2018-11-10",
        servicePoint: 1,
        active: false
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/service/create",
        body: {
          service: service
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual(service);
        done();
      });

      controller.service_create(request, response);
    });
  });
});

describe("Update Service Controller tests", function() {
  describe("Update Service Controller tests - Service is invalid", function() {
    test("Update Service Controller tests - Service is invalid - ID", function(done) {
      let controller = new ServiceController();

      const service = {
        name: "test_controller_update_invalid_id",
        description: "",
        parent: 0,
        subvention: true,
        cisss: 0,
        dateEntreeVigueur: "2018-11-10",
        servicePoint: 1,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/service/update",
        body: {
          service: service
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

      controller.service_update(request, response);
    });

    test("Update Service Controller tests - Service is invalid - Name", function(done) {
      let controller = new ServiceController();

      const service = {
        name: "",
        description: "",
        parent: 0,
        subvention: true,
        cisss: 0,
        dateEntreeVigueur: "2018-11-10",
        servicePoint: 1,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/service/update",
        body: {
          service: service
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

      controller.service_update(request, response);
    });

    test("Update Service Controller tests - Service is invalid - Active", function(done) {
      let controller = new ServiceController();

      const service = {
        name: "test_controller_update_invalid_active",
        description: "",
        parent: 0,
        subvention: true,
        cisss: 0,
        dateEntreeVigueur: "2018-11-10",
        servicePoint: 1,
        active: undefined
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/service/update",
        body: {
          service: service
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
          "You must specify if the service is active or not."
        ]);
        done();
      });

      controller.service_update(request, response);
    });
  });

  describe("Update Service Controller tests - Model errors", function() {
    test("Update Service Controller tests - Model errors - Update fails", function() {
      let controller = new ServiceController();

      // Mock function
      controller.update = jest.fn(
        service =>
          new Promise(function(resolve, reject) {
            return reject("Update query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/service/"
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual("Update query failed");
        done();
      });

      controller.service_list(request, response);
    });

    test("Update Service Controller tests - Model errors - Find fails", function() {
      let controller = new ServiceController();

      // Mock function
      controller.get = jest.fn(
        name =>
          new Promise(function(resolve, reject) {
            return reject("Get query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/service/"
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual("Get query failed");
        done();
      });

      controller.service_list(request, response);
    });
  });

  describe("Update Service Controller tests - Success", function() {
    test("Update Service Controller tests - Success", function(done) {
      let controller = new ServiceController();

      controller.update = jest.fn(
        service =>
          new Promise(function(resolve, reject) {
            return resolve(service);
          })
      );

      controller.get = jest.fn(
        id =>
          new Promise(function(resolve, reject) {
            return resolve({
              id: 1,
              service
            });
          })
      );

      const service = {
        name: "test_controller_update_success",
        description: "",
        parent: 0,
        subvention: true,
        cisss: 0,
        dateEntreeVigueur: "2018-11-10",
        servicePoint: 1,
        active: false
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/service/update",
        body: {
          service: service
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
          service
        });
        done();
      });

      controller.service_update(request, response);
    });
  });
});

describe("Delete Service Controller tests", function() {
  describe("Delete Service Controller tests - Service is invalid", function() {
    test("Delete Service Controller tests - Service is invalid - ID", function(done) {
      let controller = new ServiceController();

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/service/",
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

      controller.service_delete(request, response);
    });
  });

  describe("Delete Service Controller tests - Model errors", function() {
    test("Delete Service Controller tests - Model errors - Model fails", function(done) {
      let controller = new ServiceController();

      // Mock function
      controller.remove = jest.fn(
        id =>
          new Promise(function(resolve, reject) {
            return reject("Delete query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/service/",
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

      controller.service_delete(request, response);
    });
  });

  describe("Delete Service Controller tests - Success", function() {
    test("Delete Service Controller tests - Success", function(done) {
      const controller = new ServiceController();

      controller.remove = jest.fn(
        id =>
          new Promise(function(resolve, reject) {
            return resolve(id);
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/service/",
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

      controller.service_delete(request, response);
    });
  });
});
