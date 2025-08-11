

const { readdirSync } = require('fs');



module.exports = async client => {

    let count = 0;
    const dirsCommands = readdirSync('./commands/')
    
    for (const dir of dirsCommands) {
        const filesDir = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
        for (const file of filesDir) {  
            const command = require(`../commands/${dir}/${file}`);
            client.commands.set(command.data.name, command);
            console.log(`Commande ${command.data.name} chargée avec succès.`);
            count++;
        };
    };
    console.log(`Chargement de ${count} commandes réussies.`);
}



    // fs.readdirSync('./commands').filter(f => f.endsWith('.js')).forEach(async file => {
    //         let command = require(`../commands/${file}`)    
    //         if (command.name) {
    //             console.log(`Chargement de la commande : ${command.name}`)
    //             client.commands.set(command.name, command);
    //             console.log(`Commande ${file} chargée avec succès.`);
    //         } else {
    //             console.warn(`La commande ${file} n'a pas de nom défini.`)
    //         }

    //     fs.readdirSync('./commands/music').filter(f => f.endsWith('.js')).forEach(async file => {
    //         let command = require(`../commands/music/${file}`)
    //         if (command.name) {
    //             console.log(`Chargement de la commande musicale : ${command.name}`)
    //             client.commands.set(command.name, command);
    //             console.log(`Commande musicale ${file} chargée avec succès.`);
    //         }   else {
    //             console.warn(`La commande musicale ${file} n'a pas de nom défini.`) 
    //         }
    //     });
    // }    
    // )}
