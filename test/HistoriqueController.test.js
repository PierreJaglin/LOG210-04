const httpMocks = require("node-mocks-http");
const HistoriqueController = require("../src/controllers/historiqueController.js");

describe("GetAll Historique Controller tests", function() {
  describe("GetAll Historique Controller tests - Model errors", function() {
    test("GetAll Historique Controller tests - Model errors - Model fails", function(done) {
      let controller = new HistoriqueController();

      // Mock function
      controller.getAll = jest.fn(
        () =>
          new Promise(function(resolve, reject) {
            return reject("GetAll query failed");
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/historique/"
      });

      var response = httpMocks.createResponse({
        eventEmitter: require("events").EventEmitter
      });

      response.on("end", function() {
        var data = response._getData();
        expect(data.message).toEqual("GetAll query failed");
        done();
      });

      controller.historique_list(request, response);
    });
  });

  describe("GetAll Historique Controller tests - Success", function() {
    test("GetAll Historique Controller tests - Success", function(done) {
      const controller = new HistoriqueController();

      controller.getAll = jest.fn(
        () =>
          new Promise(function(resolve, reject) {
            return resolve([1, 2]);
          })
      );

      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/historique/"
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

      controller.historique_list(request, response);
    });
  });
});
