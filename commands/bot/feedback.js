const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: 'feedback',
  category: 'bot',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
  const feedchannel = client.channels.cache.get('848766548347846676');
    const query = args.join(" ");
    if(!query) return message.reply('Please tell me the feedback')

    const reportEmbed = new MessageEmbed()
    .setTitle(`New Feedback!`)
    .addField('Author', message.author.toString(), true)
    .addField('Guild', message.guild.name, true)
    .addField('Feedback Messages', query)
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    .setColor('BLUE')
    .setTimestamp();

    message.channel.send(
      new MessageEmbed()
      .setDescription(`<:praytosunny:847727687497547776> Thanks For the feedback!`)
      .setColor('GREEN')
    )
        feedchannel.send(reportEmbed);
    
  }
}