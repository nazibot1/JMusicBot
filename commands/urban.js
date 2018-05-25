const Discord = require("discord.js");
const bot = require("../discordbot.js");
const urban = require('relevant-urban');
const config = require("../botconfig.json")
console.log("Urban is online!");

module.exports.run = async (bot, message, args) => {

  if(!args[0]) return message.reply("**_Specify_ _a_ _word_**");

  let res = await urban(args.join(' ')).catch(e => {
    console.log(e);
    message.channel.reply("_Word_ _not_ _found!_");
  })

  let embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(res.word)
    .setURL(res.urbanURL)
    .addField(`**Definition of ${res.word}**`, `**${res.definition}**`, true)
    .addField(`**Example of ${res.word}**`, `**${res.example}**`, true)
    .addField(`Rating`, `\`Upvotes: ${res.thumbsUp} | Downvotes: ${res.thumbsDown}\``)

  if(res.tags.length > 0 && res.tags.join(', ').length < 1024){
    embed.addField('Tags', res.tags.join(', '), true)
  }

  message.channel.send(embed)

}


module.exports.help = {
  name: "urban"
}
