const Discord = require('discord.js');
const fs = require("fs")
let warns = JSON.parse(fs.readFileSync("./warn/warnings.json", "utf8"));

module.exports = {
    name: "warns",
    category: "moderation",
    description: "Checks a users warn count.",
    run: async (client, message, args) => {
        let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
        if (!wUser){
            let embed = new Discord.MessageEmbed()
            .setColor("#3f51b5")
            .setTitle("Error")
            .setDescription("Invalid user.")
            .setTimestamp()
            return message.channel.send(embed);
        } 
        
        if (!warns[wUser.id]) warns[wUser.id] = {
            warns: 0
        };

        let wembed = new Discord.MessageEmbed()
        .setColor("#3f51b5")
        .addField(wUser.user.tag, `**Warns:** ` + warns[wUser.id].warns)
        .setTimestamp()
        .setFooter(`ID: ` + wUser.user.id)
        message.channel.send(wembed)
    }
}
