module.exports = {
  name: "ping",
  description: "Responde cuánto ping tiene el bot al servidor",
  callback: async (client, interaction) => {
    await interaction.deferReply();
    const reply = await interaction.fetchReply();
    const ping = reply.createdTimestamp - interaction.createdTimestamp;
    interaction.editReply(
      `Pong! El ping del cliente es ${ping}ms | Websocket: ${client.ws.ping} ms`
    );
  },
};
