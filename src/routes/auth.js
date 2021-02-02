const express = require("express");
let router = express.Router();

router.get("/status", (req, res, next) => {
    res.json({ status: true });
});

router.post("/auth/login", (req, res, next) => {

});

router.post("/auth/register", (req, res, next) => {

});

router.get("/auth/logout", (req, res, next) => {

});

module.exports = router;