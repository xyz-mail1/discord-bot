const fs = require("fs");
const { REST, Routes } = require("discord.js");

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync(`./src/slash`);

    for (const folder of commandFolders) {
      const commandFiles = fs.readdirSync(`./src/slash/${folder}`);

      for (const file of commandFiles) {
        const command = require(`../slash/${folder}/${file}`);

        client.slash.set(command.data.name, command);
        client.slashData.push(command.data.toJSON());
      }
    }

    const clientid = process.env.clientid;
    // const guildid = process.env.guildid; for testing commands
    const rest = new REST().setToken(process.env.token);
    try {
      console.log("Started refreshing interaction commands");
      await rest.put(Routes.applicationCommands(clientid), {
        body: client.slashData,
      });
    } catch (error) {
      console.error(`Failed to load a slash command. Reason: ${error}`);
    }
  };
};
