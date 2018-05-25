const Discord = require("discord.js");
const config = require("../botconfig.json")
console.log("Leave is online!");

module.exports.run = async (bot, message, args) => {
  if(!message.author.id === "395248246529851405") message.channel.send("You aren't my owner.");
  let reason = args.slice(0).join(" ")
  message.channel.send("My owner requested me to leave this server. Therefor I must leave. Bye! His reason is:" + " " + reason);
  message.guild.leave();
}

module.exports.help = {
  name: "leave"
}
