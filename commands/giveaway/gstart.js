const ms = require("../../utilities/ms.js");
const emojis = require("../../utilities/emojis.json");
const db = require('quick.db');
module.exports = {
  name: "gstart",
  aliases: ["gs", "giveawaystart", "g-start", "giveaway", "gcreate"],
  description: "Starts a giveaway!",
run: async(client, message, args) => { 
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(' You need to have the `MANAGE_MESSAGE`Permissions or `Giveaways` role to start giveaways.');
    }
    let prefix = db.get(`prefix_${message.guild.id}`);
    if (prefix === null) prefix = '_';

    let time = args[0];
    if (!time)
      return message.reply(
 
        `You need to mention the giveaway time as well! \n Ex: \`${prefix}gstart 1d 1w Discord Nitro\``,

        [
          {
            name: "Time Values",
            value:
              "TiS = second.\nH = hour. \n D = day. \n W = week. \n These do not have to be in capital. \n **Remember**, a giveaway can only last 20 days maximum.",
          },
          {
            name: "Winner Values",
            value:
              "W stands for winner. **Remember**, the maximum giveaway winner count should be less than 15.",
          },
        ]
      );
    if (ms(time) > ms("30d"))
      return message.reply(
        `The giveaway duration has to be lesser than 30 days. \n Ex: \`${prefix}gstart 1d 1w Discord Nitro\``,
        [
          {
            name: "Time Values",
            value:
              "TiS = second.\nH = hour. \n D = day. \n W = week. \n These do not have to be in capital.",
          },
          {
            name: "Winner Values",
            value:
              "W stands for winner. **Remember**, the maximum giveaway winner count should be less than 15.",
          },
        ]
      );
    let winners = args[1] && args[1].toLowerCase().endsWith('w') ? +(args[1].split('w')[0]) : +args[1];
    if (!winners)
      return message.reply(

        `Please provide a valid winner count! \n Ex: \`${prefix}gstart 1d 1w Discord Nitro\``,

        [
          {
            name: "Time Values",
            value:
              "TiS = second.\nH = hour. \n D = day. \n W = week. \n These do not have to be in capital. \n **Remember**, a giveaway can only last 20 days maximum.",
          },
          {
            name: "Winner Values",
            value:
              "W stands for winner. **Remember**, the maximum giveaway winner count should be less than 15.",
          },
        ]
      );
    if (winners > 100)
      return message.reply(

        `The giveaway winners should be lesser than 100 . \n Ex: \`${prefix}gstart 1d 8w Discord Nitro\``,

        [
          {
            name: "Time Values",
            value:
              "TiS = second.\nH = hour. \n D = day. \n W = week. \n These do not have to be in capital. \n **Remember**, a giveaway can only last 30 days maximum.",
          },
          {
            name: "Winner Values",
            value: "W stands for winner.",
          },
        ]
      );
 
      let role = null;
      if (!args[2])
        return message.reply(
          "Please provide a required role for this giveaway, or if you want none just type none."
        );
       role =
      message.mentions.roles.first() || message.guild.roles.cache.get(args[2]) ||
      message.guild.roles.cache.find((role) => role.name == args[2]) ||
      message.guild.roles.cache.find((role) => role.name.includes(args[0]));

    if (!role && !args[2].toLowerCase().startsWith("none"))
      return message.reply(
        "Please check if the role you provided exists, or if you spelled none wrong."
      );
      if (args[2].toLowerCase().startsWith("none")) {
        role = null;
      }

    let prize = args.slice(3).join(" ");
    if (!prize)
      return message.reply(

        `Please mention a valid giveaway prize! \n Ex: \`${prefix}gstart 1d 1w Discord Nitro\``,

        [
          {
            name: "Time Values",
            value:
              "TiS = second.\nH = hour. \n D = day. \n W = week. \n These do not have to be in capital. \n **Remember**, a giveaway can only last 20 days maximum.",
          },
          {
            name: "Winner Values",
            value:
              "W stands for winner. **Remember**, the maximum giveaway winner count should be less than 15.",
          },
        ]
      );

       client.giveawaysManager.start(message.channel, {
      time: ms(time),
      winnerCount: winners,
      prize: prize,
      hostedBy: message.author,
      extraData: {
       role: role == null ? "null" : role.id,
      },
      messages: {
        giveaway: `${emojis.categories.giveaways} **Giveaway** ${emojis.categories.giveaways}`,
        giveawayEnded: "🎊 **Giveaway Ended!** 🎊",
        timeRemaining: "Time left: **{duration}**!",
        inviteToParticipate: 'React with "🎉" to participate!',
        winMessage: "🎊 Congrats, {winners} for winning **{prize}**!",
        embedFooter: `${client.user.tag}`,
        noWinner: "Nobody won because of the invalid participations!",
        hostedBy: `Hosted by: {user} \n ${
          role == null ? "Must join in time" : "Required Role: " + role.toString()
        }`,
        winners: "winner(s)",
        endedAt: "Ended at",
        units: {
          seconds: "seconds",
          minutes: "minutes",
          hours: "hours",
          days: "days",
        },
      },
    });

    if (message.deletable) message.delete();
    return;
  
}
}