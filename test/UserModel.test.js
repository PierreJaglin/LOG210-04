const UserModel = require("../src/models/userModel");

describe("Get User Model tests", function() {
  test("Get User Model tests - Model fails", function(done) {
    let model = new UserModel();

    model.DBA_get = jest.fn(
      id =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: "Get query fails.",
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
        expect(error).toEqual("Get query fails.");
        done();
      });
  });

  test("Get User Model tests - Model Success", function(done) {
    let model = new UserModel();

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
        expect(error).toEqual(0);
        done();
      });
  });
});

describe("GetAll User Model tests", function() {
  test("GetAll User Model tests - Model fails", function(done) {
    let model = new UserModel();

    model.DBA_getAll = jest.fn(
      () =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: "GetAll query fails.",
            rows: null
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
        expect(error).toEqual("GetAll query fails.");
        done();
      });
  });

  test("GetAll User Model tests - Model Success", function(done) {
    let model = new UserModel();

    model.DBA_getAll = jest.fn(
      () =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            rows: [1, 2]
          });
        })
    );

    model
      .getAll()
      .then(rows => {
        expect(rows).toEqual([1, 2]);
        done();
      })
      .catch(error => {
        expect(error).toEqual(0);
        done();
      });
  });
});

describe("Find User Model tests", function() {
  test("Find User Model tests - Model fails", function(done) {
    let model = new UserModel();

    model.DBA_find = jest.fn(
      name =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: "Find query fails.",
            row: null
          });
        })
    );

    model
      .find("test")
      .then(row => {
        expect(1).toEqual(0);
        done();
      })
      .catch(error => {
        expect(error).toEqual("Find query fails.");
        done();
      });
  });

  test("Find User Model tests - Model Success", function(done) {
    let model = new UserModel();

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
      .find("test")
      .then(row => {
        expect(row).toEqual("test");
        done();
      })
      .catch(error => {
        expect(error).toEqual(0);
        done();
      });
  });
});

describe("Autheticate User Model tests", function() {
  test("Autheticate User Model tests - Model fails", function(done) {
    let model = new UserModel();

    model.DBA_authenticate = jest.fn(
      (username, password) =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: "Authenticate query fails.",
            row: null
          });
        })
    );

    model
      .authenticate("test", "test")
      .then(row => {
        expect(1).toEqual(0);
        done();
      })
      .catch(error => {
        expect(error).toEqual("Authenticate query fails.");
        done();
      });
  });

  test("Autheticate User Model tests - Model Success", function(done) {
    let model = new UserModel();

    model.DBA_authenticate = jest.fn(
      (username, password) =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            row: username
          });
        })
    );

    model
      .authenticate("test", "test")
      .then(row => {
        expect(row).toEqual("test");
        done();
      })
      .catch(error => {
        expect(error).toEqual(0);
        done();
      });
  });
});

describe("Create User Model tests", function() {
  test("Create User Model tests - Model fails", function(done) {
    let model = new UserModel();

    model.DBA_create = jest.fn(
      (name, profile, active) =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: "Create query fails.",
            rowID: null
          });
        })
    );

    model
      .create({ name: "test", profile: 1, serviceActif: true })
      .then(rowID => {
        expect(1).toEqual(0);
        done();
      })
      .catch(error => {
        expect(error).toEqual("Create query fails.");
        done();
      });
  });

  test("Create User Model tests - Model success", function(done) {
    let model = new UserModel();

    model.DBA_create = jest.fn(
      (name, email, profile, active) =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            rowID: name
          });
        })
    );

    model
      .create({
        name: "test",
        email: "philippe.cuerrier@gmail.com",
        profile: 1,
        serviceActif: true
      })
      .then(rowID => {
        expect(rowID).toEqual("test");
        done();
      })
      .catch(error => {
        expect(error).toEqual(0);
        done();
      });
  });
});

describe("Update User Model tests", function() {
  test("Update User Model tests - Model fails", function(done) {
    let model = new UserModel();

    model.DBA_update = jest.fn(
      (id, name, profile, active) =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: "Update query fails.",
            rowID: null
          });
        })
    );

    model
      .update({
        id: 1,
        name: "test",
        email: "philippe.cuerrier@gmail.com",
        profile: 1,
        serviceActif: true
      })
      .then(rowID => {
        expect(1).toEqual(0);
        done();
      })
      .catch(error => {
        expect(error).toEqual("Update query fails.");
        done();
      });
  });

  test("Update User Model tests - Model success", function(done) {
    let model = new UserModel();

    model.DBA_update = jest.fn(
      (id, name, profile, active) =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            rowID: id
          });
        })
    );

    model
      .update({
        id: 1,
        name: "test",
        email: "philippe.cuerrier@gmail.com",
        profile: 1,
        active: true
      })
      .then(rowID => {
        expect(rowID).toEqual(1);
        done();
      })
      .catch(error => {
        expect(error).toEqual(0);
        done();
      });
  });
});

describe("Remove User Model tests", function() {
  test("Remove User Model tests - Model fails", function(done) {
    let model = new UserModel();

    model.DBA_remove = jest.fn(
      id =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: "Remove query fails.",
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
        expect(error).toEqual("Remove query fails.");
        done();
      });
  });

  test("Remove User Model tests - Model success", function(done) {
    let model = new UserModel();

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
        expect(error).toEqual(0);
        done();
      });
  });
});

describe("Update Password User Model tests", function() {
  test("Update Password User Model tests - Model success", function(done) {
    let model = new UserModel();

    model.DBA_update_password = jest.fn(
      (token, password) =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            token: token
          });
        })
    );

    model
      .update_password("abc", "qwe")
      .then(() => {
        expect(1).toEqual(1);
        done();
      })
      .catch(error => {
        expect(error).toEqual(0);
        done();
      });
  });
});

describe("Block User Model tests", function() {
  test("Block User Model tests - Find Model fails", function(done) {
    let model = new UserModel();

    model.DBA_find = jest.fn(
      name =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: "Find query fails.",
            row: null
          });
        })
    );

    model.DBA_update = jest.fn(
      (id, name, profile, active) =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: "Should not be here",
            rowID: null
          });
        })
    );

    model.DBA_createLog = jest.fn(
      id =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: "Should not be here",
            rowID: null
          });
        })
    );

    model
      .block("abc", "qwe")
      .then(() => {
        expect(1).toEqual(0);
        done();
      })
      .catch(error => {
        expect(error).toEqual("Find query fails.");
        done();
      });
  });

  test("Block User Model tests - Model success", function(done) {
    let model = new UserModel();

    model.DBA_find = jest.fn(
      name =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            row: name
          });
        })
    );

    model.DBA_update = jest.fn(
      (id, name, profile, active) =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            rowID: id
          });
        })
    );

    model.DBA_createLog = jest.fn(
      id =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            rowID: 1
          });
        })
    );

    model
      .block("abc", "qwe")
      .then(() => {
        expect(1).toEqual(1);
        done();
      })
      .catch(error => {
        expect(error).toEqual(0);
        done();
      });
  });
});

describe("Valid Password Model tests", function() {
  test("Success", function() {
    let model = new UserModel();

    let encrypt = model.generateHash("abc");

    model
      .validPassword("abc", encrypt)
      .then(result => expect(1).toEqual(1))
      .catch(error => expect(error).toEqual(0));
  });

  test("Fail", function() {
    let model = new UserModel();

    let encrypt = model.generateHash("abc");

    model
      .validPassword("abcd", encrypt)
      .then(result => expect(0).toEqual(1))
      .catch(error => expect(1).toEqual(1));
  });
});

describe("SendEmail Model tests", function() {
  test("Success", function() {
    let model = new UserModel();

    model.transporter.sendMail = jest.fn((mailOptions, callback) =>
      callback(null, "OK")
    );

    model.DBA_find = jest.fn(
      name =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            row: name
          });
        })
    );

    model.sendEmail("abc", "qwe").then(() => expect(1).toEqual(1));
  });

  test("Fail", function() {
    let model = new UserModel();

    model.transporter.sendMail = jest.fn((mailOptions, callback) =>
      callback("WRONG", null)
    );

    model.DBA_find = jest.fn(
      name =>
        new Promise(function(resolve, reject) {
          return resolve({
            error: null,
            row: name
          });
        })
    );

    model.sendEmail("abc", "qwe").then(() => expect(1).toEqual(1));
  });
});
