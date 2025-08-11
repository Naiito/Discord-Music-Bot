const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const play = require('play-dl');

module.exports = {
    name: 'play',
    description: 'Joue une musique depuis YouTube',
    data: new SlashCommandBuilder()
        .addStringOption(option =>
            option.setName('url')
                .setDescription('URL de la vidéo YouTube')
                .setRequired(true)),
    async execute(interaction) {
        console.log(`Commande play exécutée par ${interaction.user.tag}`);
        const url = interaction.options.getString('url');
        if (!play.yt_validate(url)) {
            return interaction.reply({ content: 'URL YouTube invalide.', ephemeral: true });
        }

        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) {
            return interaction.reply({ content: 'Vous devez être dans un salon vocal.', ephemeral: true });
        }

        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });

        try {
            const stream = await play.stream(url);
            const resource = createAudioResource(stream.stream, { inputType: stream.type });
            const player = createAudioPlayer();

            player.play(resource);
            connection.subscribe(player);

            player.on(AudioPlayerStatus.Idle, () => {
                connection.destroy();
            });

            player.on('error', error => {
                console.error(error);
                connection.destroy();
            });

            await interaction.reply(`Lecture de la musique : ${url}`);
        } catch (error) {
            console.error(error);
            connection.destroy();
            await interaction.reply({ content: 'Erreur lors de la lecture de la musique.', ephemeral: true });
        }
    },
};