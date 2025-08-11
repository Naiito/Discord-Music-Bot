const {Events} = require('discord.js');
const { run } = require('./ready');

module.exports = {
    name: Events.MessageCreate,
    run: async (client, message) => {
        const prefix = "!";
        if(!message.content.startsWith(prefix)) return;
        console.log(`Message reçu de ${message.author.tag} : ${message.content}`)

        const arrayMessage = message.content.split(" ");
        const name = arrayMessage[0].slice(prefix.length, arrayMessage[0].length).toLowerCase();
        const command = client.commands.get(name);
        console.log(command);

        if (!command) return;
        if (command.run) {
            try {
                await command.run(client, message);
            } catch (error) {
                console.error(`Erreur lors de l'exécution de la commande ${name}:`, error);
                message.reply("Une erreur est survenue lors de l'exécution de la commande.");
            }
        } else {
            console.warn(`La commande ${name} n'a pas de méthode 'run'.`);
        }
    }
};
// This event handler listens for message creation events and processes commands accordingly.