const { SlashCommandBuilder } = require("discord.js");
// const { Message } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription("Test ping"),
  async execute(interaction) {
    await interaction.reply("Pong");
  },
};
