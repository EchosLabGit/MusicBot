const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = {
    name: 'play',
    description: 'This plays a song',
    async execute(message, args){
        const voiceChannel = message.member.voice.channel;

        if(!voiceChannel) return message.channel.send('Please be in the music channel to use this command!');
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if(!permissions.has('CONNECT')) return message.channel.send('Uh oh! You dont have the correct permisions!');
        if(!permissions.has('SPEAK')) return message.channel.send('Uh oh! You dont have the correct permisions!');
        if(!args.length) return message.channel.send('Please enter the youtube link you want to play!');

        const connection = await voiceChannel.join();
        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);
            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }

        const video = await videoFinder(args.join(''));
        if(video){
            const stream = ytdl(video.url, {filter: 'audioonly'});
            connection.play(stream, {seel: 0, volume: 1})
            .on('finish', () =>{
                voiceChannel.leave();
            });
            await message.reply(`:thumbsup: Now playing ***${video.title}***`)
        }else{
            message.channel.send('Somehow there was no results! Please use diferent keywords!')
        }
    }
}