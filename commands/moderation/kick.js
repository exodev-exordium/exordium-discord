const Discord = require('discord.js');

module.exports = {
    name: "kick",
    category: "moderation",
    description: "Kicks a mentioned user from the server.",

    run: (client, message, args) => {
        if (!message.member.hasPermission("KICK_MEMBERS")){
            let embed = new Discord.MessageEmbed()
                .setColor("#3f51b5")
                .setTitle("Error")
                .setDescription("You don't have permission to kick people.")
                .setTimestamp()
                .setFooter(`Offender: ${message.author.tag}`)
                return message.channel.send(embed);    
        }
        let kuser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!kuser){
            let embed = new Discord.MessageEmbed()
            .setColor("#3f51b5")
            .setTitle("Error")
            .setDescription("Invalid user.")
            .setTimestamp()
            return message.channel.send(embed);
        }

        if (kuser = message.author){
            let embed = new Discord.MessageEmbed()
            .setColor("#3f51b5")
            .setTitle("Error")
            .setDescription("You can't kick yourself.")
            .setTimestamp()
            return message.channel.send(embed);
        }

        let kreason = args.join(" ").slice(22);
        if (kuser.hasPermission("KICK_MEMBERS")){
            let embed = new Discord.MessageEmbed()
            .setColor("#3f51b5")
            .setTitle("Error")
            .setDescription("You can't kick a staff member.")
            .setTimestamp()
            return message.channel.send(embed);
        }

        let kickembed = new Discord.MessageEmbed()
            .setDescription(`Kick Report`)
            .setAuthor(kuser.user.tag)
            .addField("Kicked By:", `<@${message.author.id}>`)
            .addField("Reason:", kreason)
            .setTimestamp
            .setColor("#3f51b5");
        let kickChannel = "741414700251873303"
        if (!kickChannel) return message.channel.send("Cannot find logs channel.");
        kickChannel.send(kickembed);

        let dmembed = new Discord.MessageEmbed()
            .setDescription(`Kick Report`)
            .setAuthor(kuser.user.tag)
            .addField("**You were kicked from EXORDIUM's Discord.**")
            .addField("Kicked By:", `<@${message.author.id}>`)
            .addField("Reason:", kreason)
            .setTimestamp
            .setColor("#3f51b5");
            kuser.send(dmembed)

        message.guild.member(kuser).kick(kreason);
        return;

    }
}