const Discord = require("discord.js");
const config = require("../botconfig.json")
console.log("Serverinfo is online!");

module.exports.run = async (bot, message, args) => {

  console.log("Someone asked for the server information");
  let sicon = message.guild.iconURL;
  let serverembed = new Discord.RichEmbed()
  .setDescription("!!!Server Information!!!")
  .setColor("#15ff00")
  .setThumbnail(sicon)
  .addField("Server name", message.guild.name, true)
  .addField("Created on", message.guild.createdAt)
  .addField("You joined on", message.member.joinedAt)
  .addField("Total members:", message.guild.memberCount, true)
  return message.channel.send(serverembed);
}


module.exports.help = {
  name: "serverinfo"
}
