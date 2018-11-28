const HistoriqueTarificationServiceDBA = require("../src/dba/historiqueTarificationServiceDBA");

describe("Get HistoriqueTarificationService DBA tests", function() {
  test("Get HistoriqueTarificationService DBA tests", function(done) {
    HistoriqueTarificationServiceDBA.get(1)
      .then(sqlResult => {
        expect(sqlResult.error).toBeNull();
        expect(sqlResult.row).toEqual({
          historiqueTarificationServiceID: 1,
          historiqueTarificationServiceTarificationParent: 20,
          historiqueTarificationServiceTarificationSubventionee: 1,
          historiqueTarificationServiceTarificationCISSS: 20,
          serviceID: 1,
          historiqueTarificationServiceDateEntreeVigueur: "2018-11-09"
        });
        done();
      })
      .catch(error => {
        expect(1).toEqual(0);
        done();
      });
  });
});

describe("GetAll HistoriqueTarificationService DBA tests", function() {
  test("GetAll HistoriqueTarificationService DBA tests", function(done) {
    HistoriqueTarificationServiceDBA.getAll()
      .then(sqlResult => {
        expect(sqlResult.error).toBeNull();
        expect(
          sqlResult.rows[0].historiqueTarificationServiceDateEntreeVigueur
        ).toEqual("2018-11-10");
        done();
      })
      .catch(error => {
        expect(error).toEqual(0);
        done();
      });
  });
});

describe("Find HistoriqueTarificationService DBA tests", function() {
  test("Find HistoriqueTarificationService DBA tests", function(done) {
    HistoriqueTarificationServiceDBA.find(1)
      .then(sqlResult => {
        expect(sqlResult.error).toBeNull();
        expect(sqlResult.row).toEqual({
          historiqueTarificationServiceID: 1,
          historiqueTarificationServiceTarificationParent: 20,
          historiqueTarificationServiceTarificationSubventionee: 1,
          historiqueTarificationServiceTarificationCISSS: 20,
          serviceID: 1,
          historiqueTarificationServiceDateEntreeVigueur: "2018-11-09"
        });
        done();
      })
      .catch(error => {
        expect(1).toEqual(0);
        done();
      });
  });
});

describe("Create HistoriqueTarificationService DBA tests", function() {
  afterAll(done => {
    HistoriqueTarificationServiceDBA.removeFromService(99)
      .then(sqlResult => done())
      .catch(error => done());
  });

  test("Create HistoriqueTarificationService DBA tests", function(done) {
    HistoriqueTarificationServiceDBA.create(99, 999, false, 999, "2018-01-01")
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

describe("Update HistoriqueTarificationService DBA tests", function() {
  beforeAll(done => {
    HistoriqueTarificationServiceDBA.create(98, 999, false, 999, "2018-01-01");
    done();
  });

  afterAll(done => {
    HistoriqueTarificationServiceDBA.removeFromService(98)
      .then(sqlResult => done())
      .catch(error => done());
  });

  test("Update HistoriqueTarificationService DBA tests", function(done) {
    HistoriqueTarificationServiceDBA.update(98, 999, false, 999, "2018-01-01")
      .then(sqlResult => {
        expect(sqlResult.error).toBeNull();
        expect(sqlResult.rowID).toEqual(98);
        done();
      })
      .catch(error => {
        expect(1).toEqual(0);
        done();
      });
  });
});

describe("RemoveFromService HistoriqueTarificationService DBA tests", function() {
  beforeAll(done => {
    HistoriqueTarificationServiceDBA.create(97, 999, false, 999, "2018-01-01");
    done();
  });

  test("RemoveFromService HistoriqueTarificationService DBA tests", function(done) {
    HistoriqueTarificationServiceDBA.removeFromService(97)
      .then(sqlResult => {
        expect(sqlResult.error).toBeNull();
        expect(sqlResult.id).toEqual(97);
        done();
      })
      .catch(error => {
        expect(1).toEqual(0);
        done();
      });
  });
});
