const {Events} = require('discord.js');

module.exports = {   
    name: Events.ClientReady,
    
    run(client) {
        console.log(client);
        console.log(`${client.user.tag} is online`);
        client.user.setActivity('Musique du catalogue', { type: 'LISTENING' });
        client.user.setStatus('online');
    }
};