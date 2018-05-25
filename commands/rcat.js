const bot = require("../discordbot.js");

const Discord = require("discord.js");
const config = require("../botconfig.json");
const superagent = require("superagent");
console.log("rcat is online!");

module.exports.run = async (bot, message, args) => {

  let {body} = await superagent
  .get(`http://aws.random.cat//meow`);


  let catEmbed = new Discord.RichEmbed()
  .setColor("#42e5f4")
  .setTitle(":cat:Random cat photo!:cat:")
  .setImage(body.url);

  message.channel.send(catEmbed);
  console.log(`${message.author} requested for some cat photos in ${message.guild.name}`);
}


module.exports.help = {
  name: "rcat"
}
