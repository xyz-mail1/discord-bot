const { SlashCommandBuilder } = require("discord.js");
const wrapper = require("../../wrapper/purr");
const { EmbedBuilder } = require("@discordjs/builders");
const api = new wrapper();
module.exports = {
  data: new SlashCommandBuilder()
    .setName("rp_nsfw")
    .setDescription("Do naughty stuff *wink*")
    .addSubcommand((s) =>
      s
        .setName("fuck")
        .setDescription("Fuck someone")
        .addUserOption((o) =>
          o.setRequired(true).setName("person").setDescription("person to fuck")
        )
    )
    .addSubcommand((s) =>
      s
        .setName("blowjob")
        .setDescription("Blow someone")
        .addUserOption((o) =>
          o.setRequired(true).setName("person").setDescription("person to blow")
        )
    )
    .addSubcommand((s) =>
      s
        .setName("anal")
        .setDescription("Wrong hole~")
        .addUserOption((o) =>
          o.setRequired(true).setName("person").setDescription("person to fuck")
        )
    )
    .addSubcommand((s) =>
      s
        .setName("suck")
        .setDescription("Blow a girl")
        .addUserOption((o) =>
          o.setRequired(true).setName("person").setDescription("person to lick")
        )
    ),
  async execute(interaction, client) {
    const subCommand = interaction.options.getSubcommand();
    const user = interaction.options.getUser("person");
    let gif = {};
    let description = "";

    switch (subCommand) {
      case "fuck":
        gif = await api.nsfw("fuck");
        description = `${interaction.user} fucks ${user}`;
        break;
      case "blowjob":
        gif = await api.nsfw("blowjob");
        description = `${interaction.user} blows ${user}`;
        break;
      case "anal":
        gif = await api.nsfw("anal");
        description = `${interaction.user} fucks ${user}`;
        break;
      case "suck":
        gif = await api.nsfw("pussylick");
        description = `${interaction.user} sucks ${user}`;
        break;
      default:
        return;
    }
    if (!gif.link)
      return interaction.reply({ content: "command failed", ephemeral: true });
    else {
      const embed = new EmbedBuilder()
        .setImage(gif.link)
        .setColor(0x008000)
        .setDescription(description);
      interaction.reply({
        embeds: [embed],
      });
    }
  },
};
