const bot = require("../discordbot.js");

const Discord = require("discord.js");
const config = require("../botconfig.json")
console.log("Report is online!");

module.exports.run = async (bot, message, args) => {

  let rUser = message.mentions.members.first();
  if(!rUser) return message.channel.send("Couldn't find user.");
  let reason = args.slice(1).join(" ");
  if(rUser === "396382966022144000") return;
  if(rUser.id === message.author.id) return;

  let reportEmbed = new Discord.RichEmbed()
  .setDescription("Reports")
  .setColor("15f153")
  .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
  .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
  .addField("Channel", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", reason);

  let reportschannel = message.guild.channels.find(`name`, "reports");
  if(!reportschannel) return message.channel.send("Couldn't find reports channel.");


  message.delete().catch(O_o=>{});
  reportschannel.send(reportEmbed);
  console.log(`${rUser} just got reported for "${reason}"`);

  return;
}


module.exports.help = {
  name: "report"
}
