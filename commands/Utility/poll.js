const Discord = require('discord.js')
const default_prefix = require('../../botconfig.json')
const db = require('quick.db')
module.exports = {
  name: 'poll',
aliases: ["p"], 
category: "Utility",
description: "Creates a Poll",
  run: async(bot, message, args, prefix) => {  

    let p = db.get(`prefix_${message.guild.id}`);
    if (p === null) prefix = default_prefix;    

        const embd = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("Poll")
        .setDescription(`Starts a poll. \`Min Choices: 2\` **|** \`Max Choices: 9\`)`)
        .addField("Usage", `\ ${p}poll <message> | <choice 1> | <choice 2>\``        
 )
 .addField("Example", `\`${p}poll Test Poll | Test Option 1 XD | Test option 2 lol\``)
 if(!args.length) return message.reply(embd);

const content = args.join(" ").split("|");
const title = content[0];
const poll = content.slice(1);
if(!content.length || !title || !poll.length || poll.length < 2 || poll.length > 9) {
        return message.reply(embd)
        }
let emojis = [
'1️⃣', 
    '2️⃣',
    '3️⃣',
    '4️⃣',
    '5️⃣',
    '6️⃣',
    '7️⃣',
    '8️⃣',
    '9️⃣'
]
 
let index = 0;
let final = "";
let react = [];
poll.forEach(async p => {

final += `${emojis[index]} ${p}\n\n`;
react.push(emojis[index])
index++
}) 


const embed = new Discord.MessageEmbed() 
.setTitle(title)
.setDescription(final)
.setColor("BLUE")
.setTimestamp() 
.setFooter(`Poll by ${message.author.tag}`)
const msg = await message.channel.send(`<:vote:829570067616366613> **POLL**`, embed)


react.forEach(async e => {
await msg.react(e)
}) 

}
}
 
