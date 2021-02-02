const express = require("express");
let router = express.Router();

router.get("/contact/list", (req, res, next) => {
    res.json({ status: true });
});

module.exports = router;