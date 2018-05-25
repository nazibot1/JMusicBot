const Discord = require("discord.js");
const bot = require("../discordbot.js");

const config = require("../botconfig.json")
console.log("rcolor is online!");

module.exports.run = async (bot, message, args) => {
	message.react('😂');
  let r1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j",  "k", "l", "z", "x", "c", "v", "b", "n", "m", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ];

  let p1 = r1[Math.floor((Math.random() * r1.length))];
  let p2 = r1[Math.floor((Math.random() * r1.length))];
  let p3 = r1[Math.floor((Math.random() * r1.length))];
  let p4 = r1[Math.floor((Math.random() * r1.length))];
  let p5 = r1[Math.floor((Math.random() * r1.length))];
  let p6 = r1[Math.floor((Math.random() * r1.length))];
  let result = ("#" + p1 + p2 + p3 + p4 + p5 + p6);


  let hex = new Discord.RichEmbed()
  .setAuthor(message.author.tag)
  .setColor(result)
  .addField("Your random color is:", result)
  .addField("Color preview", "The bar on the left is the preview");

  message.channel.send(hex);
  console.log(`${message.author} asked for random hex color in ${message.guilds.name} and got ${result}`)
}


module.exports.help = {
  name: "rcolor"
}
