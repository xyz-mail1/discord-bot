module.exports = {
  name: "tentacle",
  cooldown: 3,
  nsfw: true,
  run: async (client, message, args) => {
    await client.handleNeko(client, message, "tentacle");
  },
};
