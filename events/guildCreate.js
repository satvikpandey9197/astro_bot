const Discord = require('discord.js');

exports.run = async (bot , guild) => {
	const channel = await bot.channels.cache.get('842048754235867156');
	const m = new Discord.MessageEmbed()
		.setTitle(`Joined ${guild.name}`)
		.setFooter(`Total servers : ${bot.guilds.cache.size} | Members : ${guild.memberCount} `)
		.setColor('GREEN');
	channel.send(m);
};