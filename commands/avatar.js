const Discord = require("discord.js");
const config = require("../botconfig.json")
console.log("Avatar is online!");

module.exports.run = async (bot, message, args) => {
  let avatar = message.author.displayAvatarURL;

  let aEmbed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setImage(avatar);


  message.channel.send(aEmbed);

}


module.exports.help = {
  name: "avatar"
}
