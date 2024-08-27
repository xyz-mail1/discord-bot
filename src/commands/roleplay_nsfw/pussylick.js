module.exports = {
  name: "pussylick",
  aliases: ["pl"],
  cooldown: 3,
  SnM: false,
  nsfw: true,
  run: async (client, message, args) => {
    await client.purrPrefixNsfw(client, message, "pussylick", true);
  },
};
