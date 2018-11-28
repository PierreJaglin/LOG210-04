const httpMocks = require("node-mocks-http");
const ReferentController = require("../src/controllers/referentController.js");

describe("Get Referent Controller tests", function() {
  describe("Get Referent Controller tests - Referent is invalid", function() {
    test("Get Referent Controller tests - Referent is invalid - ID", function(done) {
      let controller = new ReferentController();

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/referent/",
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

      controller.referent_detail(request, response);
    });
  });

  describe("Get Referent Controller tests - Model errors", function() {
    test("Get Referent Controller tests - Model errors - Model fails", function(done) {
      let controller = new ReferentController();

      controller.get = jest.fn(
        id =>
          new Promise(function(resolve, reject) {
            return reject("Get query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/referent/",
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

      controller.referent_detail(request, response);
    });
  });

  describe("Get Referent Controller tests - Success", function() {
    test("Get Referent Controller tests - Success", function(done) {
      const controller = new ReferentController();

      controller.get = jest.fn(
        id =>
          new Promise(function(resolve, reject) {
            return resolve(id);
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/referent/",
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

      controller.referent_detail(request, response);
    });
  });
});

describe("GetAll Referent Controller tests", function() {
  describe("GetAll Referent Controller tests - Model errors", function() {
    test("GetAll Referent Controller tests - Model errors - Model fails", function(done) {
      let controller = new ReferentController();

      // Mock function
      controller.getAll = jest.fn(
        () =>
          new Promise(function(resolve, reject) {
            return reject("GetAll query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/referent/"
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual("GetAll query failed");
        done();
      });

      controller.referent_list(request, response);
    });
  });

  describe("GetAll Referent Controller tests - Success", function() {
    test("GetAll Referent Controller tests - Success", function(done) {
      const controller = new ReferentController();

      controller.getAll = jest.fn(
        () =>
          new Promise(function(resolve, reject) {
            return resolve([1, 2]);
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/referent/"
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

      controller.referent_list(request, response);
    });
  });
});

describe("Create Referent Controller tests", function() {
  describe("Create Referent Controller tests - Referent is invalid", function() {
    test("Create Referent Controller tests - Referent is invalid - LastName", function(done) {
      let controller = new ReferentController();

      const referent = {
        lastname: "",
        firstname: "firstname",
        title: "title",
        phone: "514-987-5161",
        officePhone: "514-987-5161",
        fax: "514-987-5161",
        email: "email@a.com",
        prefFax: false,
        prefEmail: true,
        prefPaper: false
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/referent/",
        body: {
          referent: referent
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual(["The lastname is required"]);
        done();
      });

      controller.referent_create(request, response);
    });

    test("Create Referent Controller tests - Referent is invalid - FirstName", function(done) {
      let controller = new ReferentController();

      const referent = {
        lastname: "lastname",
        firstname: "",
        title: "title",
        phone: "514-987-5161",
        officePhone: "514-987-5161",
        fax: "514-987-5161",
        email: "email@a.com",
        prefFax: false,
        prefEmail: true,
        prefPaper: false
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/referent/",
        body: {
          referent: referent
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual(["The firstname is required"]);
        done();
      });

      controller.referent_create(request, response);
    });

    test("Create Referent Controller tests - Referent is invalid - Title", function(done) {
      let controller = new ReferentController();

      const referent = {
        lastname: "lastname",
        firstname: "firstname",
        title: "",
        phone: "514-987-5161",
        officePhone: "514-987-5161",
        fax: "514-987-5161",
        email: "email@a.com",
        prefFax: false,
        prefEmail: true,
        prefPaper: false
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/referent/",
        body: {
          referent: referent
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual(["The title is required"]);
        done();
      });

      controller.referent_create(request, response);
    });

    test("Create Referent Controller tests - Referent is invalid - Phone", function(done) {
      let controller = new ReferentController();

      const referent = {
        lastname: "lastname",
        firstname: "firstname",
        title: "title",
        phone: "5149478798",
        officePhone: "514-987-5161",
        fax: "514-987-5161",
        email: "email@a.com",
        prefFax: false,
        prefEmail: true,
        prefPaper: false
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/referent/",
        body: {
          referent: referent
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

      controller.referent_create(request, response);
    });

    test("Create Referent Controller tests - Referent is invalid - officePhone", function(done) {
      let controller = new ReferentController();

      const referent = {
        lastname: "lastname",
        firstname: "firstname",
        title: "title",
        phone: "514-987-5161",
        officePhone: "5149478798",
        fax: "514-987-5161",
        email: "email@a.com",
        prefFax: false,
        prefEmail: true,
        prefPaper: false
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/referent/",
        body: {
          referent: referent
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual([
          "If specified, the office phone number must match a pattern 111-111-1111."
        ]);
        done();
      });

      controller.referent_create(request, response);
    });

    test("Create Referent Controller tests - Referent is invalid - Fax", function(done) {
      let controller = new ReferentController();

      const referent = {
        lastname: "lastname",
        firstname: "firstname",
        title: "title",
        phone: "514-987-5161",
        officePhone: "514-987-5161",
        fax: "5149478798",
        email: "email@a.com",
        prefFax: false,
        prefEmail: true,
        prefPaper: false
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/referent/",
        body: {
          referent: referent
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

      controller.referent_create(request, response);
    });

    test("Create Referent Controller tests - Referent is invalid - Email", function(done) {
      let controller = new ReferentController();

      const referent = {
        lastname: "lastname",
        firstname: "firstname",
        title: "title",
        phone: "514-987-5161",
        officePhone: "514-987-5161",
        fax: "514-987-5161",
        email: "abc",
        prefFax: false,
        prefEmail: true,
        prefPaper: false
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/referent/",
        body: {
          referent: referent
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

      controller.referent_create(request, response);
    });

    test("Create Referent Controller tests - Referent is invalid - prefFax", function(done) {
      let controller = new ReferentController();

      const referent = {
        lastname: "lastname",
        firstname: "firstname",
        title: "title",
        phone: "514-987-5161",
        officePhone: "514-987-5161",
        fax: "514-987-5161",
        email: "email@a.com",
        prefFax: undefined,
        prefEmail: true,
        prefPaper: false
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/referent/",
        body: {
          referent: referent
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual([
          "You must specify if the referent preference fax is active or not."
        ]);
        done();
      });

      controller.referent_create(request, response);
    });

    test("Create Referent Controller tests - Referent is invalid - prefEmail", function(done) {
      let controller = new ReferentController();

      const referent = {
        lastname: "lastname",
        firstname: "firstname",
        title: "title",
        phone: "514-987-5161",
        officePhone: "514-987-5161",
        fax: "514-987-5161",
        email: "email@a.com",
        prefFax: true,
        prefEmail: undefined,
        prefPaper: false
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/referent/",
        body: {
          referent: referent
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual([
          "You must specify if the referent preference email is active or not."
        ]);
        done();
      });

      controller.referent_create(request, response);
    });

    test("Create Referent Controller tests - Referent is invalid - prefPaper", function(done) {
      let controller = new ReferentController();

      const referent = {
        lastname: "lastname",
        firstname: "firstname",
        title: "title",
        phone: "514-987-5161",
        officePhone: "514-987-5161",
        fax: "514-987-5161",
        email: "email@a.com",
        prefFax: true,
        prefEmail: false,
        prefPaper: undefined
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/referent/",
        body: {
          referent: referent
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual([
          "You must specify if the referent preference paper is active or not."
        ]);
        done();
      });

      controller.referent_create(request, response);
    });
  });

  describe("Create Referent Controller tests - Model errors", function() {
    test("Create Referent Controller tests - Model errors - Create fails", function() {
      let controller = new ReferentController();

      // Mock function
      controller.create = jest.fn(
        referent =>
          new Promise(function(resolve, reject) {
            return reject("Create query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/referent/"
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual("Create query failed");
        done();
      });

      controller.referent_list(request, response);
    });

    test("Create Referent Controller tests - Model errors - Find fails", function() {
      let controller = new ReferentController();

      // Mock function
      controller.find = jest.fn(
        name =>
          new Promise(function(resolve, reject) {
            return reject("Find query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/referent/"
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual("Find query failed");
        done();
      });

      controller.referent_list(request, response);
    });
  });

  describe("Create Referent Controller tests - Success", function() {
    test("Create Referent Controller tests - Success", function(done) {
      let controller = new ReferentController();

      controller.create = jest.fn(
        referent =>
          new Promise(function(resolve, reject) {
            return resolve(referent);
          })
      );

      controller.findByEmail = jest.fn(
        email =>
          new Promise(function(resolve, reject) {
            return resolve(referent);
          })
      );

      const referent = {
        lastname: "lastname",
        firstname: "firstname",
        title: "title",
        phone: "514-987-5161",
        officePhone: "514-987-5161",
        fax: "514-987-5161",
        email: "email@a.com",
        prefFax: false,
        prefEmail: true,
        prefPaper: false
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/referent/",
        body: {
          referent: referent
        }
      });
      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual(referent);
        done();
      });

      controller.referent_create(request, response);
    });
  });
});

describe("Update Referent Controller tests", function() {
  describe("Update Referent Controller tests - Referent is invalid", function() {
    test("Update Referent Controller test - Referent is invalid - ID", function(done) {
      let controller = new ReferentController();

      const referent = {
        lastname: "lastname",
        firstname: "firstname",
        title: "title",
        phone: "514-987-5161",
        officePhone: "514-987-5161",
        fax: "514-987-5161",
        email: "email@a.com",
        prefFax: false,
        prefEmail: true,
        prefPaper: false
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/referent/update",
        body: {
          referent: referent
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

      controller.referent_update(request, response);
    });

    test("Update Referent Controller tests - Referent is invalid - LastName", function(done) {
      let controller = new ReferentController();

      const referent = {
        lastname: "",
        firstname: "firstname",
        title: "title",
        phone: "514-987-5161",
        officePhone: "514-987-5161",
        fax: "514-987-5161",
        email: "email@a.com",
        prefFax: false,
        prefEmail: true,
        prefPaper: false
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/referent/update",
        body: {
          referent: referent
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
        expect(data.message).toEqual(["The lastname is required"]);
        done();
      });

      controller.referent_update(request, response);
    });

    test("Update Referent Controller tests - Referent is invalid - FirstName", function(done) {
      let controller = new ReferentController();

      const referent = {
        lastname: "lastname",
        firstname: "",
        title: "title",
        phone: "514-987-5161",
        officePhone: "514-987-5161",
        fax: "514-987-5161",
        email: "email@a.com",
        prefFax: false,
        prefEmail: true,
        prefPaper: false
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/referent/update",
        body: {
          referent: referent
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
        expect(data.message).toEqual(["The firstname is required"]);
        done();
      });

      controller.referent_update(request, response);
    });

    test("Update Referent Controller tests - Referent is invalid - Phone", function(done) {
      let controller = new ReferentController();

      const referent = {
        lastname: "lastname",
        firstname: "firstname",
        title: "title",
        phone: "5149478798",
        officePhone: "514-987-5161",
        fax: "514-987-5161",
        email: "email@a.com",
        prefFax: false,
        prefEmail: true,
        prefPaper: false
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/referent/update",
        body: {
          referent: referent
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

      controller.referent_update(request, response);
    });

    test("Update Referent Controller tests - Referent is invalid - officePhone", function(done) {
      let controller = new ReferentController();

      const referent = {
        lastname: "lastname",
        firstname: "firstname",
        title: "title",
        phone: "514-987-5161",
        officePhone: "5149478798",
        fax: "514-987-5161",
        email: "email@a.com",
        prefFax: false,
        prefEmail: true,
        prefPaper: false
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/referent/update",
        body: {
          referent: referent
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
          "If specified, the office phone number must match a pattern 111-111-1111."
        ]);
        done();
      });

      controller.referent_update(request, response);
    });

    test("Update Referent Controller tests - Referent is invalid - Fax", function(done) {
      let controller = new ReferentController();

      const referent = {
        lastname: "lastname",
        firstname: "firstname",
        title: "title",
        phone: "514-987-5161",
        officePhone: "514-987-5161",
        fax: "5149478798",
        email: "email@a.com",
        prefFax: false,
        prefEmail: true,
        prefPaper: false
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/referent/update",
        body: {
          referent: referent
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

      controller.referent_update(request, response);
    });

    test("Update Referent Controller tests - Referent is invalid - Email", function(done) {
      let controller = new ReferentController();

      const referent = {
        lastname: "lastname",
        firstname: "firstname",
        title: "title",
        phone: "514-987-5161",
        officePhone: "514-987-5161",
        fax: "514-987-5161",
        email: "abc",
        prefFax: false,
        prefEmail: true,
        prefPaper: false
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/referent/update",
        body: {
          referent: referent
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

      controller.referent_update(request, response);
    });

    test("Update Referent Controller tests - Referent is invalid - prefFax", function(done) {
      let controller = new ReferentController();

      const referent = {
        lastname: "lastname",
        firstname: "firstname",
        title: "title",
        phone: "514-987-5161",
        officePhone: "514-987-5161",
        fax: "514-987-5161",
        email: "email@a.com",
        prefFax: undefined,
        prefEmail: true,
        prefPaper: false
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/referent/update",
        body: {
          referent: referent
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
          "You must specify if the referent preference fax is active or not."
        ]);
        done();
      });

      controller.referent_update(request, response);
    });

    test("Update Referent Controller tests - Referent is invalid - prefEmail", function(done) {
      let controller = new ReferentController();

      const referent = {
        lastname: "lastname",
        firstname: "firstname",
        title: "title",
        phone: "514-987-5161",
        officePhone: "514-987-5161",
        fax: "514-987-5161",
        email: "email@a.com",
        prefFax: true,
        prefEmail: undefined,
        prefPaper: false
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/referent/update",
        body: {
          referent: referent
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
          "You must specify if the referent preference email is active or not."
        ]);
        done();
      });

      controller.referent_update(request, response);
    });

    test("Update Referent Controller tests - Referent is invalid - prefPaper", function(done) {
      let controller = new ReferentController();

      const referent = {
        lastname: "lastname",
        firstname: "firstname",
        title: "title",
        phone: "514-987-5161",
        officePhone: "514-987-5161",
        fax: "514-987-5161",
        email: "email@a.com",
        prefFax: true,
        prefEmail: false,
        prefPaper: undefined
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/referent/update",
        body: {
          referent: referent
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
          "You must specify if the referent preference paper is active or not."
        ]);
        done();
      });

      controller.referent_update(request, response);
    });
  });

  describe("Update Referent Controller tests - Model errors", function() {
    test("Update Referent Controller tests - Model errors - Create fails", function() {
      let controller = new ReferentController();

      // Mock function
      controller.update = jest.fn(
        referent =>
          new Promise(function(resolve, reject) {
            return reject("Update query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/referent/"
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual("Update query failed");
        done();
      });

      controller.referent_list(request, response);
    });

    test("Update Referent Controller tests - Model errors - Get fails", function() {
      let controller = new ReferentController();

      // Mock function
      controller.get = jest.fn(
        name =>
          new Promise(function(resolve, reject) {
            return reject("Get query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/referent/"
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual("Get query failed");
        done();
      });

      controller.referent_list(request, response);
    });
  });

  describe("Update Referent Controller tests - Success", function() {
    test("Update Referent Controller tests - Success", function(done) {
      let controller = new ReferentController();

      controller.update = jest.fn(
        referent =>
          new Promise(function(resolve, reject) {
            return resolve(referent);
          })
      );

      controller.get = jest.fn(
        id =>
          new Promise(function(resolve, reject) {
            return resolve({
              id: 1,
              referent
            });
          })
      );

      const referent = {
        lastname: "lastname",
        firstname: "firstname",
        title: "title",
        phone: "514-987-5161",
        officePhone: "514-987-5161",
        fax: "514-987-5161",
        email: "email@a.com",
        prefFax: false,
        prefEmail: true,
        prefPaper: false
      };

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/api/referent/update",
        body: {
          referent: referent
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
          referent
        });
        done();
      });

      controller.referent_update(request, response);
    });
  });
});

describe("Delete Referent Controller tests", function() {
  describe("Delete Referent Controller tests - Referent is invalid", function() {
    test("Delete Referent Controller tests - Referent is invalid - ID", function(done) {
      let controller = new ReferentController();

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/referent/",
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

      controller.referent_delete(request, response);
    });
  });

  describe("Delete Referent Controller tests - Model errors", function() {
    test("Delete Organism Controller tests - Model errors - Model fails", function(done) {
      let controller = new ReferentController();

      // Mock function
      controller.remove = jest.fn(
        id =>
          new Promise(function(resolve, reject) {
            return reject("Delete query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/referent/",
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

      controller.referent_delete(request, response);
    });
  });

  describe("Delete Referent Controller tests - Success", function() {
    test("Delete Referent Controller tests - Success", function(done) {
      const controller = new ReferentController();

      controller.remove = jest.fn(
        id =>
          new Promise(function(resolve, reject) {
            return resolve(id);
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/referent/",
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

      controller.referent_delete(request, response);
    });
  });
});
