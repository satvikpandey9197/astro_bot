const {Message, MessageEmbed}= require('discord.js')
const ms = require('ms')

module.exports = {
    name : 'mute',
    usage: "mute @user",
    category: 'moderation',
  description: "Mute someone so he wont be able to type after mute ",
    run : async(client, message, args) => {
         const reason = args.slice(1).join(" ") || "No reason provided";
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return;
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!member) return message.channel.send('I can only mute members try giving me a member to mute ')
        const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
        if(!role) {
            try {
                message.channel.send('`muted` role is not found, attempting to create muted role.')

                let muterole = await message.guild.roles.create({
                    data : {
                        name : 'muted',
                        permissions: []
                    }
                });
                message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
                message.channel.send('`muted` role has sucessfully been created.')
            } catch (error) {
                console.log(error)
            }
        };
        let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')

        if(member.roles.cache.has(role2.id)) return message.channel.send(`**${member.displayName}** has already been muted.`)
        await member.roles.add(role2)
        message.channel.send(`**${member.displayName}** is now muted | ${reason}`)
        member.send(`You have been Muted In \`${message.guild}\` by ${message.author} for ${reason}`)

    }
}