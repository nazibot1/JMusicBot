const Discord = require("discord.js");
const config = require("../botconfig.json")
console.log("botinfo is online!");

module.exports.run = async (bot, message, args) => {
  console.log(`${message.author} just asked for my info in ${message.guild.name}`)

  let bicon = bot.user.displayAvatarURL;
  const botEmbed = new Discord.RichEmbed()
  .setDescription("Bot information")
  .setColor("#e55319")
  .setThumbnail(bicon)
  .addField("Bot Name", bot.user.username)
  .addField("Created on", bot.user.createdAt);

  return message.channel.send(botEmbed);

}


module.exports.help = {
  name: "botinfo"
}
