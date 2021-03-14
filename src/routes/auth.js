const express = require("express");
let router = express.Router();

const Registry = require("../misc/registry");
const Controller = require("../controller");

router.get("/status", (req, res) => {
	res.json({ status: true, Environment: Registry.get("env") });
});

router.route("/login").get(async (req, res) => {
	let ctr = new Controller.Auth(req, res);
	await ctr.executeMethod("login");
}).post(async (req, res) => {
	let ctr = new Controller.Auth(req, res);
	await ctr.executeMethod("login");
});

router.route("/register").get(async (req, res) => {
	let ctr = new Controller.Auth(req, res);
	await ctr.executeMethod("register");
}).post(async (req, res) => {
	let ctr = new Controller.Auth(req, res);
	await ctr.executeMethod("register");
});

router.route("/logout").get(async (req, res) => {
	let ctr = new Controller.Auth(req, res);
	await ctr.executeMethod("logout");
});

module.exports = router;