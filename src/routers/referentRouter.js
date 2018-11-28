const express = require('express');
let router = express.Router();

const ReferentController = require('../controllers/referentController.js');

const controller = new ReferentController;

router.post('/', controller.referent_create);

router.delete('/', controller.referent_delete);

router.put('/', controller.referent_update);

router.get('/', controller.referent_detail);

router.get('/list', controller.referent_list);

module.exports = router;