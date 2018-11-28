const ReferentDBA = require("../src/dba/referentDBA");

describe("Get Referent DBA tests", function () {
    test("Get Referent DBA tests", function (done) {
       ReferentDBA.get(1)
           .then(sqlResult => {
               expect(sqlResult.error).toBeNull();
               expect(sqlResult.row).toEqual({
                  referentID: 1,
                  referentLastName: "TestLastName",
                  referentFirstName : "TestFirstName",
                  referentTitle : "TestTitle",
                  referentPhone : null,
                  referentOfficePhone : null,
                  referentFax : null,
                  referentEmail : "test@testemail.com",
                  referentPrefFax : 1,
                  referentPrefEmail : 1,
                  referentPrefPaper : 1
               });
               done();
           })
           .catch(error => {
               expect(1).toEqual(0);
               done();
           });
    });
});

describe("GetAll Referent DBA tests", function () {
    test("GetAll Referent DBA tests", function (done) {
        ReferentDBA.getAll()
            .then(sqlResult => {
                expect(sqlResult.error).toBeNull();
                expect(sqlResult.rows[0]).toEqual({
                    referentID: 1,
                    referentLastName: "TestLastName",
                    referentFirstName : "TestFirstName",
                    referentTitle : "TestTitle",
                    referentPhone : null,
                    referentOfficePhone : null,
                    referentFax : null,
                    referentEmail : "test@testemail.com",
                    referentPrefFax : 1,
                    referentPrefEmail : 1,
                    referentPrefPaper : 1
                });
                expect(sqlResult.rows[1]).toEqual({
                    referentID: 2,
                    referentLastName: "Test",
                    referentFirstName : "Test",
                    referentTitle : "Test",
                    referentPhone : "514-396-8800",
                    referentOfficePhone : "514-396-8800",
                    referentFax : "514-396-8800",
                    referentEmail : "test@test.test",
                    referentPrefFax : 0,
                    referentPrefEmail : 0,
                    referentPrefPaper : 0
                });
                done();
            })
            .catch(error => {
                expect(1).toEqual(0);
                done();
            });
    });
});

describe("FindByEmail Referent DBA tests", function() {
    test("FindByEmail Referent DBA tests", function(done) {
        ReferentDBA.findByEmail("test@testemail.com")
            .then(sqlResult => {
                expect(sqlResult.error).toBeNull();
                expect(sqlResult.row).toEqual({
                    referentID: 1,
                    referentLastName: "TestLastName",
                    referentFirstName : "TestFirstName",
                    referentTitle : "TestTitle",
                    referentPhone : null,
                    referentOfficePhone : null,
                    referentFax : null,
                    referentEmail : "test@testemail.com",
                    referentPrefFax : 1,
                    referentPrefEmail : 1,
                    referentPrefPaper : 1
                });
                done();
            })
            .catch(error => {
                expect(1).toEqual(0);
                done();
            });
    });
});


describe("Create Referent DBA tests", function () {
   afterAll(done => {
       ReferentDBA.findByEmail("testCreate@test.test").then(sqlResult => {
           ReferentDBA.remove(sqlResult.row.referentID);
           done();
       });
   });

   test("Create Referent DBA tests", function (done) {
       ReferentDBA.create(
           "lastName",
           "firstName",
           "title",
           undefined,
           undefined,
           undefined,
           "testCreate@test.test",
           true,
           false,
           true
       )
           .then(sqlResult => {
               expect(sqlResult.error).toBeNull();
               expect(sqlResult.rowID).toBeGreaterThan(0);
               done();
           })
           .catch(error => {
               expect(1).toEqual(0);
               done();
           });
   });
});

describe("Update Referent DBA tests", function () {
    let newID;

    beforeAll(done => {
        ReferentDBA.create(
            "lastName",
            "firstName",
            "title",
            undefined,
            undefined,
            undefined,
            "testUpdate@test.test",
            true,
            false,
            true
        ).then(sqlResult => {
            ReferentDBA.findByEmail("testUpdate@test.test").then(sqlResult => {
                newID = sqlResult.row.referentID;
                done();
            });
        });
    });

    afterAll(done => {
        ReferentDBA.findByEmail("testUpdate@test.test").then(sqlResult => {
            ReferentDBA.remove(sqlResult.row.referentID);
            done();
        });
    });

    test("Update Referent DBA tests", function (done) {
        ReferentDBA.update(
            newID,
            "lastNameChange",
            "firstNameChange",
            "titleChange",
            undefined,
            undefined,
            undefined,
            "testUpdate@test.test",
            false,
            true,
            false
        )
            .then(sqlResult => {
                expect(sqlResult.error).toBeNull();
                expect(sqlResult.rowID).toEqual(newID);
                done();
            })
            .catch(error => {
                expect(1).toEqual(0);
                done();
            });
    });
});

describe("Remove Referent DBA test", function () {
    let newID;

    beforeAll(done => {
        ReferentDBA.create(
            "lastName",
            "firstName",
            "title",
            undefined,
            undefined,
            undefined,
            "testRemove@test.test",
            true,
            false,
            true
        ).then(sqlResult => {
            ReferentDBA.findByEmail("testRemove@test.test").then(sqlResult => {
                newID = sqlResult.row.referentID;
                done();
            });
        });
    });

    test("Remove Referent DBA test", function (done) {
        ReferentDBA.remove(newID)
            .then(sqlResult => {
                expect(sqlResult.error).toBeNull();
                expect(sqlResult.id).toEqual(newID);
                done();
            })
            .catch(error => {
                expect(1).toEqual(0);
                done();
            });
    });
});