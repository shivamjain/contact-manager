const express = require("express");
let router = express.Router();

const Registry = require("../misc/registry");
const Controller = require("../controller");

router.get("/status", (req, res) => {
	res.json({ status: true, Environment: Registry.get("env") });
});

router.get("/auth/login", async (req, res) => {
	let ctr = new Controller.Auth(req, res);
	await ctr.executeMethod("login");
});

router.post("/auth/register", async (req, res) => {
	let ctr = new Controller.Auth(req, res);
	await ctr.executeMethod("register");
});

router.get("/auth/logout", (req, res) => {

});

module.exports = router;