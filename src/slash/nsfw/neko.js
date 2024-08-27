const { EmbedBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder } = require("discord.js");

const { nekosmoe } = require("../../wrapper/nekosmoe");
const { getNekosApi } = require("../../wrapper/nekosapi");
const nekobot = require("../../wrapper/neko");
const nekobotApi = new nekobot();

const purrbot = require("../../wrapper/purr");
const purrApi = new purrbot();

const { NekosAPI } = require("nekosapi");

const nekos = new NekosAPI();
module.exports = {
  data: new SlashCommandBuilder()
    .setName("hneko")
    .setDescription("Get random neko from different sources")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("nekosmoe")
        .setDescription("Get random nekos.moe image")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("nekobot")
        .setDescription("Get random nekosbot.xyz image")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("purrbot")
        .setDescription("Get random purrbot neko image/gif")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("nekosapi")
        .setDescription("Get random nekos.api image")
    ),
  async execute(interaction, client) {
    try {
      let image;
      const subcommand = interaction.options.getSubcommand();
      switch (subcommand) {
        case "nekosmoe":
          image = await nekosmoe();

          break;
        case "nekobot":
          const res = await nekobotApi.image("hneko");
          image = res.message;
          break;
        case "purrbot":
          const purrRes = await purrApi.nsfw("neko");
          image = purrRes.link;
          break;
        case "nekosapi":
          image = await getNekosApi();
          break;
        default:
          throw new Error("Unknown subcommand");
      }
      const embed = new EmbedBuilder().setImage(image).setColor(0x37fd12);
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.log(error);
      await interaction.reply({
        content: "There was an error while fetching the image.",
        ephemeral: true,
      });
    }
  },
};
