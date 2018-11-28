const OrganismReferentDBA = require("../src/dba/organismReferentDBA");

describe("Get OrganismReferent DBA tests", function() {
  test("Get OrganismReferent DBA tests", function(done) {
    OrganismReferentDBA.get(1)
      .then(sqlResult => {
        expect(sqlResult.error).toBeNull();
        expect(sqlResult.row).toEqual({
          organismReferentID: 1,
          organismReferentName: "ETSTest",
          addressNumber: 8585,
          addressStreet: "Chemin de la Côte-de-Liesse",
          addressCity: "Saint-Laurent",
          addressProvince: "Quebec",
          addressPostalCode: "H4T1G6",
          organismReferentPhone: "514-341-6780",
          organismReferentFax: "514-341-6780",
          organismReferentEmail: null,
          organismReferentWebSite: null,
          organismReferentActive: 1,
          organismID: 1,
          organismName: "CAE Inc."
        });
        done();
      })
      .catch(error => {
        expect(1).toEqual(0);
        done();
      });
  });
});

describe("GetAll OrganismReferent DBA tests", function() {
  test("GetAll OrganismReferent DBA tests", function(done) {
    OrganismReferentDBA.getAll()
      .then(sqlResult => {
        expect(sqlResult.error).toBeNull();
        expect(sqlResult.rows[0]).toEqual({
          organismReferentID: 1,
          organismReferentName: "ETSTest",
          addressNumber: 8585,
          addressStreet: "Chemin de la Côte-de-Liesse",
          addressCity: "Saint-Laurent",
          addressProvince: "Quebec",
          addressPostalCode: "H4T1G6",
          organismReferentPhone: "514-341-6780",
          organismReferentFax: "514-341-6780",
          organismReferentEmail: null,
          organismReferentWebSite: null,
          organismReferentActive: 1,
          organismID: 1,
          organismName: "CAE Inc."
        });
        expect(sqlResult.rows[1]).toEqual({
          organismReferentID: 2,
          organismReferentName: "Test",
          addressNumber: 8585,
          addressStreet: "Chemin de la Côte-de-Liesse",
          addressCity: "Saint-Laurent",
          addressProvince: "Quebec",
          addressPostalCode: "H4T1G6",
          organismReferentPhone: null,
          organismReferentFax: null,
          organismReferentEmail: null,
          organismReferentWebSite: null,
          organismReferentActive: 1,
          organismID: 2,
          organismName: "ETS"
        });
        done();
      })
      .catch(error => {
        expect(1).toEqual(0);
        done();
      });
  });
});

describe("GetAllByOrganism OrganismReferent DBA tests", function() {
  test("GetAllByOrganism OrganismReferent DBA tests", function(done) {
    OrganismReferentDBA.getAllByOrganism(1)
      .then(sqlResult => {
        expect(sqlResult.error).toBeNull();
        expect(sqlResult.rows[0]).toEqual({
          organismReferentID: 1,
          organismReferentName: "ETSTest",
          addressNumber: 8585,
          addressStreet: "Chemin de la Côte-de-Liesse",
          addressCity: "Saint-Laurent",
          addressProvince: "Quebec",
          addressPostalCode: "H4T1G6",
          organismReferentPhone: "514-341-6780",
          organismReferentFax: "514-341-6780",
          organismReferentEmail: null,
          organismReferentWebSite: null,
          organismReferentActive: 1,
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

describe("Find OrganismReferent DBA tests", function() {
  test("Find OrganismReferent DBA tests", function(done) {
    OrganismReferentDBA.find("ETSTest")
      .then(sqlResult => {
        expect(sqlResult.error).toBeNull();
        expect(sqlResult.row).toEqual({
          organismReferentID: 1,
          organismReferentName: "ETSTest",
          addressNumber: 8585,
          addressStreet: "Chemin de la Côte-de-Liesse",
          addressCity: "Saint-Laurent",
          addressProvince: "Quebec",
          addressPostalCode: "H4T1G6",
          organismReferentPhone: "514-341-6780",
          organismReferentFax: "514-341-6780",
          organismReferentEmail: null,
          organismReferentWebSite: null,
          organismReferentActive: 1,
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

describe("Create OrganismReferent DBA tests", function() {
  afterAll(done => {
    OrganismReferentDBA.find("test_dba_create").then(sqlResult => {
      OrganismReferentDBA.remove(sqlResult.row.organismReferentID);
      done();
    });
  });

  test("Create OrganismReferent DBA tests", function(done) {
    OrganismReferentDBA.create(
      "test_dba_create",
      1,
      undefined,
      undefined,
      undefined,
      undefined,
      false,
      1
    )
      .then(sqlResult => {
        expect(sqlResult.error).toBeNull();
        expect(sqlResult.rowID).toBeGreaterThan(0);
        done();
      })
      .catch(error => {
        expect(error).toEqual(0);
        done();
      });
  });
});

describe("Update OrganismReferent DBA tests", function() {
  let newID;

  beforeAll(done => {
    OrganismReferentDBA.create(
      "test_dba_update",
      1,
      undefined,
      undefined,
      undefined,
      undefined,
      false,
      1
    ).then(sqlResult => {
      OrganismReferentDBA.find("test_dba_update").then(sqlResult => {
        newID = sqlResult.row.organismReferentID;
        done();
      });
    });
  });

  afterAll(done => {
    OrganismReferentDBA.remove(newID);
    done();
  });

  test("Update OrganismReferent DBA tests", function(done) {
    OrganismReferentDBA.update(
      newID,
      "test_dba_update",
      1,
      undefined,
      undefined,
      undefined,
      undefined,
      true,
      2
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

describe("Remove OrganismReferent DBA tests", function() {
  let newID;

  beforeAll(done => {
    OrganismReferentDBA.create(
      "test_dba_remove",
      1,
      undefined,
      undefined,
      undefined,
      undefined,
      false,
      1
    ).then(sqlResult => {
      OrganismReferentDBA.find("test_dba_remove").then(sqlResult => {
        newID = sqlResult.row.organismReferentID;
        done();
      });
    });
  });

  test("Remove OrganismReferent DBA tests", function(done) {
    OrganismReferentDBA.remove(newID)
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
