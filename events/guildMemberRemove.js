const { MessageEmbed } = require('discord.js')
const fs = require('fs');
const db = require('quick.db')

exports.run = async (client, member, message, args) => {


    const freeloaderChannel = db.get(`freeChannel_${member.guild.id}`)
    if (freeloaderChannel == null || !freeloaderChannel) return; // if banonjoin is not set or is false return
    member.ban({ days: 7, reason: 'freeloading' })
        .then(console.log)
        .catch(console.error);
    const channel = member.guild.channels.cache.find(ch => ch.id === freeloaderChannel);

    let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(':warning: Free loader detected :warning: ')
        .addField("User", `${member.user.username}`)
        .addField("User id", `${member.user.id}`)
        .addField("Status", `Banned for reason: freeloading`)
        .setThumbnail(`https://media.discordapp.net/attachments/847440148907032596/847448353221509130/Blinking_warning.gif`)
        .setTimestamp()
        .setFooter(`hehe, i have banned them for freeloading lmao `)
        if(channel){
            channel.send(embed).catch(err => console.log(err))
        }

}