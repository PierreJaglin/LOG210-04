const ServiceLineDBA = require("../src/dba/serviceLineDBA");

describe("Get Service Line DBA tests", function() {
  test("Get Service Line DBA tests", function() {
    ServiceLineDBA.get(1)
      .then(sqlResult => {
        expect(sqlResult.error).toBeNull();
        expect(sqlResult.row).toEqual({
          serviceLineID: 1,
          servicePointID: 1,
          serviceID: 1
        });
      })
      .catch(error => expect(error).toEqual(0));
  });
});

describe("GetAll Service Line DBA tests", function() {
  test("GetAll Service Line DBA tests", function() {
    ServiceLineDBA.getAll()
      .then(sqlResult => {
        expect(sqlResult.error).toBeNull();
        expect(sqlResult.rows[0]).toEqual({
          serviceLineID: 1,
          servicePointID: 1,
          serviceID: 1
        });
        expect(sqlResult.rows[1]).toEqual({
          serviceLineID: 2,
          servicePointID: 1,
          serviceID: 2
        });
      })
      .catch(error => expect(error).toEqual(0));
  });
});

describe("FindByService Service Line DBA tests", function() {
  test("FindByService Service Line DBA tests", function() {
    ServiceLineDBA.findByService(1)
      .then(sqlResult => {
        expect(sqlResult.error).toBeNull();
        expect(sqlResult.rows[0]).toEqual({
          serviceLineID: 1,
          servicePointID: 1,
          serviceID: 1
        });
      })
      .catch(error => expect(error).toEqual(0));
  });
});

describe("FindByServicePoint Service Line DBA tests", function() {
  test("FindByServicePoint Service Line DBA tests", function() {
    ServiceLineDBA.findByServicePoint(1)
      .then(sqlResult => {
        expect(sqlResult.error).toBeNull();
        expect(sqlResult.rows[0]).toEqual({
          serviceLineID: 1,
          servicePointID: 1,
          serviceID: 1
        });
      })
      .catch(error => expect(error).toEqual(0));
  });
});

describe("Create Service Line DBA tests", function() {
  afterAll(() => ServiceLineDBA.removeFromService(99));

  test("Create Service Line DBA tests", function() {
    ServiceLineDBA.create(99, 99)
      .then(sqlResult => {
        expect(sqlResult.error).toBeNull();
        expect(sqlResult.rowID).toBeGreaterThan(0);
      })
      .catch(error => expect(error).toEqual(0));
  });
});

describe("Update Service Line DBA tests", function() {
  let newID;
  beforeAll(() =>
    ServiceLineDBA.create(98, 98).then(sqlResult =>
      ServiceLineDBA.findByService(98).then(
        sqlResult => (newID = sqlResult.row.serviceLineID)
      )
    )
  );

  afterAll(() => ServiceLineDBA.removeFromService(98));

  test("Update Service Line DBA tests", function() {
    ServiceLineDBA.update(newID, 98, 98)
      .then(sqlResult => {
        expect(sqlResult.error).toBeNull();
        expect(sqlResult.rowID).toEqual(newID);
      })
      .catch(error => expect(error).toEqual(0));
  });
});

describe("Remove Service Line DBA tests", function() {
  let newID;

  beforeAll(() =>
    ServiceLineDBA.create(97, 97).then(sqlResult =>
      ServiceLineDBA.findByService(97).then(
        sqlResult => (newID = sqlResult.row.serviceLineID)
      )
    )
  );

  test("Remove Service Line DBA tests", function() {
    ServiceLineDBA.remove(newID)
      .then(sqlResult => {
        expect(sqlResult.error).toBeNull();
        expect(sqlResult.id).toEqual(newID);
      })
      .catch(error => expect(error).toEqual(0));
  });
});

describe("RemoveFromService Service Line DBA tests", function() {
  beforeAll(() => ServiceLineDBA.create(96, 96));

  test("RemoveFromService Service Line DBA tests", function() {
    ServiceLineDBA.removeFromService(96)
      .then(sqlResult => {
        expect(sqlResult.error).toBeNull();
        expect(sqlResult.id).toBeGreaterThan(0);
      })
      .catch(error => expect(error).toEqual(0));
  });
});
