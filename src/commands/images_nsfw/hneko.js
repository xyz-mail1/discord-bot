module.exports = {
  name: "hneko",
  cooldown: 3,
  nsfw: true,
  run: async (client, message, args) => {
    await client.handleNeko(client, message, "hneko");
  },
};
