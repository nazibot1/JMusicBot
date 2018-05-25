const Discord = require("discord.js");
const bot = require("../discordbot.js");

const config = require("../botconfig.json")
console.log("slap is online!");

module.exports.run = async (bot, message, args) => {
	message.react('💫');
  let sUser = message.mentions.members.first();
  let slapper = message.author;
  let slapEmbed = new Discord.RichEmbed()
  .setDescription(`${slapper} just slapped ${sUser}`)
  .setColor("#f4c141")
  .setImage('https://cdn.discordapp.com/attachments/444289205888221185/444292338383323136/penguinslap.gif');

  message.channel.send(slapEmbed).then(msg => msg.delete(20000));

  console.log(`${slapper} just slapped ${sUser}`);
}


module.exports.help = {
  name: "slap"
}
