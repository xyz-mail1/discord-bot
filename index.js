require("dotenv").config();
require("module-alias/register");
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

if (!process.env.token) {
  throw new Error("Bot token is not set");
}

const token = process.env.token;
const BotClient = require(`./src/helpers/bot`);
const client = new BotClient();
// Your Discord webhook URL
const DISCORD_WEBHOOK_URL = process.env.webhook;

// Interval in milliseconds (14 minutes)
const INTERVAL_MS = 13 * 60 * 1000;
async function pingDiscord() {
  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: "Ping! This is a periodic message to keep the worker active.",
      }),
    });

    if (response.ok) {
      console.log(`Ping sent successfully: ${new Date()}`);
    } else {
      console.log(`Failed to send ping, status: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error sending ping: ${error.message}`);
  }
}

// Start pinging at regular intervals
setInterval(pingDiscord, INTERVAL_MS);

// Optional: Send an initial ping immediately
pingDiscord();

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
