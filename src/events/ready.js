const { Events } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute: async (client) => {
    console.log(`Ready! Logged in as ${client.user.tag}`);
    console.log("Guilds");

    // Iterate over guilds and fetch owners
    for (const guild of client.guilds.cache.values()) {
      try {
        const owner = await guild.fetchOwner();
        console.log(`${guild.name} | ${guild.id} | ${owner.user.tag}`);
      } catch (error) {
        console.error(`Failed to fetch owner for guild ${guild.id}:`, error);
      }
    }
  },
};
