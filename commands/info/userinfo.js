const Discord = require('discord.js');

const moment = require("moment");

const DEVICES = {
    web: "🌐",
    desktop: "💻",
    mobile: "📱"
};

const BADGES = {
    "DISCORD_EMPLOYEE": "<:discordEmployee:839837628077047818> ",
    "DISCORD_PARTNER": " <a:discord_partner:839837812047216680>",
    "BUGHUNTER_LEVEL_1": " <:DiscordBugHunter:839838301463773224> ",
    "HYPESQUAD_EVENTS": " <a:bot_badgehypesquadevents:839838678124593182> ",
    "HOUSE_BRAVERY": "<:bravery:839839099665645608> ",
    "HOUSE_BRILLIANCE": " <:hypesquadBrilliance:839839365706154014> ",
    "HOUSE_BALANCE": " <:HypesquadBalance:839839286907633664> ",
    "EARLY_SUPPORTER": "<:earlySupporter:839839515110932520>",
    "VERIFIED_BOT": "<:bot:825624590645592075>",
    "VERIFIED_DEVELOPER": " <:BotDev:829395443443957791> "
};

const STATUSES = {
    "online": "<:online:825623898581893140>",
    "idle": "<:Idle:825623680524484608>",
    "dnd": "<:dnd:825623531269128213>",
    "streaming": "<:CH_StatusStreaming:839841584060301353>",
    "offline": "<:offline2:825623233130266624>"
}




module.exports = {
    name: "userinfo",
    aliases: ["uinfo", "ui"],
    category: "Info",


    run: async (bot, message, args) => {

        const member = message.mentions.members.last() || message.guild.members.cache.get(args[0]) || message.member;

        const trimArray = (arr, maxLen = 10) => {
            if (arr.length > maxLen) {
                const len = arr.length - maxLen;
                arr = arr.slice(0, maxLen);
                arr.push(` and ${len} more roles...`);
            }
            return arr;
        }

        const upperCase = str => {
            return str.toUpperCase().replace(/_/g, " ").split(" ")
                .join(" ")
        }

        const titleCase = str => {
            return str.toLowerCase().split(" ")
                .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
                .join(" ")
        }

        const roles = member.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0, -1);

        let userFlags;
        if (member.user.flags === null) {
            userFlags = ''
        } else {
            userFlags = member.user.flags.toArray();
        }
        if (member.user.presence.status == "offline") { userDevice = "" } else if (!member.user.bot) { userDevice = DEVICES[Object.keys(member.user.presence.clientStatus)[0]] } else if (member.user.bot) { userDevice = "" }
        if (!member.user.bot) { userInfo = "No" } else if (member.user.bot) { userInfo = "Yes" }
        if (member.user.presence.status == "dnd") { status = "DND" } else status = titleCase(member.user.presence.status)

        const embed = new Discord.MessageEmbed()
            .setAuthor(`${member.user.tag} ${userDevice}`, member.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .addFields(
                { name: "User Badges", value: `${userFlags.length ? userFlags.map(flag => BADGES[flag]).join("") : "None"}`, inline: false },
                { name: "Joined Discord", value: `${moment(member.user.createdTimestamp).format("DD MMM YYYY")}`, inline: true },
                { name: "Joined Server", value: `${moment(member.joinedAt).format("DD MMM YYYY")}`, inline: true },
                { name: "Nickname", value: `${member.displayName}` || "None", inline: true },
                { name: "Discriminator", value: `${member.user.discriminator}`, inline: true },
                { name: "Bot", value: `${userInfo}`, inline: true },
                { name: "Status", value: `${status}${STATUSES[member.user.presence.status]}`, inline: true },
                { name: "User Colour", value: `${upperCase(member.displayHexColor)}`, inline: true },
                { name: "User ID", value: `${member.user.id}`, inline: true },
                { name: "Highest Role", value: `${member.roles.highest.id === message.guild.id ? "None" : member.roles.highest}`, inline: true },
                { name: "Roles", value: `${roles.length < 10 ? roles.join(", ") : roles.length > 10 ? trimArray(roles).join(", ") : "None"}`, inline: false }
            )
            .setColor(`${member.displayHexColor || RANDOM}`)
        message.channel.send(embed)
    }
}
