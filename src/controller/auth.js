const Base = require("./base");

class Auth extends Base {
	constructor(req, res) {
		super(req, res);
		this.beforeMethods = {};
	}

	async login() {
		this.res.json({ message: "i got called" });
	}

	async register() {
		
	}
}

module.exports = Auth;