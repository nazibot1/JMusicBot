const Discord = require("discord.js");
const config = require("../botconfig.json")
console.log("Addrole is online!");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Sorry, can't do that for you.");
  let rMember = message.mentions.members.first();
  if (!rMember) return message.reply("Couldn't find that user.");
  let role = args.slice(1).join(" ");
  if (!role) return message.reply("Specify a role!");
  let gRole = message.guild.roles.find(`name`, role);
  if (!gRole) return message.reply("Couldn't find that role.");

  if (rMember.roles.has(gRole.id)) return message.reply("That person already has that role.");
  await (rMember.addRole(gRole.id));
  try{
    await rMember.send(`Congradulations! You have recieved the role ${gRole.name}`)
  }catch(e){
    message.channel.send(`Congradulations <@${rMember.id}> you have recieved the role ${gRole.name} We tried to dm them but their dms are locked!`)
  }
  let Rembed = new Discord.RichEmbed()
  .setDescription("~A User has been Promoted!!~")
  .setColor("#00f908")
  .addField("Promoted user", `${rMember} with ID ${rMember.id}`)
  .addField("Promoted by", `<@${message.author.id}> with ID ${message.author.id}`)
  .addField("Promoted in", message.channel)
  .addField("Time:", message.createdAt)

  let PromoteChannel = message.guild.channels.find(`name`, "logs");
  if(!PromoteChannel) return message.channel.send("Can't find a Demote/Promote channel");

  PromoteChannel.send(Rembed);
  console.log(`${rMember} just got Promoted!`);

  return;
}


module.exports.help = {
  name: "addrole"
}
