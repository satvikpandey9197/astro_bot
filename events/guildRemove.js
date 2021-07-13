const Discord = require('discord.js');

exports.run = async (bot , guild) => {
	const channel = await bot.channels.cache.get('842048754235867156');
	const m = new Discord.MessageEmbed()
		.setTitle(`Left ${guild.name}`)
		.setFooter(`Total servers : ${bot.guilds.cache.size} | Members : ${guild.memberCount} | Owner: ${guild.owner}`)
		.setColor('RED');
	channel.send(m);
};