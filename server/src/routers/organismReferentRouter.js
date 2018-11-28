const express = require("express");
let router = express.Router();

const OrganismReferentController = require("../controllers/organismReferentController.js");

const controller = new OrganismReferentController();

router.post("/", controller.organismReferent_create);

router.delete("/", controller.organismReferent_delete);

router.put("/", controller.organismReferent_update);

// GET request for one organsim
router.get("/", controller.organismReferent_detail);

// GET request for list of all organsims
router.get("/list", controller.organismReferent_list);

module.exports = router;
