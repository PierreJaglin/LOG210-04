const ReferentToOrganismRfModel = require("../src/models/referentToOrganismRfModel");

describe("Get ReferentToOrganismRf Model tests", function() {
    test("Get ReferentToOrganismRf Model tests - Model fails", function(done) {
        let model = new ReferentToOrganismRfModel();

        model.DBA_get = jest.fn(
            id =>
                new Promise(function(resolve, reject) {
                    return resolve({
                        error: "Get query fails.",
                        row: null
                    });
                })
        );

        model
            .get(1)
            .then(row => {
                expect(1).toEqual(0);
                done();
            })
            .catch(error => {
                expect(error).toEqual("Get query fails.");
                done();
            });
    });

    test("Get ReferentToOrganismRf Model tests - Model Success", function(done) {
        let model = new ReferentToOrganismRfModel();

        model.DBA_get = jest.fn(
            id =>
                new Promise(function(resolve, reject) {
                    return resolve({
                        error: null,
                        row: id
                    });
                })
        );

        model
            .get(1)
            .then(row => {
                expect(row).toEqual(1);
                done();
            })
            .catch(error => {
                expect(error).toEqual(0);
                done();
            });
    });
});

describe("GetAll ReferentToOrganismRf Model tests", function() {
    test("GetAll ReferentToOrganismRf Model tests - Model fails", function(done) {
        let model = new ReferentToOrganismRfModel();

        model.DBA_getAll = jest.fn(
            () =>
                new Promise(function(resolve, reject) {
                    return resolve({
                        error: "GetAll query fails.",
                        rows: null
                    });
                })
        );

        model
            .getAll()
            .then(rows => {
                expect(1).toEqual(0);
                done();
            })
            .catch(error => {
                expect(error).toEqual("GetAll query fails.");
                done();
            });
    });

    test("GetAll ReferentToOrganismRf Model tests - Model Success", function(done) {
        let model = new ReferentToOrganismRfModel();

        model.DBA_getAll = jest.fn(
            () =>
                new Promise(function(resolve, reject) {
                    return resolve({
                        error: null,
                        rows: [1, 2]
                    });
                })
        );

        model
            .getAll()
            .then(rows => {
                expect(rows).toEqual([1, 2]);
                done();
            })
            .catch(error => {
                expect(error).toEqual(0);
                done();
            });
    });
});

describe("FindByReferent ReferentToOrganismRf Model tests", function() {
    test("FindByReferent ReferentToOrganismRf Model tests - Model fails", function(done) {
        let model = new ReferentToOrganismRfModel();

        model.DBA_findByReferent = jest.fn(
            id =>
                new Promise(function(resolve, reject) {
                    return resolve({
                        error: "Find query fails.",
                        row: id
                    });
                })
        );

        model
            .findByReferent(1)
            .then(row => {
                expect(1).toEqual(0);
                done();
            })
            .catch(error => {
                expect(error).toEqual("Find query fails.");
                done();
            });
    });

    test("FindByReferent ReferentToOrganismRf Model tests - Model Success", function(done) {
        let model = new ReferentToOrganismRfModel();

        model.DBA_findByReferent = jest.fn(
            id =>
                new Promise(function(resolve, reject) {
                    return resolve({
                        error: null,
                        row: id
                    });
                })
        );

        model
            .findByReferent(1)
            .then(row => {
                expect(row).toEqual(1);
                done();
            })
            .catch(error => {
                expect(error).toEqual(0);
                done();
            });
    });
});

describe("FindByOrganismReferent ReferentToOrganismRf Model tests", function() {
    test("FindByOrganismReferent ReferentToOrganismRf Model tests - Model fails", function(done) {
        let model = new ReferentToOrganismRfModel();

        model.DBA_findByOrganismReferent = jest.fn(
            id =>
                new Promise(function(resolve, reject) {
                    return resolve({
                        error: "Find query fails.",
                        row: id
                    });
                })
        );

        model
            .findByOrganismReferent(1)
            .then(row => {
                expect(1).toEqual(0);
                done();
            })
            .catch(error => {
                expect(error).toEqual("Find query fails.");
                done();
            });
    });

    test("FindByOrganismReferent ReferentToOrganismRf Model tests - Model Success", function(done) {
        let model = new ReferentToOrganismRfModel();

        model.DBA_findByOrganismReferent = jest.fn(
            id =>
                new Promise(function(resolve, reject) {
                    return resolve({
                        error: null,
                        row: id
                    });
                })
        );

        model
            .findByOrganismReferent(1)
            .then(row => {
                expect(row).toEqual(1);
                done();
            })
            .catch(error => {
                expect(error).toEqual(0);
                done();
            });
    });
});

describe("Create ReferentToOrganismRf Model tests", function() {
    test("Create ReferentToOrganismRf Model tests - Model fails", function(done) {
        let model = new ReferentToOrganismRfModel();

        model.DBA_create = jest.fn(
            (referentID, organismReferentID) =>
                new Promise(function(resolve, reject) {
                    return resolve({
                        error: "Create query fails.",
                        rowID: null
                    });
                })
        );

        model
            .create({ referentID: 1, organismReferentID: 1 })
            .then(rowID => {
                expect(1).toEqual(0);
                done();
            })
            .catch(error => {
                expect(error).toEqual("Create query fails.");
                done();
            });
    });

    test("Create ReferentToOrganismRf Model tests - Model success", function(done) {
        let model = new ReferentToOrganismRfModel();

        model.DBA_create = jest.fn(
            (referentID, organismReferentID) =>
                new Promise(function(resolve, reject) {
                    return resolve({
                        error: null,
                        rowID: organismReferentID
                    });
                })
        );

        model
            .create({ referentID: 1, organismReferentID: 1 })
            .then(rowID => {
                expect(rowID).toEqual(1);
                done();
            })
            .catch(error => {
                expect(error).toEqual(0);
                done();
            });
    });
});

describe("Update ReferentToOrganismRf Model tests", function() {
    test("Update ReferentToOrganismRf Model tests - Model fails", function(done) {
        let model = new ReferentToOrganismRfModel();

        model.DBA_update = jest.fn(
            (id, referentID, organismReferentID) =>
                new Promise(function(resolve, reject) {
                    return resolve({
                        error: "Update query fails.",
                        rowID: null
                    });
                })
        );

        model
            .update({ referentToOrganismRfID: 1, referentID: 1, organismReferentID: 1 })
            .then(rowID => {
                expect(1).toEqual(0);
                done();
            })
            .catch(error => {
                expect(error).toEqual("Update query fails.");
                done();
            });
    });

    test("Update ReferentToOrganismRf Model tests - Model success", function(done) {
        let model = new ReferentToOrganismRfModel();

        model.DBA_update = jest.fn(
            (id, referentID, organismReferentID) =>
                new Promise(function(resolve, reject) {
                    return resolve({
                        error: null,
                        rowID: organismReferentID
                    });
                })
        );

        model
            .update({ referentToOrganismRfID: 1, referentID: 1, organismReferentID: 1 })
            .then(rowID => {
                expect(rowID).toEqual(1);
                done();
            })
            .catch(error => {
                expect(error).toEqual(0);
                done();
            });
    });
});

describe("Remove ReferentToOrganismRf Model tests", function() {
    test("Remove ReferentToOrganismRf Model tests - Model fails", function(done) {
        let model = new ReferentToOrganismRfModel();

        model.DBA_remove = jest.fn(
            id =>
                new Promise(function(resolve, reject) {
                    return resolve({
                        error: "Remove query fails.",
                        id: null
                    });
                })
        );

        model
            .remove(1)
            .then(id => {
                expect(1).toEqual(0);
                done();
            })
            .catch(error => {
                expect(error).toEqual("Remove query fails.");
                done();
            });
    });

    test("Remove ReferentToOrganismRf Model tests - Model success", function(done) {
        let model = new ReferentToOrganismRfModel();

        model.DBA_remove = jest.fn(
            id =>
                new Promise(function(resolve, reject) {
                    return resolve({
                        error: null,
                        id: id
                    });
                })
        );

        model
            .remove(1)
            .then(id => {
                expect(id).toEqual(1);
                done();
            })
            .catch(error => {
                expect(error).toEqual(0);
                done();
            });
    });
});

describe("RemoveFromReferent ReferentToOrganismRf Model tests", function() {
    test("RemoveFromReferent ReferentToOrganismRf Model tests - Model fails", function(done) {
        let model = new ReferentToOrganismRfModel();

        model.DBA_removeFromReferent = jest.fn(
            id =>
                new Promise(function(resolve, reject) {
                    return resolve({
                        error: "RemoveFromReferent query fails.",
                        id: null
                    });
                })
        );

        model
            .removeFromReferent(1)
            .then(id => {
                expect(1).toEqual(0);
                done();
            })
            .catch(error => {
                expect(error).toEqual("RemoveFromReferent query fails.");
                done();
            });
    });

    test("RemoveFromReferent ReferentToOrganismRf Model tests - Model success", function(done) {
        let model = new ReferentToOrganismRfModel();

        model.DBA_removeFromReferent = jest.fn(
            id =>
                new Promise(function(resolve, reject) {
                    return resolve({
                        error: null,
                        id: id
                    });
                })
        );

        model
            .removeFromReferent(1)
            .then(id => {
                expect(id).toEqual(1);
                done();
            })
            .catch(error => {
                expect(error).toEqual(0);
                done();
            });
    });
});
