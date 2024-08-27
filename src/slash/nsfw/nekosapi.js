const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
const { getNekosApi } = require("../../wrapper/nekosapi");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nekosapi")
    .setDescription("Get a random image from nekos.api"),

  async execute(interaction, client) {
    try {
      const imageUrl = await getNekosApi();

      if (!imageUrl) {
        throw new Error("Failed to retrieve image URL from nekos.api.");
      }

      const button = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("again")
          .setLabel("Again!")
          .setStyle(ButtonStyle.Success)
      );

      const embed = new EmbedBuilder().setImage(imageUrl).setColor("Random");

      await interaction.reply({
        embeds: [embed],
        components: [button],
        fetchReply: true,
      });
    } catch (error) {
      console.error("Error executing nekosapi command:", error);

      await interaction.reply({
        content:
          "An error occurred while fetching the image. Please try again later.",
        ephemeral: true,
      });
    }
  },
};
