const Discord = require("discord.js")
const bot = new Discord.Client({disableEveryone: true})
const YTDL = require("ytdl-core")
const opus = require("opusscript")
const ffmpegB = require("ffmpeg-binaries")
const ms = require("ms")
arraySort = require("array-sort")
table = require('table')

let cooldown = new Set();
let cdseconds = 3;
let seconds = ms(1000);
let minutes = ms(60000);
let hours = ms(3600000);
let s = ms(1000);
let m = ms(60000);
let h = ms(3600000);
let sec = ms(1000);
let min = ms(60000);


var servers = {};
function play(connection, message) {
    let server = servers[message.guild.id];
    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
    server.queue.shift();
    server.dispatcher.on("end", function(){
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}

bot.on("ready", async () => {
  bot.user.setActivity(`${bot.users.size} members across ${bot.guilds.size} servers`, {type: "WATCHING"})
  console.log(`Juptian's music bot is in ${bot.guilds.size} servers with ${bot.users.size} users!`)
})
bot.on("error", (err) => {
	return console.log(err)
})
bot.on("message", async message => {
  let messageArray = message.content.split(" ");
  let msg = message.content.toUpperCase();
  let cmd = messageArray[0];
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
	let args = messageArray.slice(1);
  let prefix = ".";
    if(cmd === `.play`){
        if(!args[0]) {
              message.channel.send("Please provide a link.");
              return;
          }

          if(!message.member.voiceChannel) {
              message.channel.send("You must be in a voice channel.");
              return;
          }
          if(!servers[message.guild.id]) servers[message.guild.id] = {
              queue: []
          }
  //        message.member.voiceChannel.join()
          if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
              play(connection, message);
          });

          var server = servers[message.guild.id];
          server.queue.push(args[0]);
          if(error => console.error);
      }

      if(cmd === `.skip`){
        if(!message.member.hasPermission(4)) {
          message.reply("No can do!");
          return;
        }
          var server = servers[message.guild.id];
          if (server.dispatcher) server.dispatcher.end();
      }

      if(cmd === `.stop`){
        if(!message.member.hasPermission(4)) {
          message.reply("No can do!");
          return;
        }
          var server = servers[message.guild.id];
          if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
      }
      if(cmd === `${prefix}invites`) {
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

      console.log(`${message.author.id} wanted the invite leaderboard for ${message.guild.name}`);
    }
    if(cmd === `${prefix}tempmute`) {
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
    if(cmd === `${prefix}clear`) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You aren't allowed to do that!");
    if(!args[0]) return message.channel.send("Please specify a number")
    message.delete();
    message.channel.bulkDelete(args[0]).then(() =>{
    message.channel.send(`Cleared ${args[0]} messages!`).then(msg => msg.delete(10000))
    });
    console.log(`${message.author} deleted ${args[0]} messages!`);
    }
    if(cmd === `${prefix}kick`) {
        let kUser = message.mentions.members.first();
      let kReason = args.slice(1).join(" ");
      if(!kUser) return message.channel.send("Can't find user");
      if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("I can't do that for ya mate!");
      if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("I can't do that for you");

      let kEmbed = new Discord.RichEmbed()
      .setDescription("~A User has been kicked!~")
      .setColor("#ffee93")
      .addField("Kicked user", `${kUser} with ID ${kUser.id}`)
      .addField("Kicked by", `<@${message.author.id}> with ID ${message.author.id}`)
      .addField("Kicked in", message.channel)
      .addField("Time:", message.createdAt)
      .addField("Reason", kReason);


      let kickChannel = message.guild.channels.find(`name`, "kicks" || "kicks/bans" || "kicks-bans" || "logs");
      if(!kickChannel) return message.channel.send("Can't find a Kicks/Bans channel");

      message.guild.member(kUser).kick(kReason);
      kickChannel.send(kEmbed);
      console.log(`${kUser} just got kicked!`);

      return;
  };
    if(cmd === `${prefix}ban`) {
      let bUser = message.mentions.members.first();
  let bReason = args.join(" ").slice(22);
  if(!bUser) return message.channel.send("Can't find user");
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("I can't do that for ya mate!");
  if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("Thy mustn't attempt to kick Moderators");


  let bEmbed = new Discord.RichEmbed()
  .setDescription("~A User has been BANNED!~")
  .setColor("#700900")
  .addField("Banned user", `${bUser} with ID ${bUser.id}`)
  .addField("Banned by", `<@${message.author.id}> with ID ${message.author.id}`)
  .addField("Banned in", message.channel)
  .addField("Time:", message.createdAt)
  .addField("Reason", bReason);


  let banChannel = message.guild.channels.find(`name`, "bans" || "kicks/bans" || "kicks-bans" || "logs");
  if(!banChannel) return message.channel.send("Can't find a Kicks/Bans channel");

  message.guild.member(bUser).ban(bReason);
  banChannel.send(bEmbed);
  console.log(`${bUser} has been banned!`);

  return;
  };
  if(cooldown.has(message.author.id)){
    if(!message.member.hasPermission("KICK_MEMBERS")) {
      message.delete();

      return;
    }
      return;
    }
  if(!message.member.hasPermission("KICK_MEMBERS")){
    cooldown.add(message.author.id);
  }

  setTimeout (() => {
    cooldown.delete(message.author.id)
  }, cdseconds * 1000 )
});
bot.login("BOT_TOKEN");
