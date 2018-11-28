const express = require("express");
let router = express.Router();

const ServiceController = require("../controllers/serviceController.js");

const controller = new ServiceController();

router.post("/", controller.service_create);

router.delete("/", controller.service_delete);

router.put("/", controller.service_update);

router.get("/", controller.service_detail);

router.get("/list", controller.service_list);

module.exports = router;
