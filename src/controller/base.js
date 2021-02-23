// External Deps
const _ = require("lodash");
const Promise = require("bluebird");

class Base {
	constructor(req, res) {
		this.req = req;
		this.res = res;

		this.beforeMethods = {};
		this.afterMethods = {};
	}

	async __executeBefore(name) {
		if (_.size(this.beforeMethods) == 0 || !this._beforeMethods[name] || _.size(this.beforeMethods[name]) == 0) {
			return;
		}
		await Promise.each(this._beforeMethods[name], async (m) => {
			await this[m]();
		});
	}

	async __executeAfter(name) {
		if (_.size(this.afterMethods) == 0 || !this.afterMethods[name] || _.size(this.afterMethods[name]) == 0) {
			return;
		}
		await Promise.each(this.afterMethods[name], async (m) => {
			await this[m]();
		});
	}

	async executeMethod(name, ...args) {
		try {
			await this.__executeBefore(name);
			await this[name](...args);
			await this.__executeAfter(name);
		} catch (error) {
			
		}
	}
}

module.exports = Base;