const express = require('express');
let router = express.Router();

const OrganismController = require('../controllers/organismController.js');

const controller = new OrganismController;

router.post('/', controller.organism_create);

router.delete('/', controller.organism_delete);

router.put('/', controller.organism_update);

// GET request for one organsim
router.get('/', controller.organism_detail);

// GET request for list of all organsims
router.get('/list', controller.organism_list);

module.exports = router;