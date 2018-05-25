const bot = require("../discordbot.js");

const Discord = require("discord.js");
const config = require("../botconfig.json")
console.log("Patreon is online!");

module.exports.run = async (bot, message, args) => {
    message.member.send(`My patreon is: https://www.patreon.com/Juptian`);
    console.log(`${message.author} just asked for my patreon link in ${message.guild.name}`);
}


module.exports.help = {
  name: "patreon"
}
