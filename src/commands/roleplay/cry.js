module.exports = {
  name: "cry",
  cooldown: 3,
  SnM: false,
  run: async (client, message, args) => {
    client.purrPrefixSfw(client, message, "cry", false);
  },
};