const db = require("quick.db")
const discord = require("discord.js")

module.exports = {
  name: "status",
  description: "Change the bot status",
  usage: "status <here>",
  category: "owner",
 
  run: async (client, message, args) => {
              if(message.author.id !== '775616483363258388') return message.channel.send('This is an owner only command.')
  
    //ARGUMENT
    if(!args.length) {
      return message.channel.send("Please give status message")
    }
    
 db.set(`status`, args.join(" "))
 client.user.setActivity(args.join(" ")); 
 message.channel.send("Updated the bot status")

    
  }
}