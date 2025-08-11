
const { Client, IntentsBitField, Collection } = require('discord.js');
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


client.login(config.token);
loadCommands(client);
loadEvents(client);

