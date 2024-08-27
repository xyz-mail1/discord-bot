const { Events } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute: async (client) => {
    console.log(`Ready! Logged in as ${client.user.tag}`);
    console.log("Guilds");
    client.guilds.cache.forEach((guild) => {
      console.log(`${guild.name} | ${guild.id}`);
    });
  },
};
