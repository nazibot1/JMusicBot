const Discord = require("discord.js");
const bot = require("../discordbot.js");

const config = require("../botconfig.json");
arraySort = require('array-sort');
table = require('table')
console.log("Invites is online!");

module.exports.run = async (bot, message, args, tools) => {
  let invites = await message.guild.fetchInvites();

  invites = invites.array();

  arraySort(invites, 'uses', { reverse: true });

  let Pinvites = [['User', 'Uses']];
  invites.forEach(function(invite) {
    Pinvites.push([invite.inviter.username, invite.uses]);

  })
  let inviteEmbed = new Discord.RichEmbed()
  .setColor("#4295f4")
  .setTitle("Server invites and uses")
  .addField('Leaderboard', `\`\`\`${table.table(Pinvites)}\`\`\``);

  message.channel.send(inviteEmbed);

  console.log("People like leaderboards");

}


module.exports.help = {
  name: "invites"
}
