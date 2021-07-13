const { Client, Collection , MessageEmbed} = require("discord.js");
const  { token }  = require("./botconfig.json");
const fs = require("fs");
const mongoose = require('mongoose');
const Discord = require('discord.js');

const client = new Client({
    disableEveryone: true,

})

const giveawaysManager = require("./utilities/giveaway");
client.giveawaysManager = new giveawaysManager(client, {
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        embedColor: "#ADD8E6",
        reaction: "🎉"
    }
});

client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
   
      const role = member.guild.roles.cache.get(giveaway.extraData.role);  
    if (
      giveaway.extraData.role !== "null" &&
      !member.roles.cache.get(giveaway.extraData.role)
    ) {
      reaction.users.remove(member.user);
      member.send({
        embed: {
          title: "Requirement failed.",
          description: `You must have the role \`${role.name}\` to participate in that giveaway.`,
        },
      });
    }
});
client.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
  
});

client.giveawaysManager.on("giveawayEnded", (giveaway, winners) => {

});


mongoose.connect('mongodb+srv://satvikpandey:satvikpandey@68@cluster0.9zg61.mongodb.net/Data',{
  useUnifiedTopology : true,
  useNewUrlParser: true,
 useFindAndModify: false,
}).then(console.log("connecte to mongo db!"))


client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");



["command", "events"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});


// replace the files accordinglyclient.on('ready', () => {

    client.on('ready', () => {
      console.log(`
      ░█████     ███████  ██████████ ████████     ████████
      ██╔══██    ██           ██     ██    ██     ██    ██
      ███████    ███████      ██     ████████     ██    ██
      ██╔══██║        ██      ██     ██ ██        ██    ██
      ██║░░██║  ████████      ██     ██    ██     ████████
                                               `);
})

client.login(token);

