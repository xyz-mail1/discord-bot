const { readdirSync } = require("node:fs");

module.exports = {
  name: "help",
  description:
    "Display available commands or details about a specific command.",
  aliases: ["h"],

  run: async (client, message, args) => {
    const roleColor =
      message.guild.members.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.members.me.displayHexColor;

    if (!args[0]) {
      const categories = readdirSync("./src/commands/").map((dir) => {
        const commands = readdirSync(`./src/commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          const file = require(`../../commands/${dir}/${command}`);
          return file.name ? `\`${file.name}\`` : "`Unnamed command`";
        });

        return {
          name: dir.toUpperCase(),
          value: cmds.length ? cmds.join(" ") : "In progress.",
        };
      });

      return client.embed(
        {
          title: "Here are all of my commands",
          fields: categories,
          color: roleColor,
          type: "reply",
        },
        message
      );
    } else {
      const commandName = args[0].toLowerCase();
      const command =
        client.commands.get(commandName) ||
        client.commands.find(
          (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
        );

      if (!command) {
        return client.embed(
          {
            title: "Command not found",
            description: `No command found for \`${commandName}\`. Please check the command name and try again.`,
            color: "#ff0000", // Red color to indicate error
            type: "reply",
          },
          message
        );
      }

      const { name, aliases } = command;
      client.embed(
        {
          title: `Command Details`,
          fields: [
            {
              name: "COMMAND:",
              value: name ? `\`${name}\`` : "`Unnamed command`",
            },
            {
              name: "ALIASES:",
              value: aliases ? `\`${aliases.join("`, `")}\`` : "`No aliases`",
            },
          ],
          color: roleColor,
          type: "reply",
        },
        message
      );
    }
  },
};
