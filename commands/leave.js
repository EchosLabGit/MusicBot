module.exports = {
    name: 'leave',
    description: 'Stops the music bot',
    async execute(message, args){
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.channel.send('Please be in the music channel to use this command!');
        await voiceChannel.leave();
        await message.channel.send('Leaving channel... :smiling_face_with_tear:')

    }
}