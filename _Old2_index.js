require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const play = require('play-dl');
const path = require('path');
const fs = require('fs');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ]
});

const { video_basic_info, stream } = require('play-dl');

client.commands = new Collection();
const prefix = '-';

// Chargement automatique des commandes
const commandsPath = path.join(__dirname, 'commands');
if (fs.existsSync(commandsPath)) {
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(path.join(commandsPath, file));
        client.commands.set(command.name, command);
    }
}

// Événement : prêt
client.once('ready', () => {
    console.log(`✅ Connecté en tant que ${client.user.tag}`);
});

// Événement : message
client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply("❌ Erreur lors de l'exécution de la commande.");
    }
});

client.login(process.env.DISCORD_TOKEN);
