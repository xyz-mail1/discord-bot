require("dotenv").config();
require("module-alias/register");
const express = require("express");
const app = express();
const port = process.env.PORT || 10000;
app.get("/", (req, res) => {
  res.send("Hello World!");
});
if (!process.env.token) {
  throw new Error("Bot token is not set");
}

const token = process.env.token;
const BotClient = require(`./src/helpers/bot`);
const client = new BotClient();

client.loadHandlers();
client.handleCommands();

process.on("unhandledRejection", (error) => {
  console.error("Unhandled rejection:", error);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
});

client.on("error", (error) => {
  console.error("Client error:", error);
});

client.login(token);
