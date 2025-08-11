const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Renvoie Pong!',

    async run(client, message) {
        await message.reply('Pong! 🏓: ' + client.ws.ping + 'ms');

}
};
