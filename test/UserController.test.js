const httpMocks = require("node-mocks-http");
const UserController = require("../src/controllers/userController.js");

describe("Get User Controller tests", function() {
  describe("Get User Controller tests - User is invalid", function() {
    test("Get User Controller tests - User is invalid - ID", function(done) {
      let controller = new UserController();

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/user/",
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

      controller.user_detail(request, response);
    });
  });

  describe("Get User Controller tests - Model errors", function() {
    test("Get User Controller tests - Model errors - Model fails", function(done) {
      let controller = new UserController();

      // Mock function
      controller.get = jest.fn(
        id =>
          new Promise(function(resolve, reject) {
            return reject("Get query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/user/",
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

      controller.user_detail(request, response);
    });

    test("Get User Controller tests - Model errors - No user found", function(done) {
      let controller = new UserController();

      // Mock function
      controller.get = jest.fn(
        id =>
          new Promise(function(resolve, reject) {
            return resolve(undefined);
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/user/",
        query: {
          id: 1
        }
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual("No user found");
        done();
      });

      controller.user_detail(request, response);
    });
  });

  describe("Get User Controller tests - Success", function() {
    test("Get User Controller tests - Success", function(done) {
      const controller = new UserController();

      controller.get = jest.fn(
        id =>
          new Promise(function(resolve, reject) {
            return resolve(id);
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/user/",
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

      controller.user_detail(request, response);
    });
  });
});

describe("GetAll User Controller tests", function() {
  describe("GetAll User Controller tests - Model errors", function() {
    test("GetAll User Controller tests - Model errors - Model fails", function(done) {
      let controller = new UserController();

      // Mock function
      controller.getAll = jest.fn(
        () =>
          new Promise(function(resolve, reject) {
            return reject("GetAll query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/user/"
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual("GetAll query failed");
        done();
      });

      controller.user_list(request, response);
    });
  });

  describe("GetAll User Controller tests - Success", function() {
    test("GetAll User Controller tests - Success", function(done) {
      const controller = new UserController();

      controller.getAll = jest.fn(
        () =>
          new Promise(function(resolve, reject) {
            return resolve([1, 2]);
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/user/"
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

      controller.user_list(request, response);
    });
  });
});

describe("Create User Controller tests", function() {
  describe("Create User Controller tests - User is invalid", function() {
    test("Create User Controller tests - User is invalid - Name", function(done) {
      let controller = new UserController();

      const user = {
        username: "",
        email: "a@a.com",
        profile: 1,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/user/create",
        body: {
          user: user
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

      controller.user_create(request, response);
    });

    test("Create User Controller tests - User is invalid - Profile", function(done) {
      let controller = new UserController();

      const user = {
        username: "test_controller_create_invalid_active",
        email: "a@a.com",
        profile: undefined,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/user/create",
        body: {
          user: user
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual(["The profile is required."]);
        done();
      });

      controller.user_create(request, response);
    });

    test("Create User Controller tests - User is invalid - Active", function(done) {
      let controller = new UserController();

      const user = {
        username: "test_controller_create_invalid_active",
        email: "",
        profile: 1,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/user/create",
        body: {
          user: user
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual([
          "The email is required and must match the pattern a@a.com."
        ]);
        done();
      });

      controller.user_create(request, response);
    });

    test("Create User Controller tests - User is invalid - Active", function(done) {
      let controller = new UserController();

      const user = {
        username: "test_controller_create_invalid_active",
        email: "a@a.com",
        profile: 1,
        active: undefined
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/user/create",
        body: {
          user: user
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual([
          "You must specify if the user is active or not."
        ]);
        done();
      });

      controller.user_create(request, response);
    });
  });

  describe("Create User Controller tests - Model errors", function() {
    test("Create User Controller tests - Model errors - Create fails", function() {
      let controller = new UserController();

      // Mock function
      controller.create = jest.fn(
        user =>
          new Promise(function(resolve, reject) {
            return reject("Create query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/user/"
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual("Create query failed");
        done();
      });

      controller.user_list(request, response);
    });

    test("Create User Controller tests - Model errors - Find fails", function() {
      let controller = new UserController();

      // Mock function
      controller.find = jest.fn(
        name =>
          new Promise(function(resolve, reject) {
            return reject("Find query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/user/"
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual("Find query failed");
        done();
      });

      controller.user_list(request, response);
    });
  });

  describe("Create User Controller tests - Success", function() {
    test("Create User Controller tests - Success", function(done) {
      let controller = new UserController();

      controller.create = jest.fn(
        user =>
          new Promise(function(resolve, reject) {
            return resolve(user);
          })
      );

      controller.find = jest.fn(
        name =>
          new Promise(function(resolve, reject) {
            return resolve(user);
          })
      );

      const user = {
        username: "test_controller_create_success",
        email: "a@a.com",
        profile: 1,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/user/create",
        body: {
          user: user
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual(user);
        done();
      });

      controller.user_create(request, response);
    });
  });
});

describe("Update User Controller tests", function() {
  describe("Update User Controller tests - User is invalid", function() {
    test("Update User Controller tests - User is invalid - ID", function(done) {
      let controller = new UserController();

      const user = {
        username: "test_controller_update_invalid_id",
        email: "a@a.com",
        profile: 1,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/user/update",
        body: {
          user: user
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

      controller.user_update(request, response);
    });

    test("Update User Controller tests - User is invalid - Name", function(done) {
      let controller = new UserController();

      const user = {
        username: "",
        email: "a@a.com",
        profile: 1,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/user/update",
        body: {
          user: user
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

      controller.user_update(request, response);
    });

    test("Update User Controller tests - User is invalid - Email", function(done) {
      let controller = new UserController();

      const user = {
        username: "test_controller_update_invalid_email",
        email: "",
        profile: 1,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/user/update",
        body: {
          user: user
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
          "The email is required and must match the pattern a@a.com."
        ]);
        done();
      });

      controller.user_update(request, response);
    });

    test("Update User Controller tests - User is invalid - Profile", function(done) {
      let controller = new UserController();

      const user = {
        username: "test_controller_update_invalid_profile",
        email: "a@a.com",
        profile: undefined,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/user/update",
        body: {
          user: user
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
        expect(data.message).toEqual(["The profile is required."]);
        done();
      });

      controller.user_update(request, response);
    });

    test("Update User Controller tests - User is invalid - Active", function(done) {
      let controller = new UserController();

      const user = {
        username: "test_controller_update_invalid_active",
        email: "a@a.com",
        profile: 1,
        active: undefined
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/user/update",
        body: {
          user: user
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
          "You must specify if the user is active or not."
        ]);
        done();
      });

      controller.user_update(request, response);
    });
  });

  describe("Update User Controller tests - Model errors", function() {
    test("Update User Controller tests - Model errors - Update fails", function() {
      let controller = new UserController();

      // Mock function
      controller.update = jest.fn(
        user =>
          new Promise(function(resolve, reject) {
            return reject("Update query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/user/"
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual("Update query failed");
        done();
      });

      controller.user_list(request, response);
    });

    test("Update User Controller tests - Model errors - Find fails", function() {
      let controller = new UserController();

      // Mock function
      controller.get = jest.fn(
        name =>
          new Promise(function(resolve, reject) {
            return reject("Get query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/user/"
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual("Get query failed");
        done();
      });

      controller.user_list(request, response);
    });
  });

  describe("Update User Controller tests - Success", function() {
    test("Update User Controller tests - Success", function(done) {
      let controller = new UserController();

      controller.update = jest.fn(
        user =>
          new Promise(function(resolve, reject) {
            return resolve(user);
          })
      );

      controller.get = jest.fn(
        id =>
          new Promise(function(resolve, reject) {
            return resolve({
              id: 1,
              user
            });
          })
      );

      const user = {
        username: "test_controller_update_invalid_success",
        email: "a@a.com",
        profile: 1,
        active: true
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/user/update",
        body: {
          user: user
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
          user
        });
        done();
      });

      controller.user_update(request, response);
    });
  });
});

describe("Delete User Controller tests", function() {
  describe("Delete User Controller tests - User is invalid", function() {
    test("Delete User Controller tests - User is invalid - ID", function(done) {
      let controller = new UserController();

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/user/",
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

      controller.user_delete(request, response);
    });
  });

  describe("Delete User Controller tests - Model errors", function() {
    test("Delete User Controller tests - Model errors - Model fails", function(done) {
      let controller = new UserController();

      // Mock function
      controller.remove = jest.fn(
        id =>
          new Promise(function(resolve, reject) {
            return reject("Delete query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/user/",
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

      controller.user_delete(request, response);
    });
  });

  describe("Delete User Controller tests - Success", function() {
    test("Delete User Controller tests - Success", function(done) {
      const controller = new UserController();

      controller.remove = jest.fn(
        id =>
          new Promise(function(resolve, reject) {
            return resolve(id);
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/user/",
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

      controller.user_delete(request, response);
    });
  });
});
