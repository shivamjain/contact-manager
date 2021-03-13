const _ = require('lodash');
const cookieParser = require('cookie-parser');
const express = require("express");
const expressHbs = require("express-handlebars");
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
Registry.set("__dirname", __dirname);

// Attaching middleware's
app.engine("hbs", expressHbs({
	extname: "hbs",
	layoutsDir: Registry.get("__dirname") + "/src/views/layouts",
	partialsDir: Registry.get("__dirname") + "/src/views",
	defaultLayout: "standard"
}));
app.set('views', Registry.get("__dirname") + "/src/views");
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

const routes = require("./src/routes");
_.each(routes, (value, key) => {
	app.use(value);
});

app.listen(config.app.port, () => {
	console.log(`[INFO] Application started on port: ${config.app.port}`);
});