const { ApplicationCommandOptionType } = require("discord.js");
module.exports = {
  name: "hey",
  description: "Saluda al bot.",
  callback: (client, interaction) => {
    interaction.reply(`Hola 😁`);
  },
};
