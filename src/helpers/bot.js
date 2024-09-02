const Discord = require("discord.js");
const fs = require("node:fs");

module.exports = class BotClient extends Discord.Client {
  constructor() {
    super({
      intents: [
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildInvites,
        Discord.GatewayIntentBits.DirectMessages,
      ],
      shards: "auto",
    });

    this.commands = new Discord.Collection();
    this.slash = new Discord.Collection();
    this.cooldowns = new Discord.Collection();
    this.slashData = [];
  }

  loadHandlers() {
    const files = fs
      .readdirSync("./src/handlers")
      .filter((file) => file.endsWith(".js"));
    for (const file of files) {
      const handler = require(`../handlers/${file}`);
      if (typeof handler === "function") {
        handler(this);
      }
    }
  }
};
