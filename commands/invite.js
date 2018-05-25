const Discord = require("discord.js");
const config = require("../botconfig.json")
console.log("Invite bot is online!");

module.exports.run = async (bot, message, args) => {
  message.member.send("You can add the bot via the following link: https://discordapp.com/oauth2/authorize?client_id=396382966022144000&scope=bot&permissions=2146958583 ")
  console.log(`${message.author} just asked for my invitation link in "${message.guild.name}"`);
}

module.exports.help = {
  name: "invitebot"
}
