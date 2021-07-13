const { client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'kick',
    category: 'moderation',
    run: async (client, message, args) => {
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(`You don't have permission to use this command.`)
        const member = message.mentions.members.first();


        if (!member) return message.channel.send('Please mention a valid user to kick!');

        if (member.id === message.author.id) return message.reply(" Can you imagine kicking yourself?")

        if (member.id === client.user.id) return message.reply("You should not kick me with my own command :/")

        if (message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send("You're role is not higher than the member.");
        if (!member.kickable) return message.channel.send("I cant kick this user, try moving my role above. ");
        const reason = args.slice(1).join(" ") || "No reason provided";
        member.kick({ reason: reason })

        message.channel.send(`Kicked **${member}** for **${reason}**.`)

 
    },
};