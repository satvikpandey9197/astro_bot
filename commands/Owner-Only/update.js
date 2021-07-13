const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'update',

    category: 'Owner-Only',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {

          if(message.author.id !== '775616483363258388') return message.channel.send('This is an owner only command.')
        let mention;

        if(!args.length) return message.channel.send('> Usage: announce <#channel> <message> <.ping ?>');

        const channel = message.mentions.channels.first();
        if(!channel) return message.reply('tell me a channel!');

        if(!args[1]) return message.reply('tell me the new update sunny');

        
        if(args.some((val) => val.toLowerCase() === '.ping')) {
            for (let i = 0; i < args.length; i++ ) {
                if(args[i].toLowerCase() === '.ping') args.splice(i, 1);
            }

            mention = true;
        } else mention = false;

        if(mention === true) channel.send('<@&842241918108172328>');

        channel.send( 
            new MessageEmbed()
                .setTitle('New Update!')
                .setDescription(args.slice(1).join(" "))
                .setTimestamp()
                .setColor('RANDOM')
        )


    }
}