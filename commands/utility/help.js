// dotenv requirement for token data
const dotenv = require('dotenv');
dotenv.config();

// discord requirement
const Discord = require('discord.js');

module.exports = {
  name: "help",
  category: "utility",
  description: "DMs a user the bot's commands.",

  run: async (client, message, args) => {
    const help = new Discord.MessageEmbed()
      .setColor(process.env.DISCORD_COLOR_PRIMARY)
      .setTimestamp()
      .addField("\\🔧 Utility", `\`\`\`\n
+help       | Sends you this message.
+serverinfo | Fetches information on the Discord server.
+userinfo   | Fetches information on a mentioned user.
+reactions  | Sets up reaction roles. Requires Administrator.\n\`\`\`
`)
      .addField("\\🗡️ Moderation", `\`\`\`\n
+ban        | Bans a mentioned user.
+kick       | Kicks a mentioned user.
+warn       | Warns a mentioned user.
+warns      | Checks a users warn count.
+purge      | Purges messages.\n\`\`\`
`)    
      .setFooter(`Bot made by @heyrift.`)
    message.author.send(help);
    message.react("📬")
  }
}
