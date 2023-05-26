const { ApplicationCommandOptionType } = require("discord.js");
module.exports = {
  name: "otaku",
  description: "Haz que el bot le diga otaku a otro miembro del servidor.",
  options: [
    {
      name: "target-member",
      description: "A quién le digo otaku",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
  ],
  callback: (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName === "otaku") {
      const userOtaku = interaction.options.get("target-member").user.username;
      interaction.reply(`${userOtaku} es recontra otaku. 🤢`);
    }
  },
};
