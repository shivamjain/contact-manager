const _ = require('lodash');
const express = require("express");
let app = express();

process.env.NODE_ENV = process.env.NODE_ENV || "development";
const config = require(`./${process.env.NODE_ENV}.config.json`);

const Registry = require("./src/misc/registry");

// Database connections initialize
const MongoDB = require("./src/misc/db/client/mongodb");
let mongodbObj = new MongoDB(config.database.mongodb);
let mongodbClient = mongodbObj.createConnection({ useUnifiedTopology: true });

// Initializing database models over mongodb client.
const schemas = require("./src/schemas");
let models = {};
_.each(schemas, (value, key) => {
	models[key] = mongodbClient.model(key, value);
});

Registry.set("models", models);
Registry.set("config", config);
Registry.set("env", process.env.NODE_ENV);

const routes = require("./src/routes");
_.each(routes, (value, key) => {
	app.use(value);
});

app.listen(config.app.port, () => {
	console.log(`[INFO] Application started on port: ${config.app.port}`);
});