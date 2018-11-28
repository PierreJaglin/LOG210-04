const express = require("express");
let router = express.Router();

const HistoriqueController = require("../controllers/historiqueController.js");

const controller = new HistoriqueController();

// GET request for list of all organsims
router.get("/list", controller.historique_list);

module.exports = router;
