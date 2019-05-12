require("dotenv").config();
import http from "http";
import express from "express";
import chalk from "chalk";
import consola from "consola";
import emoji from "node-emoji";
import * as config from "./config/index";

/*
 ** Handle exceptions and rejections
 */

process.on("uncaughtException", error => {
	console.log(error);
	process.exit(1);
});

process.on("unhandledRejection", error => {
	console.log(error);
	process.exit(1);
});

/*
 ** App config
 */

const router = express();
const host =
	config.env === "production" ? process.env.HOST || "localhost" : "localhost";
const port = config.env === "production" ? process.env.PORT || 8080 : 4000;
const emo =
	config.env === "production" ? emoji.get("coffee") : emoji.get("gear");

/*
 **	Server Config
 */

const server = http.createServer(router);

server.listen(port, () => {
	console.log("\n-+============================+-\n");
	consola.info(chalk.blue(`Environment: ${config.env} `) + `${emo}`);
	consola.success(
		chalk.green.bold("Built and working!") + ` ${emoji.get("clap")}`
	);
	consola.success(
		chalk.green.bold("URL: http://" + host + ":" + port) +
			` ${emoji.get("see_no_evil")}`
	);
	console.log("\n-+============================+-");
});
