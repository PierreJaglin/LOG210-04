const path = require('path');

const dbName = 'log210.db';
const dbTestName = 'log210_test.db';

function getDBPath() {
    if (process.env.NODE_ENV === 'test') {
        return path.resolve('./db/', dbTestName);
    } else {
        return path.resolve('./db/', dbName);
    }
}

module.exports = {
    getDBPath
};