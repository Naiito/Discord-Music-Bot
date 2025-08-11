//const { SlashCommandBuilder } = require('discord.js');
//
//module.exports = {
//    data: new SlashCommandBuilder()
//        .setName('play')
//        .setDescription('Écoute une musique')
//        .setDMPermission(false)
//        .addStringOption(opt =>
//            opt.setName('song')
//                .setDescription('Le nom ou le lien de la musique')
//                .setRequired(true)
//        ),
//    async execute(interaction) {
//        await interaction.deferReply({ ephemeral: true });
//
//        const song = interaction.options.getString('song');
//        const voiceChannelMember = interaction.member.voice.channel;
//        const voiceChannelBot = interaction.guild.members.me.voice.channel;
//
//        if (!voiceChannelMember) {
//            return interaction.editReply('Vous devez être dans un salon vocal pour utiliser cette commande.');
//        }
//        if (voiceChannelBot && voiceChannelBot.id !== voiceChannelMember.id) {
//            return interaction.editReply('Je ne suis pas dans le même salon vocal que vous.');
//        }
//
//        // Création de la file d'attente
//        const queue = interaction.client.player.nodes.create(interaction.guild, {
//            metadata: interaction,
//            volume: 70,
//            leaveOnStop: true,
//            leaveOnEmpty: true,
//            leaveOnEnd: false,
//            leaveOnEmptyCooldown: 180,
//            selfDeaf: true
//        });
//
//        try {
//            if (!queue.connection) await queue.connect(voiceChannelMember);
//        } catch {
//            queue.delete();
//            return interaction.editReply('Impossible de rejoindre le salon vocal.');
//        }
//
//        const { track } = await interaction.client.player.play(voiceChannelMember, song, {
//            requestedBy: interaction.user
//        });
//
//        if (track) {
//            await interaction.editReply(`\`${track.title}\` a été ajouté à la file d'attente.`);
//            console.log(`La musique "${track.title}" a été ajoutée par ${interaction.user.tag}.`);
//        } else {
//            await interaction.editReply("Impossible d'ajouter la musique à la file d'attente.");
//        }
//    }
//};

const { SlashCommandBuilder } = require('discord.js');
const { useMainPlayer } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Écoute une musique depuis Spotify ou YouTube')
        .addStringOption(opt =>
            opt.setName('song')
                .setDescription('Nom ou lien de la musique')
                .setRequired(true)
        ),

    async execute(interaction) {
        await interaction.deferReply();

        const player = useMainPlayer();
        const song = interaction.options.getString('song');
        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) {
            return interaction.editReply('❌ Tu dois être dans un salon vocal.');
        }

        const queue = player.nodes.create(interaction.guild, {
            metadata: interaction.channel,
            leaveOnEmpty: false,
        });

        try {
            if (!queue.connection) await queue.connect(voiceChannel);
        } catch {
            queue.delete();
            return interaction.editReply('❌ Impossible de rejoindre le salon vocal.');
        }

        let finalQuery = song;

        // Si lien Spotify → recherche YouTube
        if (song.includes('spotify.com')) {
            const searchSpotify = await player.search(song, { requestedBy: interaction.user });
            if (!searchSpotify.tracks.length) {
                queue.delete();
                return interaction.editReply('❌ Aucun résultat trouvé sur Spotify.');
            }

            const track = searchSpotify.tracks[0];
            finalQuery = `${track.author} - ${track.title}`;
        }

        // Recherche et ajout
        const searchResult = await player.search(finalQuery, {
            requestedBy: interaction.user
        });

        if (!searchResult || !searchResult.tracks.length) {
            queue.delete();
            return interaction.editReply('❌ Aucun résultat trouvé.');
        }

        await queue.addTrack(searchResult.tracks[0]);

        if (!queue.node.isPlaying()) {
            await queue.node.play();
        }

        await interaction.editReply(`✅ **${searchResult.tracks[0].title}** ajouté à la file d’attente.`);
    }
};
// This code is a Discord bot command that allows users to play music in a voice channel.
// It uses the discord-player library to handle music playback and queue management.