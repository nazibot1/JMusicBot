const bot = require("../discordbot.js");

const Discord = require("discord.js");
const config = require("../botconfig.json");
const superagent = require("superagent");
console.log("Rdog is online!");

module.exports.run = async (bot, message, args) => {

  let {body} = await superagent
  .get(`https://random.dog/woof.json`);


  let dogEmbed = new Discord.RichEmbed()
  .setColor("#42e5f4")
  .setTitle(":dog:Random dog photo!:dog:")
  .setImage(body.url);

  message.channel.send(dogEmbed);
  console.log("Someone loves adorable doggos!");
}


module.exports.help = {
  name: "rdog"
}
