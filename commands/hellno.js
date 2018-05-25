const bot = require("../discordbot.js");

const Discord = require("discord.js");
const config = require("../botconfig.json")
console.log("Hellno is online!");

module.exports.run = async (bot, message, args) => {

  let replies = ["No!", "Nani?", "GAYY", "bish what?", "Whaa?", "Why do you do you do this to me?"];
  let result = Math.floor((Math.random() * replies.length));

  let HNEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.tag)
  .setColor("#000002")
  .addField("No.", replies[result]);
  console.log(`${message.author} just told the bot hell no, and the bot's reply was: ${result}`);

  message.channel.send(HNEmbed);
}


module.exports.help = {
  name: "hellno"
}
