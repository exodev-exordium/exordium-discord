// dotenv requirement for token data
const dotenv = require('dotenv');
dotenv.config();

// discord requirement
const Discord = require('discord.js');

// log channel
const logChannel = process.env.DISCORD_LOG;

module.exports = {
    name: "ban",
    category: "moderation",
    description: "Bans a mentioned user from the server.",

    run: async (client, message, args) => {

        // does the user have the ability to ban
        if (!message.member.hasPermission("BAN_MEMBERS")){
            let embed = new Discord.MessageEmbed()
                .setColor(process.env.DISCORD_COLOR_DANGER)
                .setTitle("Error")
                .setDescription("You don't have permission to ban people.")
                .setTimestamp()
                .setFooter(`Offender: ${message.author.tag}`)
            
            return message.channel.send(embed);    
        }

        // User to banned
        let userToBan = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        let banReason = args.join(" ").slice(22);
        if (!banReason) banReason = "No reason provided."

        if (!userToBan){
            let embed = new Discord.MessageEmbed()
                .setColor(process.env.DISCORD_COLOR_DANGER)
                .setTitle("Error")
                .setDescription("Invalid user.")
                .setTimestamp()

            return message.channel.send(embed);
        }

        // Dont ban yourself.
        if (userToBan == message.author.id){
            let embed = new Discord.MessageEmbed()
                .setColor(process.env.DISCORD_COLOR_DANGER)
                .setTitle("Error")
                .setDescription("You can't ban yourself.")
                .setTimestamp()
                
            return message.channel.send(embed);
        }

        // If they have the staff role, no banning.
        if (userToBan.hasPermission("BAN_MEMBERS")){
            let embed = new Discord.MessageEmbed()
                .setColor(process.env.DISCORD_COLOR_DANGER)
                .setTitle("Error")
                .setDescription("You can't ban a staff member.")
                .setTimestamp()

            return message.channel.send(embed);
        }

        let banEmbed = new Discord.MessageEmbed()
            .setDescription(`Ban Report`)
            .setAuthor(userToBan.user.tag)
            .addField("Banned By:", `<@${message.author.id}>`)
            .addField("Reason:", banReason)
            .setTimestamp()
            .setColor(process.env.DISCORD_COLOR_SUCCESS)
            .setThumbnail(userToBan.user.avatarURL({size: 512}));

        const kickChannel = client.channels.cache.get(`${logChannel}`)
        if (!kickChannel) return message.channel.send("Cannot find logs channel.");
        kickChannel.send(banEmbed)

        let dmembed = new Discord.MessageEmbed()
            .setTitle(`Ban Report`)
            .setDescription("**You were banned from EXORDIUM.**")
            .addField("Banned By:", `<@${message.author.id}>`)
            .addField("Reason:", banReason)
            .setTimestamp()
            .setColor(process.env.DISCORD_COLOR_DANGER)
            .setThumbnail(userToBan.user.avatarURL({size: 512}));
            
        userToBan.send(dmembed)
        message.guild.member(userToBan).ban(banReason);

    }
}