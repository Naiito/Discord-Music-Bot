const { Events, InteractionType } = require('discord.js');
module.exports = {
    name: Events.InteractionCreate,
    async run(client, interaction) {
        if(interaction.type === InteractionType.ApplicationCommand) {
            const command = client.commands.get(interaction.commandName);
            if (!command) {
                console.warn(`La commande ${interaction.commandName} n'existe pas.`);
                return interaction.reply({ content: 'Cette commande n\'existe pas.', ephemeral: true });
            }
            const commandFuntionType = typeof command.run === 'function' ? 'run' : typeof command.execute === 'function' ? 'execute' : null;
            // Vérification du type de la commande et exécution appropriée
            switch (commandFuntionType) {
                case 'run':
                    try {
                        await command.run(interaction);
                    } catch (error) {
                        console.error(`Erreur lors de l'exécution de la commande ${interaction.commandName}:`, error);
                        await interaction.reply({ content: 'Une erreur est survenue lors de l\'exécution de la commande.', ephemeral: true });
                    }
                    break;
                case 'execute':  
                    try {
                        await command.execute(interaction);
                    } catch (error) {
                        console.error(`Erreur lors de l'exécution de la commande ${interaction.commandName}:`, error);
                        await interaction.reply({ content: 'Une erreur est survenue lors de l\'exécution de la commande.', ephemeral: true });
                    }
                    break;
            }
        }
    }
}