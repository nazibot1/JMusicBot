const Discord = require("discord.js");
const bot = require("../discordbot.js");

const config = require("../botconfig.json")
console.log("hug is online!");

module.exports.run = async (bot, message, args) => {
  message.delete();
  let sUser = message.mentions.members.first();
  let slapper = message.author;
  let slapEmbed = new Discord.RichEmbed()
  .setDescription(`${slapper} just huged! ${sUser}`)
  .setColor("#f44242")
  .setImage('https://cdn.discordapp.com/attachments/443457208923979786/444293685585117194/58d1b_s-200x150.gif');

  message.channel.send(slapEmbed).then(msg => msg.delete(20000))

  console.log(`${slapper} just huged! ${sUser}`);
}


module.exports.help = {
  name: "hug"
}
