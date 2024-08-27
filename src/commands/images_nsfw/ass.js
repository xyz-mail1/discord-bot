module.exports = {
  name: "ass",
  cooldown: 3,
  nsfw: true,
  run: async (client, message, args) => {
    await client.handleNeko(client, message, "ass");
  },
};
