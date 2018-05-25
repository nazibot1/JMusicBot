const bot = require("../discordbot.js");

const Discord = require("discord.js");
const config = require("../botconfig.json")
console.log("Ban is online!");

module.exports.run = async (bot, message, args) => {

  let bUser = message.mentions.members.first();
  let bReason = args.join(" ").slice(22);
  if(!bUser) return message.channel.send("Can't find user");
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("I can't do that for ya mate!");
  if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("Thy mustn't attempt to kick Moderators");


  let bEmbed = new Discord.RichEmbed()
  .setDescription("~A User has been BANNED!~")
  .setColor("#700900")
  .addField("Banned user", `${bUser} with ID ${bUser.id}`)
  .addField("Banned by", `<@${message.author.id}> with ID ${message.author.id}`)
  .addField("Banned in", message.channel)
  .addField("Time:", message.createdAt)
  .addField("Reason", bReason);


  let banChannel = message.guild.channels.find(`name`, "bans" || "kicks/bans" || "kicks-bans" || "logs");
  if(!banChannel) return message.channel.send("Can't find a Kicks/Bans channel");

  message.guild.member(bUser).ban(bReason);
  banChannel.send(bEmbed);
  console.log(`${bUser} has been banned!`);

  return;
}

module.exports.help = {
  name: "ban"
}
