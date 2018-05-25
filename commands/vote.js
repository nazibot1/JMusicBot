const Discord = require("discord.js");
const config = require("../botconfig.json")
console.log("vote is online!");

module.exports.run = async (bot, message, args) => {
	console.log(`${message.author} wants to vote for me!`);
	message.react("👍");
	message.member.send("Vote for me here: https://discordbots.org/bot/396382966022144000");
}

module.exports.help = {
  name: "vote"
}
