const { MessageEmbed } = require('discord.js')
const donation_user_data = require('../../models/donation')
const formatter = require('../../utilities/formatNumber')

module.exports = {
    name: 'donationlb',
    aliases: ['dlb' , 'donation-lb' , 'lb'],
    description: "",
    run: async (client, message, args) => {

        let emoji;

        const donation_data = await donation_user_data.find({
            serverID: message.guild.id
        }).sort([
            ['donation', 'descending']
        ]).exec()

        const donation_data_sliced = donation_data.slice(0, 10)

        if (donation_data_sliced.length < 1) return message.channel.send("No one is in the leaderboard yet")

        const computed_array = []

        for (const key of donation_data_sliced) {
            const user = await client.users.fetch(key.userID) || { username: "Invalid User"}
            const position = donation_data_sliced.findIndex(i => i.serverID === key.serverID && i.userID === key.userID) + 1
            if (position === 1) {
                emoji = "<:ad_1:863998410264412161>"
            }
            else if (position === 2) {
                emoji = "<:ad_2:863998438748586046>"
            }
            else if (position === 3) {
                emoji = "<:ad_3:863998515267895316>"
            }
            else if (position === 4) {
                emoji = "<:ad_4:863998537326133259>"
            }
            else if (position === 5) {
                emoji = "<:ad_5:863998571962302484>"
            }
            else if (position === 6) {
                emoji = "<:ad_6:863998620898164746>"
            }
            else if (position === 7) {
                emoji = "<:ad_7:863998645934489640>"
            }
            else if (position === 8) {
                emoji = "<:ad_8:863998681794347030>"
            }
            else if (position === 9) {
                emoji = "<:ad_9:863998707393626163>"
            }
            else if (position === 10) {
                emoji = "<:ad_10:863998741664366613>"
            }
            computed_array.push({
                donation: key.donation,
                username: user.username,
                emoji: emoji,
                position: position
            })
        }

        const leaderboard = computed_array.map(e => ` ${e.emoji} • **${e.username}** -> **${formatter.func1(e.donation)}** donation `)

        const embed = new MessageEmbed()
        .setAuthor("• DONATION LEADERBOARD •")
        .setColor(Math.floor(Math.random() * 1677735))
        .setDescription(leaderboard)

        message.channel.send(embed)

    }
}