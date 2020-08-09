// dotenv requirement for token data
const dotenv = require('dotenv');
dotenv.config();

// discord requirement
const Discord = require('discord.js');

const client = new Discord.Client();
const bot = new Discord.Client({ disableEveryone: true });

bot.commands = new Discord.Collection();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

["command"].forEach(handler => {
	require(`./hand/${handler}`)(client);
});

client.once('ready', () => {
	console.log(`Bot ready. Made by @heyrift.`);
	client.user.setActivity(`with Exordium | +help`, {
		type: `PLAYING`,
	});
});

client.on('message', async message => {
	if (message.author.bot) return;
	if (!message.guild) return;
	if (!message.content.startsWith(process.env.DISCORD_PREFIX)) return;


	const args = message.content.slice(process.env.DISCORD_PREFIX.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if (cmd.length === 0) return;

	let command = client.commands.get(cmd);
	if (!command) command - client.commands.get(client.aliases.get(cmd));

	if (command)
		command.run(client, message, args);
});
client.login(process.env.DISCORD_TOKEN);