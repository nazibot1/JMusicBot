const Discord = require("discord.js");
const bot = require("../discordbot.js");
const client = require("fortnite");
const fortnite = new client('dfc4da42-0a11-477f-9004-e8f0891b5578');
const fetch = require("node-fetch")
const config = require("../botconfig.json")
console.log("Fortnite is online!");

module.exports.run = async (bot, message, args, tools) => {
  let platform;
  let username;

  if(!['pc', 'xbl', 'psn'].includes(args[0])) return message.reply("**Specify a platform!** Valid platforms are: `pc | xbl | psn`");
  if(!args[1]) return message.reply("**Specify a user**");


  platform = args.shift();
  username = args.join(' ');

  fortnite.user(username, platform).then(data => {
    let FEmbed = new Discord.RichEmbed()
    .setColor("#8F51A0")
    .setTitle(`Solo fortnite stats for ${data.username}`, true)
    .addField("Kd Ratio", data.stats.solo.kd, true)
    .addField("Wins ", data.stats.solo.wins, true)
    .addField("Times in the top 5", data.stats.solo.top_5, true)
    .addField("Matches played", data.stats.solo.matches, true)
    .addField("Kills", data.stats.solo.kills, true);

    message.channel.send(FEmbed)
  }).catch(e => {
    message.channel.send("Username **NOT FOUND!** double check the platform and the username!");
    console.log("That user isn't in the data base!");
    console.log(e);
  })


  console.log(`${message.author} wants the fortnite stats for ${username}`)
}


module.exports.help = {
  name: "fortnite"
}
