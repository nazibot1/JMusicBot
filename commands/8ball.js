const Discord = require("discord.js");
const bot = require("../discordbot.js");

const config = require("../botconfig.json")
console.log("8ball is online!");

module.exports.run = async (bot, message, args) => {
	message.react('💣');
  if(!args[1]) return message.reply("Please ask a full question");
  let replies = ["Yes.", "No!", "I don't know", "Please specify", "Whaa?", "Why do you do you do this to me?"];

  let result = Math.floor((Math.random() * replies.length));

  let question = args.slice(0).join(" ");

  let ballEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.tag)
  .setColor("#000000")
  .addField("💣Question💣", question)
  .addField("💥Answer💥", replies[result]);

  message.channel.send(ballEmbed);
  console.log(`${message.author} ask ${question} and got ${result}`)
}


module.exports.help = {
  name: "8ball"
}
