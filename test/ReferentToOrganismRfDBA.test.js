const ReferentToOrganismRfDBA = require("../src/dba/referentToOrganismRfDBA");

describe("Get ReferentToOrganismRf DBA tests", function() {
    test("Get ReferentToOrganismRf DBA tests", function() {
        ReferentToOrganismRfDBA.get(1)
            .then(sqlResult => {
                expect(sqlResult.error).toBeNull();
                expect(sqlResult.row).toEqual({
                    referentToOrganismRfID: 1,
                    referentID: 1,
                    organismReferentID: 1
                });
            })
            .catch(error => expect(error).toEqual(0));
    });
});

describe("GetAll ReferentToOrganismRf DBA tests", function() {
    test("GetAll ReferentToOrganismRf DBA tests", function() {
        ReferentToOrganismRfDBA.getAll()
            .then(sqlResult => {
                expect(sqlResult.error).toBeNull();
                expect(sqlResult.rows[0]).toEqual({
                    referentToOrganismRfID: 1,
                    referentID: 1,
                    organismReferentID: 1
                });
                expect(sqlResult.rows[1]).toEqual({
                    referentToOrganismRfID: 2,
                    referentID: 2,
                    organismReferentID: 2
                });
            })
            .catch(error => expect(error).toEqual(0));
    });
});

describe("FindByReferent ReferentToOrganismRf DBA tests", function() {
    test("FindByReferent ReferentToOrganismRf DBA tests", function() {
        ReferentToOrganismRfDBA.findByReferent(1)
            .then(sqlResult => {
                expect(sqlResult.error).toBeNull();
                expect(sqlResult.rows[0]).toEqual({
                    referentToOrganismRfID: 1,
                    referentID: 1,
                    organismReferentID: 1
                });
            })
            .catch(error => expect(error).toEqual(0));
    });
});
describe("FindByOrganismReferent ReferentToOrganismRf DBA tests", function() {
    test("FindByOrganismReferent ReferentToOrganismRf DBA tests", function() {
        ReferentToOrganismRfDBA.findByOrganismReferent(1)
            .then(sqlResult => {
                expect(sqlResult.error).toBeNull();
                expect(sqlResult.rows[0]).toEqual({
                    referentToOrganismRfID: 1,
                    referentID: 1,
                    organismReferentID: 1
                });
            })
            .catch(error => expect(error).toEqual(0));
    });
});

describe("Create ReferentToOrganismRf DBA tests", function() {
    afterAll(() => ReferentToOrganismRfDBA.removeFromReferent(99));

    test("Create ReferentToOrganismRf DBA tests", function() {
        ReferentToOrganismRfDBA.create(99, 99)
            .then(sqlResult => {
                expect(sqlResult.error).toBeNull();
                expect(sqlResult.rowID).toBeGreaterThan(0);
            })
            .catch(error => expect(error).toEqual(0));
    });
});

describe("Update ReferentToOrganismRf DBA tests", function() {
    let newID;
    beforeAll(() =>
        ReferentToOrganismRfDBA.create(98, 98).then(sqlResult =>
            ReferentToOrganismRfDBA.findByReferent(98).then(
                sqlResult => (newID = sqlResult.row.referentToOrganismRfID)
            )
        )
    );

    afterAll(() => ReferentToOrganismRfDBA.removeFromReferent(98));

    test("Update Service Line DBA tests", function() {
        ReferentToOrganismRfDBA.update(newID, 98, 98)
            .then(sqlResult => {
                expect(sqlResult.error).toBeNull();
                expect(sqlResult.rowID).toEqual(newID);
            })
            .catch(error => expect(error).toEqual(0));
    });
});

describe("Remove ReferentToOrganismRf DBA tests", function() {
    let newID;

    beforeAll(() =>
        ReferentToOrganismRfDBA.create(97, 97).then(sqlResult =>
            ReferentToOrganismRfDBA.findByReferent(97).then(
                sqlResult => (newID = sqlResult.row.referentToOrganismRfID)
            )
        )
    );

    test("Remove Service Line DBA tests", function() {
        ReferentToOrganismRfDBA.remove(newID)
            .then(sqlResult => {
                expect(sqlResult.error).toBeNull();
                expect(sqlResult.id).toEqual(newID);
            })
            .catch(error => expect(error).toEqual(0));
    });
});

describe("RemoveFromReferent ReferentToOrganismRf DBA tests", function() {
    beforeAll(() => ReferentToOrganismRfDBA.create(96, 96));

    test("RemoveFromService Service Line DBA tests", function() {
        ReferentToOrganismRfDBA.removeFromReferent(96)
            .then(sqlResult => {
                expect(sqlResult.error).toBeNull();
                expect(sqlResult.id).toBeGreaterThan(0);
            })
            .catch(error => expect(error).toEqual(0));
    });
});

