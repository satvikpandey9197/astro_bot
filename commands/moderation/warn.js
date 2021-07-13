const db = require('../../models/warns')
const { Message, MessageEmbed } = require('discord.js')

module.exports = {
    name :'warn',
    category: 'moderation',
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return;
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.channel.send('User not found.')
        const reason = args.slice(1).join(" ")
             if (user.id === message.author.id) return message.reply(" Can you imagine warning yourself?")
     if(message.member.roles.highest.position <= user.roles.highest.position) return message.reply("You're role is not higher than the member.")
        db.findOne({ guildid: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) throw err;
            if(!data) {
                data = new db({
                    guildid: message.guild.id,
                    user : user.user.id,
                    content : [
                        {
                            moderator : message.author.id,
                            reason : reason
                        }
                    ]
                })
            } else {
                const obj = {
                    moderator: message.author.id,
                    reason : reason
                }
                data.content.push(obj)
            }
            data.save()
        });
        user.send(new MessageEmbed()
            .setDescription(`You have been warned for ${reason}`)
            .setColor("BLUE")
        )
        message.channel.send(new MessageEmbed()
            .setDescription(`Warned ${user} for ${reason}`).setColor('BLUE')
        )

    }
}