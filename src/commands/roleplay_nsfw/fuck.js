module.exports = {
  name: "fuck",
  aliases: ["sex", "bang", "rape"],
  cooldown: 3,
  SnM: false,
  nsfw: true,
  run: async (client, message, args) => {
    client.purrPrefixNsfw(client, message, "fuck", true);
  },
};
