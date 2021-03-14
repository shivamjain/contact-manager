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
        let title = "Welcome to Dashboard", errorMsg = "", successMsg = "";
        
        this.res.render("admin/dashboard", {
			layout: "admin",
			title,
			error: errorMsg,
			success: successMsg,
            user: this.user.toJSON(),
            org: this.org.toJSON()
		});
    }
}

module.exports = Admin;