const { Message } = require('discord.js')

module.exports=  {
    name : 'unmute', 
    category: 'moderation',

    run : async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return;
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!member) return message.channel.send('Give me a valid human so i can unmute him ')

        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');

        await member.roles.remove(role)

        message.channel.send(`**${member.displayName}** is now unmuted`)

    }
}