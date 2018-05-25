const bot = require("../discordbot.js");

const Discord = require("discord.js");
const config = require("../botconfig.json")
console.log("Kickanator 2000 is online!");

module.exports.run = async (bot, message, args) => {

  		let kUser = message.mentions.members.first();
  		let kReason = args.slice(1).join(" ");
  		if(!kUser) return message.channel.send("Can't find user");
  		if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("I can't do that for ya mate!");
  		if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("I can't do that for you");

  		let kEmbed = new Discord.RichEmbed()
  		.setDescription("~A User has been kicked!~")
  		.setColor("#ffee93")
  		.addField("Kicked user", `${kUser} with ID ${kUser.id}`)
  		.addField("Kicked by", `<@${message.author.id}> with ID ${message.author.id}`)
  		.addField("Kicked in", message.channel)
  		.addField("Time:", message.createdAt)
  		.addField("Reason", kReason);


  		let kickChannel = message.guild.channels.find(`name`, "kicks" || "kicks/bans" || "kicks-bans" || "logs");
  		if(!kickChannel) return message.channel.send("Can't find a Kicks/Bans channel");

  		message.guild.member(kUser).kick(kReason);
  		kickChannel.send(kEmbed);
  		console.log(`${kUser} just got kicked!`);

  		return;
}


module.exports.help = {
  name: "kick"
}
