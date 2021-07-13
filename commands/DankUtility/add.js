const { MessageEmbed } = require('discord.js')
const donation_user_data = require('../../models/donation')
const ms = require('ms')
const formatter = require('../../utilities/formatNumber')

module.exports = {
    name: "add",
    aliases: ['add-donation'],
    description: "Allows you to add donations",
    run: async (client, message, args) => {
        if(!message.member.hasPermission("MANAGE_SERVER")) return;
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.channel.send('User not found.')
        let newdonation = Math.round(parseFloat(args[1]));
        if(!newdonation) return message.channel.send('how much u want to add in there donation ?')



        const donation = await donation_user_data.findOne({
            userID: user.id,
            serverID: message.guild.id
        }, async (err, data) => {
            if (err) console.log(err)
          
                    const embed = new MessageEmbed()
                    .setColor(Math.floor(Math.random() * 1677735))
                    .setDescription(`Successfully Added **${formatter.func1(newdonation)}** To ${user} `)

                    data.donation += newdonation
                    data.save().catch((err) => console.log(err)).then(message.channel.send(embed))
                
            
        })


    }
}
