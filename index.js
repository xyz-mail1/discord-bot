require("dotenv").config();
require("module-alias/register");

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
