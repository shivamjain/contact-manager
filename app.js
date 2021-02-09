const _ = require('lodash');
const express = require("express");
let app = express();

process.env.NODE_ENV = process.env.NODE_ENV || "development";
const config = require(`./${process.env.NODE_ENV}.config.json`);

const routes = require("./src/routes");
_.each(routes, (value, key) => {
	app.use(value);
});
// for(const n in routes){
// 	app.use(routes[n]);
// }

app.listen(config.app.port, () => {
	console.log(`[INFO] Application started on port: ${config.app.port}`);
});