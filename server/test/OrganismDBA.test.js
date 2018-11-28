const OrganismDBA = require("../src/dba/organismDBA");

jest.setTimeout(10000);
describe("Get Organism DBA tests", function() {
  test("Get Organism DBA tests", function(done) {
    OrganismDBA.get(1)
      .then(sqlResult => {
        expect(sqlResult.error).toBeNull();
        expect(sqlResult.row).toEqual({
          organismID: 1,
          organismName: "CAE Inc.",
          addressNumber: 8585,
          addressStreet: "Chemin de la Côte-de-Liesse",
          addressCity: "Saint-Laurent",
          addressProvince: "Quebec",
          addressPostalCode: "H4T1G6",
          organismPhone: "514-341-6780",
          organismFax: null,
          organismEmail: null,
          organismActive: 1
        });
        done();
      })
      .catch(error => {
        expect(1).toEqual(0);
        done();
      });
  });
});

describe("GetAll Organism DBA tests", function() {
  test("GetAll Organism DBA tests", function(done) {
    OrganismDBA.getAll()
      .then(sqlResult => {
        expect(sqlResult.error).toBeNull();
        expect(sqlResult.rows[0]).toEqual({
          organismID: 1,
          organismName: "CAE Inc.",
          addressNumber: 8585,
          addressStreet: "Chemin de la Côte-de-Liesse",
          addressCity: "Saint-Laurent",
          addressProvince: "Quebec",
          addressPostalCode: "H4T1G6",
          organismPhone: "514-341-6780",
          organismFax: null,
          organismEmail: null,
          organismActive: 1
        });
        expect(sqlResult.rows[1]).toEqual({
          organismID: 2,
          organismName: "ETS",
          addressNumber: 1100,
          addressStreet: "Rue Notre-Dame Ouest",
          addressCity: "Montreal",
          addressProvince: "Quebec",
          addressPostalCode: "H3C1K3",
          organismPhone: "514-396-8800",
          organismFax: null,
          organismEmail: null,
          organismActive: 1
        });
        done();
      })
      .catch(error => {
        expect(1).toEqual(0);
        done();
      });
  });
});

describe("Find Organism DBA tests", function() {
  test("Find Organism DBA tests", function(done) {
    OrganismDBA.find("CAE Inc.")
      .then(sqlResult => {
        expect(sqlResult.error).toBeNull();
        expect(sqlResult.row).toEqual({
          organismID: 1,
          organismName: "CAE Inc.",
          addressNumber: 8585,
          addressStreet: "Chemin de la Côte-de-Liesse",
          addressCity: "Saint-Laurent",
          addressProvince: "Quebec",
          addressPostalCode: "H4T1G6",
          organismPhone: "514-341-6780",
          organismFax: null,
          organismEmail: null,
          organismActive: 1
        });
        done();
      })
      .catch(error => {
        expect(1).toEqual(0);
        done();
      });
  });
});

describe("Create Organism DBA tests", function() {
  afterAll(done => {
    OrganismDBA.find("test_dba_create").then(sqlResult => {
      OrganismDBA.remove(sqlResult.row.organismID);
      done();
    });
  });

  test("Create Organism DBA tests", function(done) {
    OrganismDBA.create(
      "test_dba_create",
      1,
      undefined,
      undefined,
      undefined,
      false
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

describe("Update Organism DBA tests", function() {
  let newID;

  beforeAll(done => {
    OrganismDBA.create(
      "test_dba_update",
      1,
      undefined,
      undefined,
      undefined,
      false
    ).then(sqlResult => {
      OrganismDBA.find("test_dba_update").then(sqlResult => {
        newID = sqlResult.row.organismID;
        done();
      });
    });
  });

  afterAll(done => {
    OrganismDBA.find("test_dba_update").then(sqlResult => {
      OrganismDBA.remove(sqlResult.row.organismID);
      done();
    });
  });

  test("Update Organism DBA tests", function(done) {
    OrganismDBA.update(
      newID,
      "test_dba_update",
      1,
      undefined,
      undefined,
      undefined,
      true
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

describe("Remove Organism DBA tests", function() {
  let newID;

  beforeAll(done => {
    OrganismDBA.create(
      "test_dba_remove",
      1,
      undefined,
      undefined,
      undefined,
      false
    ).then(sqlResult => {
      OrganismDBA.find("test_dba_remove").then(sqlResult => {
        newID = sqlResult.row.organismID;
        done();
      });
    });
  });

  test("Remove Organism DBA tests", function(done) {
    OrganismDBA.remove(newID)
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
