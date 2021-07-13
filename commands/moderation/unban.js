const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'unban',
    category: 'moderation',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) return;

        const id = args[0];
        if(!id) return message.channel.send('Please give me a correct id')
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const bannedMembers = await message.guild.fetchBans();
        if(!bannedMembers) return message.channel.send("Couldn't find that member in the ban list!")

        message.guild.members.unban(id);

        message.channel.send(`${id} is now unbanned`)

        
    },
};