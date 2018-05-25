const Discord = require("discord.js");
const config = require("../botconfig.json")
console.log("Say is online!");


module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("NIEN");
  let botMessage = args.join(" ");
  message.delete().catch();
  message.channel.send(botMessage);
  console.log(`The bot just said: ${botMessage}`);
}


module.exports.help = {
  name: "say"
}
