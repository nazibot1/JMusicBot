const Discord = require("discord.js");
const config = require("../botconfig.json")
const fs = require("fs");
console.log("Prefix is online!");

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_SERVER")) return message.reply("You aren't allow to do that!");
  if(!args[0] || args[0 == "help"]) return message.reply("Usage: //prefix <requested prefix here>");

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  prefixes[message.guild.id] = {
    prefixes: args[0]
  }

  fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
    if (err) console.log(err)
  });
  let sicon = message.guild.iconURL;
  let pEmbed = new Discord.RichEmbed()
  .setColor("#f24848")
  .setTitle("New prefix!")
  .setDescription(`Prefix is now ${args[0]}`)
  .setThumbnail(sicon);

  message.channel.send(pEmbed);

	console.log(`${message.author.id} just changed the prefix to ${args[0]} in "${message.guild.name}" and the server's ID is: ${message.guild.id}`);
}

module.exports.help = {
  name: "prefix"
}
