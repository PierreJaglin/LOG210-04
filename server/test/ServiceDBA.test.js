const ServiceDBA = require("../src/dba/serviceDBA");

describe("Get Service DBA tests", function() {
  test("Get Service DBA tests", function(done) {
    ServiceDBA.get(1)
      .then(sqlResult => {
        expect(sqlResult.error).toBeNull();
        expect(sqlResult.row).toEqual({
          serviceID: 1,
          serviceName: "Ouverture de dossier",
          serviceDescription:
            "Une ouverture de dossier, peu importe le type de supervision",
          serviceActif: 1,
          servicePointID: 1,
          servicePointName: "ComptoirTest",
          historiqueTarificationServiceTarificationParent: 100,
          historiqueTarificationServiceTarificationSubventionee: 1,
          historiqueTarificationServiceTarificationCISSS: 0,
          dateEntreeVigueur: "2018-11-10"
        });
        done();
      })
      .catch(error => {
        expect(error).toEqual(0);
        done();
      });
  });
});

describe("GetAll Service DBA tests", function() {
  test("GetAll Service DBA tests", function(done) {
    ServiceDBA.getAll()
      .then(sqlResult => {
        expect(sqlResult.error).toBeNull();
        expect(sqlResult.rows[0]).toEqual({
          serviceID: 1,
          serviceName: "Ouverture de dossier",
          serviceDescription:
            "Une ouverture de dossier, peu importe le type de supervision",
          serviceActif: 1
        });
        expect(sqlResult.rows[1]).toEqual({
          serviceID: 2,
          serviceName: "Visite supervisiée",
          serviceDescription: null,
          serviceActif: 1
        });
        done();
      })
      .catch(error => {
        expect(error).toEqual(0);
        done();
      });
  });
});

describe("Find Service DBA tests", function() {
  test("Find Service DBA tests", function(done) {
    ServiceDBA.find("Ouverture de dossier")
      .then(sqlResult => {
        expect(sqlResult.error).toBeNull();
        expect(sqlResult.row).toEqual({
          serviceID: 1,
          serviceName: "Ouverture de dossier",
          serviceDescription:
            "Une ouverture de dossier, peu importe le type de supervision",
          serviceActif: 1
        });
        done();
      })
      .catch(error => {
        expect(error).toEqual(0);
        done();
      });
  });
});

describe("Create Service DBA tests", function() {
  let newID;

  afterAll(done => {
    ServiceDBA.remove(newID);
  });

  test("Create Service DBA tests", function(done) {
    ServiceDBA.create("test_dba_create", "Test_desc", false)
      .then(sqlResult => {
        expect(sqlResult.error).toBeNull();
        expect(sqlResult.rowID).toBeGreaterThan(0);
        ServiceDBA.find("test_dba_create")
          .then(sqlResult => {
            newID = sqlResult.row.serviceID;
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

describe("Update Service DBA tests", function() {
  let newID;

  beforeAll(done => {
    ServiceDBA.create("test_dba_update", "test", true).then(sqlResult =>
      ServiceDBA.find("test_dba_update").then(sqlResult => {
        newID = sqlResult.row.serviceID;
        done();
      })
    );
  });

  afterAll(done => {
    ServiceDBA.remove(newID);
    done();
  });

  test("Update Service DBA tests", function(done) {
    ServiceDBA.update(newID, "test_dba_update", "changed", false)
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

describe("Remove Service DBA tests", function() {
  let newID;

  beforeAll(done => {
    ServiceDBA.create("test_dba_remove", "test", true).then(sqlResult =>
      ServiceDBA.find("test_dba_remove").then(sqlResult => {
        newID = sqlResult.row.serviceID;
        done();
      })
    );
  });

  test("Remove Service DBA tests", function(done) {
    ServiceDBA.remove(newID)
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
