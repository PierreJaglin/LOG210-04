const ServicePointDBA = require("../src/dba/servicePointDBA");

describe("Get Service Point DBA tests", function() {
  test("Get Service Point DBA tests", function(done) {
    ServicePointDBA.get(1)
      .then(sqlResult => {
        expect(sqlResult.error).toBeNull();
        expect(sqlResult.row).toEqual({
          servicePointID: 1,
          servicePointName: "ComptoirTest",
          addressNumber: 8585,
          addressStreet: "Chemin de la Côte-de-Liesse",
          addressCity: "Saint-Laurent",
          addressProvince: "Quebec",
          addressPostalCode: "H4T1G6",
          servicePointPhone: null,
          servicePointFax: null,
          servicePointEmail: null,
          servicePointActive: 1,
          organismID: 1,
          organismName: "CAE Inc."
        });
        done();
      })
      .catch(error => {
        expect(error).toEqual(0);
        done();
      });
  });
});

describe("GetAll Service Point DBA tests", function() {
  test("GetAll Service Point DBA tests", function(done) {
    ServicePointDBA.getAll()
      .then(sqlResult => {
        expect(sqlResult.error).toBeNull();
        expect(sqlResult.rows[0]).toEqual({
          servicePointID: 1,
          servicePointName: "ComptoirTest",
          addressNumber: 8585,
          addressStreet: "Chemin de la Côte-de-Liesse",
          addressCity: "Saint-Laurent",
          addressProvince: "Quebec",
          addressPostalCode: "H4T1G6",
          servicePointPhone: null,
          servicePointFax: null,
          servicePointEmail: null,
          servicePointActive: 1,
          organismID: 1,
          organismName: "CAE Inc."
        });
        expect(sqlResult.rows[1]).toEqual({
          servicePointID: 2,
          servicePointName: "Test2",
          addressNumber: 1100,
          addressStreet: "Rue Notre-Dame Ouest",
          addressCity: "Montreal",
          addressProvince: "Quebec",
          addressPostalCode: "H3C1K3",
          servicePointPhone: null,
          servicePointFax: null,
          servicePointEmail: null,
          servicePointActive: 1,
          organismID: 2,
          organismName: "ETS"
        });
        done();
      })
      .catch(error => {
        expect(error).toEqual(0);
        done();
      });
  });
});

describe("Find Service Point DBA tests", function() {
  test("Find Service Point DBA tests", function(done) {
    ServicePointDBA.find("ComptoirTest")
      .then(sqlResult => {
        expect(sqlResult.error).toBeNull();
        expect(sqlResult.row).toEqual({
          servicePointID: 1,
          servicePointName: "ComptoirTest",
          addressNumber: 8585,
          addressStreet: "Chemin de la Côte-de-Liesse",
          addressCity: "Saint-Laurent",
          addressProvince: "Quebec",
          addressPostalCode: "H4T1G6",
          servicePointPhone: null,
          servicePointFax: null,
          servicePointEmail: null,
          servicePointActive: 1,
          organismID: 1,
          organismName: "CAE Inc."
        });
        done();
      })
      .catch(error => {
        expect(error).toEqual(0);
        done();
      });
  });
});

describe("Create Service Point DBA tests", function() {
  let newID;

  afterAll(() => {
    ServicePointDBA.remove(newID);
  });

  test("Create Service Point DBA tests", function(done) {
    ServicePointDBA.create("test_dba_create", 1, null, null, null, 0, 1)
      .then(sqlResult => {
        expect(sqlResult.error).toBeNull();
        expect(sqlResult.rowID).toBeGreaterThan(0);
        ServicePointDBA.find("test_dba_create")
          .then(sqlResult => {
            newID = sqlResult.row.servicePointID;
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

describe("Update Service Point DBA tests", function() {
  let newID;

  beforeAll(done =>
    ServicePointDBA.create("test_dba_update", 1, null, null, null, 0, 1).then(
      sqlResult =>
        ServicePointDBA.find("test_dba_update").then(sqlResult => {
          newID = sqlResult.row.servicePointID;
          done();
        })
    )
  );

  afterAll(() => ServicePointDBA.remove(newID));

  test("Create Service Point DBA tests", function(done) {
    ServicePointDBA.update(newID, "test_dba_create", 1, null, null, null, 0, 1)
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

describe("Remove Service Point DBA tests", function() {
  let newID;

  beforeAll(done =>
    ServicePointDBA.create("test_dba_remove", 1, null, null, null, 0, 1).then(
      sqlResult =>
        ServicePointDBA.find("test_dba_remove").then(sqlResult => {
          newID = sqlResult.row.servicePointID;
          done();
        })
    )
  );

  test("Remove Service Point DBA tests", function(done) {
    ServicePointDBA.remove(newID)
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
