
const Discord = require('discord.js')

module.exports = {
    name : 'rr',

    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        message.delete()
        if(!message.member.hasPermission("ATTACH_FILES")) return;
        const channel = message.channel;
        const heistping = message.guild.roles.cache.find(role => role.name === "○ Heist Ping");
        const outsideping = message.guild.roles.cache.find(role => role.name === "○ Outside Heist Ping!");
        const eventping = message.guild.roles.cache.find(role => role.name === "○ Events Ping");
        const AnnouncementPing = message.guild.roles.cache.find(role => role.name === "○ Announcement Ping");
        const smallheistping = message.guild.roles.cache.find(role => role.name === "○ Small Heists");
        const weeklybolt = message.guild.roles.cache.find(role => role.name === "○ Bolt gw ping");
        const giveawayping = message.guild.roles.cache.find(role => role.name === "○ Giveaway Ping");
        const minigwping = message.guild.roles.cache.find(role => role.name === "○ Mini Gaw ping");
        const nitrogiveaway = message.guild.roles.cache.find(role => role.name === "○ Nitro Giveaway");
 
        const heistpingemoji = '🏦';
        const outsidepingemoji = '🤑';
        const eventpingemoji = '💰';
        const AnnouncementPingemoji = '📢';
        const smallheistpingemoji = '💸';
        const giveawaypingemoji = '🎉';
        const minigwpingemoji = '🎁';
        const nitrogiveawayemoji = '💎';
        const weeklyboltemoji = '✂';
 
        let embed = new Discord.MessageEmbed()
            .setColor('#e42643')
            .setTitle('🌟 Self Roles 🌟')
            .setDescription('React Below To Gain Self Roles\n\n'
                + `${heistpingemoji}        -> <@&779258123725963264>\n`
                + `${outsidepingemoji}      -> <@&818794509273268255>\n`
                + `${eventpingemoji}        -> <@&778944637028270090>\n`
                + `${AnnouncementPingemoji} -> <@&790078227254607903>\n`
                + `${smallheistpingemoji}   -> <@&836571067698774046>\n`
                + `${giveawaypingemoji}     -> <@&778944637028270093>\n`
                + `${minigwpingemoji}       -> <@&836571076653875230>\n`
                + `${nitrogiveawayemoji}    -> <@&822687296326467585>\n`
                + `${weeklyboltemoji}       -> <@&859334775898898452>`);
 
        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(heistpingemoji);
        messageEmbed.react(outsidepingemoji);
        messageEmbed.react(eventpingemoji);
        messageEmbed.react(AnnouncementPingemoji);
        messageEmbed.react(smallheistpingemoji);
        messageEmbed.react(giveawaypingemoji);
        messageEmbed.react(minigwpingemoji);
        messageEmbed.react(nitrogiveawayemoji);
        messageEmbed.react(weeklyboltemoji);
 
        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === heistpingemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(heistping);
                }
                if (reaction.emoji.name === outsidepingemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(outsideping);
                }
                if (reaction.emoji.name === eventpingemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(eventping);
                }
                if (reaction.emoji.name === AnnouncementPingemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(AnnouncementPing);
                }
                if (reaction.emoji.name === smallheistpingemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(smallheistping);
                }
                if (reaction.emoji.name === giveawaypingemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(giveawayping);
                }
                if (reaction.emoji.name === minigwpingemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(minigwping);
                }
                if (reaction.emoji.name === nitrogiveawayemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(nitrogiveaway);
                }
                if (reaction.emoji.name === weeklyboltemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(weeklybolt);
                }
            } else {
                return;
            }
 
        });
 
        client.on('messageReactionRemove', async (reaction, user) => {
 
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === heistpingemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(heistping);
                }
                if (reaction.emoji.name === outsidepingemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(outsideping);
                }
                if (reaction.emoji.name === eventpingemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(eventping);
                }
                if (reaction.emoji.name === AnnouncementPingemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(AnnouncementPing);
                }
                if (reaction.emoji.name === smallheistpingemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(smallheistping);
                }
                if (reaction.emoji.name === giveawaypingemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(giveawayping);
                }
                if (reaction.emoji.name === minigwpingemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(minigwping);
                }
                if (reaction.emoji.name === nitrogiveawayemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(nitrogiveaway);
                }
                if (reaction.emoji.name === weeklyboltemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(weeklybolt);
                }
            } else {
                return;
            }
        });
    }}