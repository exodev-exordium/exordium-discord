// dotenv requirement for token data
const dotenv = require('dotenv');
dotenv.config();

// node requirements
const fs = require("fs");

// discord requirement
const Discord = require('discord.js');
let warns = JSON.parse(fs.readFileSync("./warn/warnings.json", "utf8"));

module.exports = {
    name: "warns",
    category: "moderation",
    description: "Checks a users warn count.",
    
    run: async (client, message, args) => {
        let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
        if (!wUser){
            let embed = new Discord.MessageEmbed()
                .setColor(process.env.DISCORD_COLOR_DANGER)
                .setTitle("Error")
                .setDescription("Invalid user.")
                .setTimestamp()
            return message.channel.send(embed);
        } 
        
        if (!warns[wUser.id]) warns[wUser.id] = {
            warns: 0
        };

        let wembed = new Discord.MessageEmbed()
            .setColor(process.env.DISCORD_COLOR_WARNING)
            .addField(wUser.user.tag, `**Warns:** ` + warns[wUser.id].warns)
            .setTimestamp()
            .setFooter(`ID: ` + wUser.user.id)
        message.channel.send(wembed)
    }
}
