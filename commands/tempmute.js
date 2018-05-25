const Discord = require("discord.js");
const bot = require("../discordbot.js");
const config = require("../botconfig.json");
const ms = require("ms");
let seconds = ms(1000);
let minutes = ms(60000);
let hours = ms(3600000);
let s = ms(1000);
let m = ms(60000);
let h = ms(3600000);
let sec = ms(1000);
let min = ms(60000);

console.log("Tempmute is online!");

module.exports.run = async (bot, message, args) => {

  let tomute = message.mentions.members.first();
  if(!tomute) return message.reply("Couldn't mute anyone.");
  if(tomute.hasPermission("MANAGE_ROLES")) return message.reply("Currently unable to mute said person.");

  let muterole = message.guild.roles.find(`name`, "muted");
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          READ_MESSAGES: false,
          VOICE_CONNECT: false,
          CREATE_INSTANT_INVITE: false,
          CHANGE_NICKNAME: false
        });
      })
    }catch(e){
      console.log(e.stack);
    };
  };
  //End of create role//

  let mutetime = args[1];
  if(!mutetime) return message.reply("You didn't specify a time!");

  await(tomute.addRole(muterole.id));

  message.reply(`<@${tomute.id}> has been muted for ${mutetime}`);

  setTimeout(function(){

  tomute.removeRole(muterole.id);
  message.channel.send(`<@${tomute.id}> has been unmuted.`)

  }, ms(mutetime))
  console.log(`${tomute} has just been muted!`);
}


module.exports.help = {
  name: "tempmute"
}
