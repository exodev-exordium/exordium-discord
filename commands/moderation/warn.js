const Discord = require('discord.js');
const fs = require("fs")
let warns = JSON.parse(fs.readFileSync("./warn/warnings.json", "utf8"));

module.exports = {
    name: "warn",
    category: "moderation",
    description: "Warns a user.",
    run: async (client, message, args) => {
        if (!message.member.hasPermission("MANAGE_MESSAGES")){
            let embed = new Discord.MessageEmbed()
            .setColor("#3f51b5")
            .setTitle("Error")
            .setDescription("You don't have permission to warn members.")
            .setTimestamp()
            .setFooter(`Offender: ${message.author.tag}`)
            return message.channel.send(embed);
        } 

        let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
        if (!wUser){
            let embed = new Discord.MessageEmbed()
            .setColor("#3f51b5")
            .setTitle("Error")
            .setDescription("Invalid user.")
            .setTimestamp()
            return message.channel.send(embed);
        } 
        
        if (wUser.hasPermission("MANAGE_MESSAGES")){
            let embed = new Discord.MessageEmbed()
            .setColor("#3f51b5")
            .setTitle("Error")
            .setDescription("You can't warn staff members.")
            .setTimestamp()
            return message.channel.send(embed);
        } 

        let reason = args.join(" ").slice(22);

        if (!warns[wUser.id]) warns[wUser.id] = {
            warns: 0
        };
        warns[wUser.id].warns++;
        fs.writeFile("./warn/warnings.json", JSON.stringify(warns), (err) => {
            if (err) console.log(err)
        });
        let warnEmbed = new Discord.MessageEmbed()
            .setTitle("Warn Report")
            .setAuthor(message.author.tag)
            .setColor("#3f51b5")
            .addField("Warned By:", `<@${message.author.id}>`)
            .addField("Warned In:", message.channel)
            .addField("Warn Count:", warns[wUser.id].warns)
            .addField("Reason:", reason)
            .setTimestamp()
        let warnchannel = "741414700251873303"
        if (!warnchannel) return message.channel.send(`Could not find logs channel.`);
        warnchannel.message.send(warnEmbed);

        let dmembed = new Discord.MessageEmbed()
            .setTitle("Warn Report")
            .setAuthor(message.author.tag)
            .setColor("#3f51b5")
            .addField("**You were warned in EXORDIUM's discord.**")
            .addField("Warned By:", `<@${message.author.id}>`)
            .addField("Warn Count:", warns[wUser.id].warns)
            .addField("Reason:", reason)
            .setTimestamp()
        if (!warnchannel) return message.channel.send(`Could not find logs channel.`);
        warnchannel.message.send(warnEmbed);
    }
}         