const {
  SlashCommandBuilder,
  EmbedBuilder,
  embedLength,
} = require("discord.js");
const db = require("genshin-db");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("character")
    .setDescription("Search for a genshin character")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("name of character to search for")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const string = interaction.options.getString("name");
    try {
      const data = await db.characters(string, { matchAliases: true });
      if (data) {
        const embed = new EmbedBuilder()
          .setAuthor({
            name: data.name,
            iconURL: data.images.mihoyo_icon,
          })
          .setTitle(`${data.title} || ${data.rarity} stars`)
          .setDescription(`**Description**: __${data.description}__`)
          .addFields(
            {
              name: "Weapon",
              value: data.weaponText,
            },
            {
              name: "Gender",
              value: data.gender,
            },
            {
              name: "Birthday",
              value: data.birthday,
            },
            { name: "Element", value: data.elementText, inline: true },
            {
              name: "Affiliation",
              value: `${data.affiliation} | ${data.region}`,
            }
          )
          .setImage(data.images.cover1);
        await interaction.reply({ embeds: [embed] });
      }
    } catch (error) {
      console.error(error);
    }
  },
};
