const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Renvoie le ping du bot',

    async run(client, message) {
        
        message.reply('Ping du bot: \n ' + client.ws.ping + 'ms');

}
};
