
const { readdirSync } = require('fs');

module.exports = async client => {
    const dirsEvents = readdirSync('./events/');

    for (const dir of dirsEvents) {
        const filesDir = readdirSync(`./events/${dir}/`).filter(file => file.endsWith('.js'));
        for (const file of filesDir) {
            const event = require(`../events/${dir}/${file}`);
            client.on(event.name, (...args) => event.run(client, ...args));
            
            //if (event.once) {
            //    client.once(event.name, (...args) => event.execute(...args, client));
            //} else {
            //    client.on(event.name, (...args) => event.execute(...args, client));
            //}
            console.log(`Événement ${event.name} chargé avec succès.`);
        }
    }   
    console.log(`Chargement de ${dirsEvents.length} événements réussis.`);
    return;
};