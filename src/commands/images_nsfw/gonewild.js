module.exports = {
  name: "gonewild",
  cooldown: 3,
  nsfw: true,
  run: async (client, message, args) => {
    await client.handleNeko(client, message, "gonewild");
  },
};
