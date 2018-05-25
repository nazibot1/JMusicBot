const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const ms = require("ms");
const superagent = require("superagent");
const YTDL = require("ytdl-core")
const http = require('http');
const express = require('express');
const app = express();


var servers = {};
let cooldown = new Set();
let cdseconds = 3;
bot.commands = new Discord.Collection();
let seconds = ms(5000);


app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);


//To do:
/*
Overwatch tracker
*/


fs.readdir("./commands/", (err, files) => {
	if(err) console.log(err);

	let jsfile = files.filter(f => f.split(".").pop() === "js")
	if(jsfile.length <= 0){
		console.log("couldn't find commands");
		return;
	};

	jsfile.forEach((f, i) =>{
		let props = require(`./commands/${f}`);
		console.log(`${f} loaded`);
		bot.commands.set(props.help.name, props);
	});
});
// logging the bot on //
bot.on("ready", async () => {
    setInterval(function() {
        setInterval(function() {
        bot.user.setActivity(`${bot.users.size} people across ${bot.guilds.size} servers`, {type: "WATCHING"}).catch(console.error);
				}, seconds)
				setInterval(function() {
				bot.user.setActivity(`${bot.users.size} ignore me`, {type: "WATCHING"}).catch(console.error);
				}, seconds)
			}, 5000)
	console.log(`Juptian bot is in ${bot.guilds.size} servers with ${bot.users.size} people and ${bot.channels.size} channels!`)
	console.log(`Juptian bot in online!`)
});
// Dealing with errors //
bot.on("error", error => {
	console.log(error)
})

// Commands //
bot.on("message", async message =>{
	let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

	if(!prefixes[message.guild.id]){
		prefixes[message.guild.id] = {
			prefixes: botconfig.prefix
		};
	}

	let prefix = prefixes[message.guild.id].prefixes


	if(message.author.bot) return;
	if(message.channel.type === "dm") return message.reply("I don't take messages in my pms");
	let messageArray = message.content.split(" ");
	let msg = message.content.toUpperCase();
	let cmd = messageArray[0];
	let args = messageArray.slice(1);



	if(!message.content.startsWith(`${prefix}`)) return;
	if(message.channel.name === "staff-talk") return;
	if(message.channel.name === "staff-only") return;
	if(message.author.id === "274352308874117131") return message.reply("You aren't allowed (by my creator) to use me.");
//	if(message.author.hasRole("5 sec cooldown")) {
//		if(cooldown.has(message.author.id)){
//			message.delete();
//
//			return;
//		}
//		if(!message.member.hasPermission("ADMINISTRATOR")){
//			cooldown.add(message.author.id);
//		}
//
//		setTimeout (() => {
//			cooldown.delete(message.author.id)
//		}, cdseconds * 5000 )
//	}


	let commandfile = bot.commands.get(cmd.slice(prefix.length));

	if(commandfile) commandfile.run(bot,message,args);

	if(cmd === `${prefix}help`){
		message.react('🔥');
		message.reply("Help is on the way").then(msg => msg.delete(5000));
		let sicon = message.guild.iconURL;
		let hEmbed = new Discord.RichEmbed()
		.setDescription(`help INCOMMING`)
		.setThumbnail(sicon)
		.setColor("#22e857")
		.addField(`${prefix}patreon`, "Owner patreon link", true)
		.addField(`${prefix}ping`, "Check the bots ping!", true)
		.addField(`${prefix}invite`, "Get the bot's invite link!", true)
		.addField(`${prefix}meme`, "Juicy Juicy memes", true)
		.addField(`${prefix}slap`, "Slap him already!", true)
		.addField(`${prefix}punch`, "FALCON PUNCH!", true)
		.addField(`${prefix}hug`, "People just need hugs!", true)
		.addField(`${prefix}rcolor`, "Gives you a random color!", true)
		.addField(`${prefix}invites`, "Invite leaderboards", true)
		.addField(`${prefix}weather`, "Check the weather for a specific area!", true)
		.addField(`${prefix}tempmute`, "to mute people (you need to do //tempmute <user> 20seconds (example))", true)
		.addField(`${prefix}ban`, "Don't fuck with the ***BAN HAMMER***", true)
		.addField(`${prefix}say`, "Tell me what to say", true)
		.addField(`${prefix}clear`, "it explains itself", true)
		.addField(`${prefix}8ball`, "Ask me a question damnit!", true)
		.addField(`${prefix}removerole`, "Remove roles from people", true)
		.addField(`${prefix}addRole`, "Be nice and give people roles!", true)
		.addField(`${prefix}rdog`, "Doggo photos!", true)
		.addField(`${prefix}rcat`, "Cat photos :/", true)
		.addField(`${prefix}serverinfo`, "Get the servers info!", true)
		.addField(`${prefix}botinfo`, "Get my info!", true)
		console.log("Someone needs help!");

		message.member.send(hEmbed);
	}

//	if(cmd === `${prefix}checklist`) {
//		let cEmbed = new Discord.RichEmbed()
//		.addField("people playing: Geometry dash",)
//	}


	if(cmd === `${prefix}pootis`){
		message.channel.send("POW");
		message.channel.send("haha");
		console.log("Sandvich and me are going to beat your ass");
	}
//		if(cmd === `${prefix}rname`) {
//			let p1 = ["Backstabbers", "Traitor", "European", "Innocent", "Ultra", "Relax", "Sea", "Ocean", "new"];
//			let p2 = ["Backyard", "Club", "Gmod", "Waves", "Water", "Sunset", "Beach", "Beached", "times", "Ol'"];
//			let p3 = ["servers", "TTT"];
//			let r1 = p1[Math.floor(Math.random() * p1.length)];
//			let r2 = p2[Math.floor(Math.random() * p2.length)];
//			let r3 = p3[Math.floor(Math.random() * p3.length)];
//			message.channel.send(r1 + " " + r2 + " " + r3)
//		}


	if(cooldown.has(message.author.id)){
		message.delete();

		return;
	}
	if(!message.member.hasPermission("ADMINISTRATOR")){
		cooldown.add(message.author.id);
	}

	setTimeout (() => {
		cooldown.delete(message.author.id)
	}, cdseconds * 1000 )

});


bot.login(botconfig.token);
