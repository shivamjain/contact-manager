const express = require("express");
let router = express.Router();

const Registry = require("../misc/registry");
const Controller = require("../controller");

router.route("/").get(async (req, res) => {
	let ctr = new Controller.Admin(req, res);
	await ctr.executeMethod("dashboard");
});

module.exports = router;