const Discord = require('discord.js')
const db = require("quick.db")

const { ownerID, guildID, default_prefix } = require("../botconfig.json");

let cooldown = {}

module.exports = {


  run: async (client, message , member) => {
 
   if (message.author.bot) return;
    if (!message.guild) return;

      
    let prefix = db.get(`prefix_${message.guild.id}`);
    if (prefix === null) prefix = default_prefix;
 


	// check if user is blacklisted
  const donation_model = require('../models/donation')

  const donation = await donation_model.findOne({
    userID: message.author.id,
    serverID: message.guild.id
  }, async (err, donation) => {
    if (err) console.log(err)
    if (!donation) {
        const new_donation = new donation_model({
            userID: message.author.id,
            serverID: message.guild.id,
            donation: 0,
  
        }) 
  
        new_donation.save().catch((err) => console.log(err)).then(console.log("DATA ADDED"))
    }
  }) 
  
  



      	if (!message.author.bot && message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
		const m = new Discord.MessageEmbed()
			.setTitle('Hi, I\'m Astro !')
			.setDescription('A bot made by sunny')
			.addField('Prefix and Usage', 'My prefix is ' + `\`${prefix}\`` + `\n *Run \`${prefix}help\` to get started! | use \`${prefix}prefix <prefix>\` to change prefix!*`)
			.addField('Invites :', '[Support server](https://discord.gg/AdsefEUP) | [Bot invite](https://discord.com/oauth2/authorize?client_id=839403958341730314&scope=bot&permissions=1342177310)')
			.setColor('RANDOM');
		message.channel.send(m);
	}
// require the file
const blacklist = require('../models/blacklist')


// replace the files accordingly
 if (!message.content.startsWith(prefix)) return;
      

      
 blacklist.findOne({ id : message.author.id }, async(err, data) => {
 if(err) throw err;
        if(!data) {
   if (!message.guild) return;
    if (!message.member)
      message.member = await message.guild.members.fetch(message);

    const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let cmdx = db.get(`cmd_${message.guild.id}`)

    if (cmdx) {
      let cmdy = cmdx.find(x => x.name === cmd)
      if (cmdy) message.channel.send(cmdy.responce)
    }

    // Get the command
    let command = client.commands.get(cmd);
    // If none is found, try to find it by alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));
               if (command) command.run(client, message, args);
 } else {
            message.channel.send('You are blacklisted!')
        }
    })



  }
}


//-------------------------------------------- F U N C T I O N ------------------------------------------
