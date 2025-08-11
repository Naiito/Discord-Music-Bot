const fs = require('fs');

module.exports = async client => {
    fs.readdirSync('./commands').filter(file => file.endsWith('.js')).forEach(file => {
        let command = require(`../commands/${file}.js`);    
        if (command.name) {
            console.log(`Chargement de la commande : ${command.name}`);
            client.commands.set(command.name, command);
        } else {
            console.warn(`La commande ${file} n'a pas de nom défini.`);
        }

        client.commands.set(command.name, command);
        console.log(`Commande ${file} chargée avec succès.`);
})}
