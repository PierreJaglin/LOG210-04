const UserDBA = require("../src/dba/userDBA");
jest.setTimeout(10000);

describe("Get User DBA tests", function() {
  test("Get User DBA tests", function(done) {
    UserDBA.get(1)
      .then(sqlResult => {
        expect(sqlResult.error).toBeNull();
        expect(sqlResult.row).toEqual({
          userID: 1,
          userName: "directeur1",
          userEmail: "philippe.cuerrier@gmail.com",
          profileID: 1,
          profileDesc: "Directeur",
          userActive: 1
        });
        done();
      })
      .catch(error => {
        expect(error).toEqual(0);
        done();
      });
  });
});

describe("GetAll User DBA tests", function() {
  test("GetAll User DBA tests", function(done) {
    UserDBA.getAll()
      .then(sqlResult => {
        expect(sqlResult.error).toBeNull();
        expect(sqlResult.rows[0]).toEqual({
          userID: 1,
          userName: "directeur1",
          userEmail: "philippe.cuerrier@gmail.com",
          profileID: 1,
          profileDesc: "Directeur",
          userActive: 1
        });
        expect(sqlResult.rows[1]).toEqual({
          userID: 2,
          userName: "coordonateur1",
          userEmail: "philippe.cuerrier@gmail.com",
          profileID: 2,
          profileDesc: "Coordonnateur",
          userActive: 1
        });
        done();
      })
      .catch(error => {
        expect(error).toEqual(0);
        done();
      });
  });
});

describe("Find User DBA tests", function() {
  test("Find User DBA tests", function(done) {
    UserDBA.find("directeur1")
      .then(sqlResult => {
        expect(sqlResult.error).toBeNull();
        expect(sqlResult.row).toEqual({
          userID: 1,
          userName: "directeur1",
          userEmail: "philippe.cuerrier@gmail.com",
          profileID: 1,
          profileDesc: "Directeur",
          userActive: 1
        });
        done();
      })
      .catch(error => {
        expect(error).toEqual(0);
        done();
      });
  });
});

describe("GetSecure User DBA tests", function() {
  test("GetSecure User DBA tests", function(done) {
    UserDBA.getSecure("directeur1")
      .then(sqlResult => {
        expect(sqlResult.error).toBeNull();
        expect(sqlResult.row.userID).toEqual(1);
        expect(sqlResult.row.userName).toEqual("directeur1");
        expect(sqlResult.row.userEmail).toEqual("philippe.cuerrier@gmail.com");
        expect(sqlResult.row.profileID).toEqual(1);
        expect(sqlResult.row.userActive).toEqual(1);
        done();
      })
      .catch(error => {
        expect(error).toEqual(0);
        done();
      });
  });
});

describe("Create User DBA tests", function() {
  let newID;

  afterAll(done => UserDBA.remove(newID));

  test("Create User DBA tests", function(done) {
    UserDBA.create(
      "test_dba_create",
      "test",
      "philippe.cuerrier@gmail.com",
      2,
      false
    )
      .then(sqlResult => {
        expect(sqlResult.error).toBeNull();
        expect(sqlResult.rowID).toBeGreaterThan(0);
        UserDBA.find("test_dba_create")
          .then(sqlResult => {
            newID = sqlResult.row.userID;
            done();
          })
          .catch(error => {
            expect(error).toEqual(0);
            done();
          });
      })
      .catch(error => {
        expect(error).toEqual(0);
        done();
      });
  });
});

describe("Update User DBA tests", function() {
  let newID;

  beforeAll(done =>
    UserDBA.create(
      "test_dba_update",
      "test",
      "philippe.cuerrier@gmail.com",
      2,
      false
    ).then(sqlResult =>
      UserDBA.find("test_dba_update").then(sqlResult => {
        newID = sqlResult.row.userID;
        done();
      })
    )
  );

  afterAll(done => UserDBA.remove(newID));

  test("Update User DBA tests", function(done) {
    UserDBA.update(
      newID,
      "test_dba_update",
      "philippe.cuerrier@gmail.com",
      1,
      false
    )
      .then(sqlResult => {
        expect(sqlResult.error).toBeNull();
        expect(sqlResult.rowID).toEqual(newID);
        done();
      })
      .catch(error => {
        expect(error).toEqual(0);
        done();
      });
  });
});

describe("Remove User DBA tests", function() {
  let newID;

  beforeAll(done =>
    UserDBA.create(
      "test_dba_remove",
      "test",
      "philippe.cuerrier@gmail.com",
      2,
      false
    ).then(sqlResult =>
      UserDBA.find("test_dba_remove").then(sqlResult => {
        newID = sqlResult.row.userID;
        done();
      })
    )
  );

  test("Update User DBA tests", function(done) {
    UserDBA.remove(newID)
      .then(sqlResult => {
        expect(sqlResult.error).toBeNull();
        expect(sqlResult.id).toEqual(newID);
        done();
      })
      .catch(error => {
        expect(error).toEqual(0);
        done();
      });
  });
});
