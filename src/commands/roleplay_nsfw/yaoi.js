module.exports = {
  name: "yaoi",
  cooldown: 3,
  SnM: false,
  nsfw: true,
  run: async (client, message, args) => {
    client.purrPrefixNsfw(client, message, "yaoi", true);
  },
};
