const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Renvoie la latence du bot!')
        .setDMPermission(true)
        .setDefaultMemberPermissions(null),

    async run(interaction) {
        await interaction.reply(`Ping: \n \`${interaction.client.ws.ping}ms\`.`);
}
};
