// External Deps
const _ = require("lodash");
const jwt = require("jsonwebtoken");

// Internal Deps
const Base = require("./base");
const Validation = require("../validations");
const Util = require("../misc/util");

class Auth extends Base {
	constructor(req, res) {
		super(req, res);
		this.user = null;
		this.org = null;
		
		this.beforeMethods = {};
	}

	__getPayload() {
		let payload = null;
		try {
			let token = this.req.cookies.hasOwnProperty("_token") ? this.req.cookies["_token"] : null;
			if (!token) {
				throw new Error("Token not found");
			}
			payload = jwt.verify(token, this.config.app.secret);
		} catch (error) {

		}
		return payload;
	}

	async _secure() {
		let payload = this.__getPayload();
		if (!payload) {
			this.res.redirect("/auth/login");
		}
		console.log(payload);
		let user = await this.models.User.findOne({_id: payload.uid});
		let org = await this.models.Organization.findOne({_id: payload.oid});
		if (!user || !org) {
			this.res.redirect("/auth/login");
		}
		this.user = user;
		this.org = org;
	}

	__generateToken(org, user, seconds = 3600) {
		let payload = { uid: user._id, oid: org._id };
		let options = { expiresIn: seconds };
		return jwt.sign(payload, this.config.app.secret, options);
	}

	async login() {
		let title = "Contact Manager | Login", errorMsg = "";
		if (this.req.method == "POST") {
			// Handle form submission
			let { error, value } = Validation.Auth.LoginSchema.validate(this.req.body);
			if (error) {
				errorMsg = _.size(error.details) > 0 ? error.details[0].message : null;
			} else {
				try {
					let user = await this.models.User.findOne({ email: value.email });
					if (!user || !await user.verifyPassword(value.password)) {
						throw new Error("Incorrect email/password");
					}
					let org = await this.models.Organization.findOne({ _id: user.orgId });
					if (!org) {
						throw new Error("Incorrect email/password");
					}
					if (org.status != this.models.Organization.STATUS_ACTIVE || user.status != this.models.User.STATUS_ACTIVE) {
						throw new Error("Account not active");
					}
					let seconds = 3600;
					let token = this.__generateToken(org, user, seconds);
					this.res.cookie("_token", token, {
						maxAge: seconds * 1000,
						secure: false,
						httpOnly: true,
						sameSite: "strict"
					});
					this.res.redirect("/");
				} catch (error) {
					errorMsg = error.message;
				}
			}
		}
		this.res.render("auth/login", { layout: "standard", title, error: errorMsg });
	}

	async register() {
		let title = "Contact Manager | Register", errorMsg = "", successMsg = "";
		if (this.req.method == "POST") {
			// Handle form submission
			let { error, value } = Validation.Auth.RegisterSchema.validate(this.req.body);
			if (error) {
				errorMsg = _.size(error.details) > 0 ? error.details[0].message : null;
			} else {				
				let user = await this.models.User.findOne({ email: value.email });
				if (!user) {
					let org = new this.models.Organization({
						_id: Util.generateMongoId(),
						name: value.companyName,
						status: this.models.Organization.STATUS_ACTIVE
					});
					user = new this.models.User({
						_id: Util.generateMongoId(),
						orgId: org._id,
						name: value.name,
						status: this.models.User.STATUS_ACTIVE,
						phone: value.phone,
						email: value.email,
						password: value.password,
						type: this.models.User.TYPE_ADMIN
					});
					const session = await this.models.User.startSession();
					session.startTransaction();
					try {
						await org.save({ session });
						await user.save({ session });
						await session.commitTransaction();
						successMsg = "User registered successfully.";
					} catch (error) {
						await session.abortTransaction();
						console.log(error);
						errorMsg = "User registration failed. Please try again after sometime.";
					}
					session.endSession();
				} else {
					errorMsg = "User already exist with the provided email address";
				}
			}
		}
		this.res.render("auth/register", {
			layout: "standard",
			title,
			error: errorMsg,
			success: successMsg,
			data: this.req.body
		});
	}
}

module.exports = Auth;