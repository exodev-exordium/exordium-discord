const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: "ban",
    category: "moderation",
    description: "Bans a mentioned user from the server.",

    run: async (client, message, args) => {
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

        if (kuser == message.author.id){
            let embed = new Discord.MessageEmbed()
            .setColor("#3f51b5")
            .setTitle("Error")
            .setDescription("You can't ban yourself.")
            .setTimestamp()
            return message.channel.send(embed);
        }

        if (kuser.hasPermission("BAN_MEMBERS")){
            let embed = new Discord.MessageEmbed()
            .setColor("#3f51b5")
            .setTitle("Error")
            .setDescription("You can't ban a staff member.")
            .setTimestamp()
            return message.channel.send(embed);
        }

        let kreason = args.join(" ").slice(22);
        if (!kreason) kreason = "No reason provided."

        let kickembed = new Discord.MessageEmbed()
            .setDescription(`Ban Report`)
            .setAuthor(kuser.user.tag)
            .addField("Banned By:", `<@${message.author.id}>`)
            .addField("Reason:", kreason)
            .setTimestamp()
            .setColor("#3f51b5")

        const kickChannel = client.channels.cache.get('741414700251873303')
        if (!kickChannel) return message.channel.send("Cannot find logs channel.");
        kickChannel.send(kickembed)

        let dmembed = new Discord.MessageEmbed()
        .setTitle(`Ban Report`)
        .setDescription("**You were banned from EXORDIUM.**")
        .addField("Banned By:", `<@${message.author.id}>`)
        .addField("Reason:", kreason)
        .setTimestamp()
        .setColor("#3f51b5")
        .setThumbnail(`https://avatars0.githubusercontent.com/u/56140699?s=600&v=4`)
        await kuser.send(dmembed)
        message.guild.member(kuser).ban(kreason);

    }
}