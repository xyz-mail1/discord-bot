module.exports = {
  name: "hyuri",
  cooldown: 3,
  nsfw: true,
  run: async (client, message, args) => {
    await client.handleNeko(client, message, "hyuri");
  },
};
