const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");
module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    const targetUserId = interaction.options.get("target-member").value;
    const reason =
      interaction.options.get("reason")?.value || "No reason provided.";

    await interaction.deferReply();
    const targetUser = await interaction.guild.members.fetch(targetUserId);
    if (!targetUser) {
      await interaction.editReply("Ese usuario no existe en este servidor.");
      return;
    }
    if (targetUser.id === interaction.guild.ownerId) {
      await interaction.editReply(
        "No puedes kickear a ese usuario porque es el dueño del servidor."
      );
    }

    const targetUserRolePosition = targetUser.roles.highest.position; //el rol más alto del usuario targeteado
    const requestUserRolePosition = interaction.member.roles.highest.position; //el rol más alto del usuario que ejecuta el comando
    const botRolePosition = interaction.guild.members.me.roles.highest.position; //el rol más alto del bot

    if (targetUserRolePosition >= requestUserRolePosition) {
      await interaction.editReply(
        "No puedes kickear a ese usuario porque tiene el mismo o un rol más alto que tú."
      );
      return;
    }
    if (targetUserRolePosition >= botRolePosition) {
      await interaction.editReply(
        "No puedo kickear a ese usuario porque tiene el mismo o un rol más alto que yo."
      );
    }

    //Kickea al usuario
    try {
      await targetUser.kick({ reason });
      await interaction.editReply(
        `El usuario ${targetUser} ha sido kickeado del servidor.\nRazón: ${reason}`
      );
    } catch (error) {
      console.log(`There was an error when kicking: ${error}`);
    }
  },
  name: "kick",
  description: "Kickea a alguien!!!",
  options: [
    {
      name: "target-member",
      description: "El usuario que quieres kickear.",
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
    {
      name: "reason",
      description: "La razón del kickeo.",
      type: ApplicationCommandOptionType.String,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.KickMembers],
  botPermissions: [PermissionFlagsBits.KickMembers],
};
