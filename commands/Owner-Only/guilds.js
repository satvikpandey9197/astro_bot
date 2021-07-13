const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'guilds',
    category: 'Owner-Only',
  

    run: async(client, message, args) => {
              if(message.author.id !== '775616483363258388') return message.channel.send('This is an owner only command.')
        
        message.channel.send(`Hello sunny, Im in ${client.guilds.cache.size} servers`)
    },
};