const Discord = require('discord.js');

module.exports = {
    name: "ban",
    category: "moderation",
    description: "Bans a mentioned user from the server.",

    run: (client, message, args) => {
        if (!message.member.hasPermission("BAN_MEMBERS")){
            let embed = new Discord.MessageEmbed()
                .setColor("#3f51b5")
                .setTitle("Error")
                .setDescription("You don't have permission to ban people.")
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
            .setDescription("You can't ban yourself.")
            .setTimestamp()
            return message.channel.send(embed);
        }

        let kreason = args.join(" ").slice(22);
        if (kuser.hasPermission("KICK_MEMBERS")){
            let embed = new Discord.MessageEmbed()
            .setColor("#3f51b5")
            .setTitle("Error")
            .setDescription("You can't ban a staff member.")
            .setTimestamp()
            return message.channel.send(embed);
        }

        let kickembed = new Discord.MessageEmbed()
            .setDescription(`Ban Report`)
            .setAuthor(kuser.user.tag)
            .addField("Banned By:", `<@${message.author.id}>`)
            .addField("Reason:", kreason)
            .setTimestamp
            .setColor("#3f51b5");
        let kickChannel = "741414700251873303"
        if (!kickChannel) return message.channel.send("Cannot find logs channel.");
        kickChannel.send(kickembed);

        let dmembed = new Discord.MessageEmbed()
            .setDescription(`Ban Report`)
            .setAuthor(kuser.user.tag)
            .addField("**You were banned from EXORDIUM's Discord.**")
            .addField("Banned By:", `<@${message.author.id}>`)
            .addField("Reason:", kreason)
            .setTimestamp
            .setColor("#3f51b5");
            kuser.send(dmembed)

        message.guild.member(kuser).ban(kreason);
        return;

    }
}