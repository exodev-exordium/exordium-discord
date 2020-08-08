const Discord = require('discord.js');

module.exports = {
  name: "help",
  category: "utility",
  description: "DMs a user the bot's commands.",

  run: async (client, message, args) => {
    const help = new Discord.MessageEmbed()
      .setColor("#3f51b5")
      .setTimestamp()
      .addField("\\🔧 Utility", `\`\`\`\n+help       | Sends you this message.
+serverinfo | Fetches information on the Discord server.
+userinfo   | Fetches information on a mentioned user.\n\`\`\`
`)
      .addField("\\🗡️ Moderation", `\`\`\`\n+ban        | Bans a mentioned user.
+kick       | Kicks a mentioned user.
+warn       | Warns a mentioned user.
+purge      | Purges messages.
+restart    | Restarts the bot.\n\`\`\`
`)    
      .setFooter(`Bot made by @heyrift.`)
    message.author.send(help);
    message.react("📬")
  }
}
