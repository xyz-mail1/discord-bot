module.exports = {
  name: "4k",
  cooldown: 3,
  nsfw: true,
  run: async (client, message, args) => {
    await client.handleNeko(client, message, "4k");
  },
};
