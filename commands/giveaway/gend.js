module.exports = {
    name: "gend",
    description: "Ends a giveaway.",
  aliases: ["giveawayend", "g-end", "g-end", "gfinish"],
    usage: "_gend (id)",
    category: "Giveaways",

run: async (client, message, args) => {
  if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(' You need to have the \`MANAGE_MESSAGES\` or `Giveaways` role to end giveaways.');
    } 


    if (!args[0]) {
        return message.channel.send(' Uh oh, I couldn\'t find that message! Try again!');
    }

    let giveaway =
        client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
        client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    if (!giveaway) {
        return message.channel.send(' Hm. I can\'t seem to find a giveaway for `' + args.join(' ') + '`.');
    }
    client.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    })
        .then(() => {
            message.channel.send('Giveaway will end in less than ' + (client.giveawaysManager.options.updateCountdownEvery / 1000) + ' seconds...');
        })
        .catch((e) => {
            if (e.startsWith(`Giveaway with message ID ${giveaway.messageID} has already ended.`)) {

                message.channel.send('This giveaway has already ended!');

            } else {
                console.error(e);
                message.channel.send('An error occurred...');
            }
        });
},
}