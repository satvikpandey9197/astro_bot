const ms = require('ms');
const config = require("../../botconfig.json")
module.exports = {
   
        name: "greroll",
        description: "Rerolls a giveaway.",
      aliases: [ "giveawayreroll", "g-reroll", "gr", "givereroll"],
        usage: "_greroll (gw id)",
        category: "Giveaways",

    
    run: async (client, message, args) => {
  if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(' You need to have the \`MANAGE_MESSAGES\` or `Giveaways` role to reroll giveaways.');
    } 

        if (!args[0]) {
            return message.channel.send(' Uh, I couldn\'t find that message! Try again!');
        }

        let giveaway =
            client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
            client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        if (!giveaway) {
            return message.channel.send(' Hmm. I can\'t seem to find a giveaway for `' + args.join(' ') + '`.');
        }

        client.giveawaysManager.reroll(giveaway.messageID)
            .then(() => {
                message.channel.send('Giveaway rerolled!');
            })
            .catch((e) => {
                if (e.startsWith(`Giveaway with message ID ${giveaway.messageID} has not ended.`)) {
                    message.channel.send('This giveaway has not ended!');
                } else {
                    console.error(e);
                    message.channel.send('An error occurred...');
                }
            });
    },
}