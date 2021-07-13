  
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'vote',
    aliases: ["v", "vo"],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        message.channel.send(
          new MessageEmbed()
          .setTitle('Vote for The Astro!')
          .addField(`Discord Bots List`, `[Click Here](https://discordbotlist.com/bots/the-astro/upvote)`)
          .addField(`Top gg`, `[Comming soon ](https://discord.gg/bYwAReUz84)`)
          .setColor('RANDOM')
        )
    },
};