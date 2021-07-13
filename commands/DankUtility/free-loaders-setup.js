
const Discord = require('discord.js')
const fs = require('fs');
const db = require('quick.db')
const ms = require("ms");


module.exports = {
    name: "free-loaders-setup",
    aliases: ["freeloadersetup", "autofreeloaders", "auto-ban-freeloaders", "Autoban Freeloaders"],
    description: "set autobanfreeloaders ",
    category: "DankUtility",
    run: async (client, message, args) => {
        let freeloaderChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[0]))
        let database = db.get(`freeChannel_${message.guild.id}`)


        

        if (!message.member.hasPermission('ADMINISTRATOR')) return;
        let option = args[0]

        if (!option) {
            const embed = new Discord.MessageEmbed()
                .setAuthor("WRONG USAGE !!")
                .setDescription(`follow these step to set it\n> free-loaders-setup enable/disable #freeloaders-log`)
                .setColor('RANDOM')
            return message.channel.send(embed)
        }

        if (option.toLowerCase() === 'enable') {
            if (database) {
                return message.channel.send("The cmd is already enabled in this server")
            }

            if (!freeloaderChannel) {
                return message.channel.send("Please Mention a channel so i can log freeloaders")
            }


            await db.set(`freeChannel_${message.guild.id}`, freeloaderChannel.id)


            const embed = new Discord.MessageEmbed()
                .setAuthor("Enabled Autoban Freeloaders system for this server")
                .setColor('GREEN')
                .setDescription(`**${message.author.tag}** has enabled The Autoban Freeloaders system! \n\n All the freeloaders logging will be shown in <#${freeloaderChannel.id}>`)
                .setTimestamp()
            return message.channel.send(embed)
        } else if (option.toLowerCase() === 'disable') {
            if (!database) {
                return message.channel.send("This server does not have the Autoban Freeloaders system enabled.");
            }

            db.delete(`freeChannel_${message.guild.id}`)

            const embed = new Discord.MessageEmbed()
                .setAuthor("Autoban Freeloaders System disabled")
                .setColor('RANDOM')
                .setDescription(`**${message.author.tag}** has disabled The Autoban Freeloaders system! \n\n now i wont be banning freeloaders until u enable it back `)
                .setTimestamp()
            return message.channel.send(embed)

        }

    },
}