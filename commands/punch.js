const Discord = require("discord.js");
const bot = require("../discordbot.js");

const config = require("../botconfig.json")
console.log("punch is online!");

module.exports.run = async (bot, message, args) => {
	message.react('💔');
  let sUser = message.mentions.members.first();
  let slapper = message.author;
  let slapEmbed = new Discord.RichEmbed()
  .setDescription(`${slapper} just beat up ${sUser}`)
  .setColor("#912828")
  .setImage('https://cdn.discordapp.com/attachments/443457208923979786/444294221923614760/pp.gif');

  message.channel.send(slapEmbed);

  console.log(`${slapper} just beat up ${sUser}`);
}


module.exports.help = {
  name: "punch"
}
