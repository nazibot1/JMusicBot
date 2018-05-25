const bot = require("../discordbot.js");

const Discord = require("discord.js");
const config = require("../botconfig.json")
console.log("Removerole is online!");

module.exports.run = async (bot, message, args) => {

  if (!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Sorry, can't do that for you.");
  let rMember = message.mentions.members.first();
  if (!rMember) return message.reply("Couldn't find that user.");
  let role = args.slice(1).join(" ");
  if (!role) return message.reply("Specify a role!");
  let gRole = message.guild.roles.find(`name`, role);
  if (!gRole) return message.reply("Couldn't find that role.");

  if (!rMember.roles.has(gRole.id)) return message.reply("Doesn't have that role.");
  await (rMember.removeRole(gRole.id));
  try{
    await rMember.send(`You have been removed from the role: **${gRole.name}** in **${message.guilds.name}**.`)
  }catch(e){
    message.channel.send(`<@${rMember.id}> has been removed the role: ${gRole.name}. We tried to dm them but their dms are locked!`)
  }
  let Pembed = new Discord.RichEmbed()
  .setDescription("~A User has been Demoted!~")
  .setColor("#49016d")
  .addField("Demoted user", `${rMember} with ID ${rMember.id}`)
  .addField("Demoted by", `<@${message.author.id}> with ID ${message.author.id}`)
  .addField("Demoted in", message.channel)
  .addField("Time:", message.createdAt);

  let DemoteChannel = message.guild.channels.find(`name`, "logs");
  if(!DemoteChannel) return message.channel.send("Can't find a Demote/Promote channel");

  DemoteChannel.send(Pembed);
  console.log(`${rMember} just got Demoted!`);

  return;
}


module.exports.help = {
  name: "removerole"
}
