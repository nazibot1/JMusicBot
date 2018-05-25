const bot = require("../discordbot.js");
const ms = require("ms");
const Discord = require("discord.js");
const config = require("../botconfig.json")
console.log("Ping is online!");

module.exports.run = async (bot, message, args) => {
  let Pembed = new Discord.RichEmbed()
  .setTitle("Pong")
  .setColor("ffejff")
  .addField("My ping is", bot.ping);

  message.channel.send(Pembed);

  console.log(`${message.author} wants my ping in "${message.guild.name}" and it is: ${bot.ping}`);

}


module.exports.help = {
  name: "ping"
}
