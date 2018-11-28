const AddressDBA = require("../src/dba/addressDBA");

describe("Find Address DBA tests", function() {
  test("Find Address DBA tests", function(done) {
    AddressDBA.find("H4T1G6")
      .then(sqlResult => {
        expect(sqlResult.error).toBeNull();
        expect(sqlResult.row).toEqual({
          addressID: 1,
          addressNumber: 8585,
          addressStreet: "Chemin de la Côte-de-Liesse",
          addressCity: "Saint-Laurent",
          addressProvince: "Quebec",
          addressPostalCode: "H4T1G6"
        });
        done();
      })
      .catch(error => {
        expect(1).toEqual(0);
        done();
      });
  });
});

describe("Create Address DBA tests", function() {
  afterAll(done => {
    AddressDBA.removeByPostalCode("J4R1T6");
    done();
  });

  test("Create Address DBA tests", function(done) {
    AddressDBA.create(100, "rue Leroyer", "Montreal", "Quebec", "J4R1T6")
      .then(sqlResult => {
        expect(sqlResult.error).toBeNull();
        expect(sqlResult.row).toBeGreaterThan(0);
        done();
      })
      .catch(error => {
        expect(1).toEqual(0);
        done();
      });
  });
});

describe("Remove Address DBA tests", function() {
  beforeAll(done => {
    AddressDBA.create(100, "rue Leroyer", "Montreal", "Quebec", "J4R1T5");
    done();
  });

  test("Remove Address DBA tests", function(done) {
    AddressDBA.removeByPostalCode("J4R1T5")
      .then(sqlResult => {
        expect(sqlResult.error).toBeNull();
        expect(sqlResult.postalCode).toEqual("J4R1T5");
        done();
      })
      .catch(error => {
        expect(1).toEqual(0);
        done();
      });
  });
});
