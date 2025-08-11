const {Events, ActivityType} = require('discord.js');

module.exports = {   
    name: Events.ClientReady,
    
    async run(client) {
        console.log(`${client.user.tag} is online`);
        
        
        
        await client.application.commands.set(client.commands.map(command => command.data));
        client.user.setActivity('En phase de test', { type: ActivityType.Listening });
        client.user.setStatus('online');
    }
};