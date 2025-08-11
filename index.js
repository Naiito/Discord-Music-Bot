const Discord = require('discord.js');
const { Client, GatewayIntentBits, IntentsBitField } = require('discord.js');
const intents = new IntentsBitField([3155968]); // Guilds, GuildMessages, GuildVoiceStates, DirectMessages
const config = require('./config.js');
const client = new Client({
    intents: intents, // Guilds, GuildMessages, GuildVoiceStates, DirectMessages
    partials: ['CHANNEL', 'MESSAGE']   
});
const loadCommands = require('./Loaders/loadCommands.js');



client.login(config.token);
loadCommands(client);

client.on('messageCreate', async message => {
    if(message.content === '!ping') return btoa.loadCommands.get("ping").run(client, message);
});

client.on('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag}`);
});