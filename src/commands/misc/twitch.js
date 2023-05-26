const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
module.exports = {
  name: "twitch",
  description: "Saca un embed de un canal de twitch.",
  options: [
    {
      name: "twitch-channel",
      description: "El nombre del canal de Twitch a linkear.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  callback: (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName === "twitch") {
      const twitchChannel = interaction.options.get("twitch-channel").value;
      console.log(twitchChannel);
      const embed = new EmbedBuilder()
        .setTitle(`${twitchChannel}`)
        .setDescription(`Este es el canal de ${twitchChannel}.`)
        .setColor(0xa642ff)
        .setURL(`https://twitch.tv/${twitchChannel}`)
        .setImage(
          "https://res.cloudinary.com/dbzdoyjbv/image/upload/v1679450688/twitch-logo-twitch-icon-transparent-free-png_nnnqfu.png"
        )
        .setTimestamp()
        .setFooter({
          text: "Sigue este canal en Twitch",
          iconURL:
            "https://res.cloudinary.com/dbzdoyjbv/image/upload/v1679450688/twitch-logo-twitch-icon-transparent-free-png_nnnqfu.png",
        });
      interaction.reply({ embeds: [embed] });
    }
  },
};
