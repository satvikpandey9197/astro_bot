const blacklist = require('../../models/blacklist')
const { Message } = require('discord.js')

module.exports = {
    name : 'blacklist',

    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
           if(message.author.id !== '775616483363258388') return message.channel.send('This is an owner only command.')
        const User = message.guild.members.cache.get(args[0])
        if(!User) return message.channel.send('User is not valid.')
        const reason = args.slice(1).join(" ") || "No reason provided";
        blacklist.findOne({ id : User.user.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
                message.channel.send(`**${User.displayName}** has already been blacklisted!`)
            } else {
                data = new blacklist({ id : User.user.id })
                data.save()
                .catch(err => console.log(err))
            message.channel.send(`${User.user.tag} has been added to blacklist.`)
            User.send(`You have been blacklisted by a bot moderator for **${reason}** if u think this is an false blacklist you can appeal it here -> https://discord.gg/6WUtw82e `)
            }
           
        })
    }
}