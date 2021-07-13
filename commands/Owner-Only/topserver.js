const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'top',
    timeout: 10000,

      category: 'Owner-Only',
    run: async(client, message, args) => {
            
          if(message.author.id !== '775616483363258388') return message.channel.send('This is an owner only command.')    

        const guilds = client.guilds.cache
        .sort((a, b) => b.memberCount - a.memberCount)
        .first(15);

        const description = guilds
        .map((guild, index) => {
            return `${index+1} \`${guild.name}\` -> **${guild.memberCount}** members`;
        })
        .join("\n")
        message.channel.send(
            new MessageEmbed().setTitle("top guilds ").setDescription(description)
        )
    }
}