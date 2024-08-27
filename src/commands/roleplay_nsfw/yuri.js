module.exports = {
  name: "yuri",
  cooldown: 3,
  SnM: false,
  nsfw: true,
  run: async (client, message, args) => {
    client.purrPrefixNsfw(client, message, "yuri", true);
  },
};
