const Discord = require("discord.js");
const bot = require("../discordbot.js");
const weather = require("weather-js");
const config = require("../botconfig.json")
console.log("Weather is online!");

module.exports.run = async (bot, message, args) => {
  weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
    if (err) message.channel.send(err);

    var current = result[0].current;
    var location = result[0].location;

    let embed = new Discord.RichEmbed()
    .setDescription(`**${current.skytext}**`)
    .setAuthor(`Weather for ${current.observationpoint}`)
    .setThumbnail(current.imageUrl)
    .setColor(0x5cc1ed)
    .addField("Timezone", `UTC${location.timezone}`, true)
    .addField("Day", `${current.shortday} (${current.day})`)
    .addField("Degree Type", location.degreetype, true)
    .addField("Temperature", `${current.temperature} Degrees`, true)
    .addField("Feels like", `${current.feelslike} Degrees`, true)
    .addField("Winds", current.winddisplay, true)
    .addField("Humidity", `${current.humidity}%`, true)
    .addField("Last checked", `${current.observationtime}`, true);

    message.channel.send(embed)


  });
  console.log(`Someone is asking for the weather in ${location}`)
}


module.exports.help = {
  name: "weather"
}
