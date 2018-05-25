const bot = require("../discordbot.js");

const Discord = require("discord.js");
const config = require("../botconfig.json")
console.log("Clear is online!");

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You aren't allowed to do that!");
  if(!args[0]) return message.channel.send("Please specify a number")
  message.delete(1);
  message.channel.bulkDelete(args[0]).then(() =>{
  message.channel.send(`Cleared ${args[0]} messages!`).then(msg => msg.delete(10000))
  });
  console.log(`${message.author} deleted ${args[0]} messages!`);
}


module.exports.help = {
  name: "clear"
}
