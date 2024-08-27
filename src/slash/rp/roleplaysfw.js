const { SlashCommandBuilder } = require("discord.js");
const wrapper = require("../../wrapper/purr");
const { EmbedBuilder } = require("@discordjs/builders");
const api = new wrapper();
module.exports = {
  data: new SlashCommandBuilder()
    .setName("rp")
    .setDescription("roleplay")
    .addSubcommand((s) =>
      s
        .setName("bite")
        .setDescription("Bite someone")
        .addUserOption((o) =>
          o.setRequired(true).setName("person").setDescription("person to bite")
        )
    )
    .addSubcommand((s) =>
      s
        .setName("cuddle")
        .setDescription("Cuddle someone")
        .addUserOption((o) =>
          o
            .setRequired(true)
            .setName("person")
            .setDescription("person to cuddle")
        )
    )
    .addSubcommand((s) =>
      s
        .setName("hug")
        .setDescription("Hug someone")
        .addUserOption((o) =>
          o.setRequired(true).setName("person").setDescription("person to hug")
        )
    )
    .addSubcommand((s) =>
      s
        .setName("kiss")
        .setDescription("Kiss someone")
        .addUserOption((o) =>
          o.setRequired(true).setName("person").setDescription("person to kiss")
        )
    )
    .addSubcommand((s) =>
      s
        .setName("lick")
        .setDescription("Lick someone")
        .addUserOption((o) =>
          o.setRequired(true).setName("person").setDescription("person to lick")
        )
    )
    .addSubcommand((s) =>
      s
        .setName("pat")
        .setDescription("Pat someone")
        .addUserOption((o) =>
          o.setRequired(true).setName("person").setDescription("person to pat")
        )
    )
    .addSubcommand((s) =>
      s
        .setName("poke")
        .setDescription("Poke someone")
        .addUserOption((o) =>
          o.setRequired(true).setName("person").setDescription("person to poke")
        )
    )
    .addSubcommand((s) =>
      s
        .setName("slap")
        .setDescription("Slap someone")
        .addUserOption((o) =>
          o.setRequired(true).setName("person").setDescription("person to slap")
        )
    )
    .addSubcommand((s) =>
      s
        .setName("tickle")
        .setDescription("Tickle someone")
        .addUserOption((o) =>
          o
            .setRequired(true)
            .setName("person")
            .setDescription("person to tickle")
        )
    ),
  async execute(interaction, client) {
    const subCommand = interaction.options.getSubcommand();
    const user = interaction.options.getUser("person");
    let gif = {};
    let description = "";

    switch (subCommand) {
      case "bite":
        gif = await api.sfw("bite");
        description = `${interaction.user} bites ${user}`;
        break;
      case "cuddle":
        gif = await api.sfw("cuddle");
        description = `${interaction.user} cuddles ${user}`;
        break;
      case "hug":
        gif = await api.sfw("hug");
        description = `${interaction.user} hugs ${user}`;
        break;
      case "kiss":
        gif = await api.sfw("kiss");
        description = `${interaction.user} kisses ${user}`;
        break;
      case "pat":
        gif = await api.sfw("pat");
        description = `${interaction.user} pats ${user}`;
        break;
      case "poke":
        gif = await api.sfw("poke");
        description = `${interaction.user} poke ${user}`;
        break;
      case "lick":
        gif = await api.sfw("lick");
        description = `${interaction.user} licks ${user}`;
        break;
      case "slap":
        gif = await api.sfw("slap");
        description = `${interaction.user} slaps ${user}`;
        break;
      case "tickle":
        gif = await api.sfw("tickle");
        description = `${interaction.user} tickles ${user}`;
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
