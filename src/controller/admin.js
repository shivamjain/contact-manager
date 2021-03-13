const _ = require("lodash");
const Auth = require("./auth");

class Admin extends Auth {
    constructor(req, res) {
        super(req, res);

        this.beforeMethods = {
            "dashboard": ["_secure"]
        };
    }

    async dashboard() {
        this.res.json({ message: "You are logged in as " + this.user.email });
    }
}

module.exports = Admin;