module.exports = {
  name: "hass",
  cooldown: 3,
  nsfw: true,
  run: async (client, message, args) => {
    await client.handleNeko(client, message, "hass");
  },
};
