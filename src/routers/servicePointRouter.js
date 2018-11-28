const express = require("express");
let router = express.Router();

const ServicePointController = require("../controllers/servicePointController.js");

const controller = new ServicePointController();

router.post("/", controller.servicePoint_create);

router.delete("/", controller.servicePoint_delete);

router.put("/", controller.servicePoint_update);

// GET request for one organsim
router.get("/", controller.servicePoint_detail);

// GET request for list of all organsims
router.get("/list", controller.servicePoint_list);

module.exports = router;
