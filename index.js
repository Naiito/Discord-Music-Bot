
const { Client, IntentsBitField, Collection } = require('discord.js');
const { Player } = require("discord-player");
const { YouTubeExtractor, SpotifyExtractor } = require('@discord-player/extractor');
//53608447 // 3155968
const intents = new IntentsBitField([3276799]); // Guilds, GuildMessages, GuildVoiceStates, DirectMessages
const config = require('./config.js');
const client = new Client({
    intents: intents, // Guilds, GuildMessages, GuildVoiceStates, DirectMessages
    partials: ['CHANNEL', 'MESSAGE']   
});
const loadCommands = require('./Loaders/loadCommands.js');
const loadEvents = require('./Loaders/loadEvents.js');

client.commands = new Collection();

client.player = new Player(client, {
    ytdlOptions: {  
        filter: 'audioonly',
        quality: 'highestaudio',
        highWaterMark: 1 << 25, // 32MB
    }
});



(async () => {
    await client.login(config.token);
    await loadCommands(client);
    await loadEvents(client);

    
    await client.player.extractors.register(SpotifyExtractor, {
        clientId: config.spotify_client_id,
        clientSecret: config.spotify_client_secret
    });

})();
    



