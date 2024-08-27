const {
  Events,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
const { getNekosApi } = require("../wrapper/nekosapi");
module.exports = {
  name: Events.InteractionCreate,
  execute: async (interaction, client) => {
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.slash.get(interaction.commandName);
      if (!command) return;
      try {
        const whitelist = [
          "911822497891102741",
          "901366487850303499",
          "1107228788569423965",
          "1124643555948900433",
        ];
        if (command.SnM) {
          if (!whitelist.includes(interaction.user.id))
            return interaction.reply({
              content: "u cant use this command",
              ephemeral: true,
            });
        }

        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
      }
    } else if (interaction.isContextMenuCommand()) {
      const contextCommand = interaction.client.slash.get(
        interaction.commandName
      );
      if (!contextCommand) return;
      try {
        await contextCommand.execute(interaction, client);
      } catch (error) {
        console.error(error);
      }
    } else if (interaction.customId === "again") {
      try {
        const button = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("again")
            .setLabel("Again!")
            .setStyle(ButtonStyle.Success)
        );
        const img = await getNekosApi();
        const newEmbed = new EmbedBuilder().setImage(img).setColor("Random");

        await interaction.update({ embeds: [newEmbed], components: [button] });
      } catch (error) {
        console.log(`Error while execuing nekos.api button press`, error);
      }
    }
  },
};
