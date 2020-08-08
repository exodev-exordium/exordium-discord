const Discord = require('discord.js');
const { Client, Collection, Util } = require("discord.js");
var { token, sigcolor, prefix } = require('./config.json');
const client = new Discord.Client();
const bot = new Discord.Client({ disableEveryone: true });
bot.commands = new Discord.Collection();


client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach(handler => {
	require(`./hand/${handler}`)(client);
});

client.once('ready', () => {
	console.log(`Bot running. Made by @heyrift.`);
	client.user.setActivity(`over Exordium's Discord. | +help`, {
		type: `WATCHING`
	});
})

client.on('message', async message => {
	if (message.author.bot) return;
	if (!message.guild) return;
	if (!message.content.startsWith(prefix)) return;


	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if (cmd.length === 0) return;

	let command = client.commands.get(cmd);
	if (!command) command - client.commands.get(client.aliases.get(cmd));

	if (command)
		command.run(client, message, args);
});
client.login(token);