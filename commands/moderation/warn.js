// dotenv requirement for token data
const dotenv = require('dotenv');
dotenv.config();

// node requirements
const fs = require("fs");

// discord requirement
const Discord = require('discord.js');
let warns = JSON.parse(fs.readFileSync("./warn/warnings.json", "utf8"));

module.exports = {
    name: "warn",
    category: "moderation",
    description: "Warns a user.",

    run: async (client, message, args) => {
        if (!message.member.hasPermission("MANAGE_MESSAGES")){

            let embed = new Discord.MessageEmbed()
                .setColor(proccess.env.DISCORD_COLOR_DANGER)
                .setTitle("Error")
                .setDescription("You don't have permission to warn members.")
                .setTimestamp()
                .setFooter(`Offender: ${message.author.tag}`)

            return message.channel.send(embed);
        } 

        let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
        if (!wUser){

            let embed = new Discord.MessageEmbed()
                .setColor(proccess.env.DISCORD_COLOR_DANGER)
                .setTitle("Error")
                .setDescription("Invalid user.")
                .setTimestamp()

            return message.channel.send(embed);
        } 
        
        if (wUser.hasPermission("MANAGE_MESSAGES")){

            let embed = new Discord.MessageEmbed()
                .setColor(proccess.env.DISCORD_COLOR_DANGER)
                .setTitle("Error")
                .setDescription("You can't warn staff members.")
                .setTimestamp()

            return message.channel.send(embed);
        } 

        let reason = args.join(" ").slice(22);
        if(!reason) reason = "No reason provided."

        if (!warns[wUser.id]) warns[wUser.id] = {
            warns: 0
        };
        warns[wUser.id].warns++;
        fs.writeFile("./warn/warnings.json", JSON.stringify(warns), (err) => {
            if (err) console.log(err)
        });

        let warnEmbed = new Discord.MessageEmbed()
            .setTitle("Warn Report")
            .setColor(process.env.DISCORD_COLOR_SUCCESS)
            .addField("Person warned:", wUser.user.tag)
            .addField("Warned By:", `<@${message.author.id}>`)
            .addField("Warned In:", message.channel)
            .addField("Warn Count:", warns[wUser.id].warns)
            .addField("Reason:", reason)
            .setTimestamp()

        const warnchannel = client.channels.cache.get('741414700251873303')
        if (!warnchannel) return message.channel.send(`Could not find logs channel.`);
        warnchannel.send(warnEmbed);

        let dmembed = new Discord.MessageEmbed()
            .setTitle("Warn Report")
            .setThumbnail(`https://avatars0.githubusercontent.com/u/56140699?s=600&v=4`)
            .setDescription("**You were warned in EXORDIUM.**")
            .setColor(process.env.DISCORD_COLOR_DANGER)
            .addField("Warned By:", `<@${message.author.id}>`)
            .addField("Warn Count:", warns[wUser.id].warns)
            .addField("Reason:", reason)
            .setTimestamp()

        wUser.send(dmembed)
    }
}         