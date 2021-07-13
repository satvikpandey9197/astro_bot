const db = require('../../models/donation')
const { Client, Message, MessageEmbed } = require('discord.js');
const donation_data = require('../../models/donation')
const formatter = require('../../utilities/formatNumber')
module.exports = {
    name: 'myd',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        let target = message.mentions.users.first() || message.author

        const dd = await donation_data.findOne({
            userID: target.id,
            serverID: message.guild.id
        })

        message.channel.send(`${target} Donation is -> **${formatter.func1(dd.donation)}**`)
    }
}