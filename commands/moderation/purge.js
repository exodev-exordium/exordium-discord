// dotenv requirement for token data
const dotenv = require('dotenv');
dotenv.config();

// discord requirement
const Discord = require('discord.js');

module.exports = {
    name: "purge",
    category: "moderation",
    description: "Purges messages.",
    
    run: async (client, message, args) => {
        try {
            let num
            if (!message.member.hasPermission("MANAGE_MESSAGES")){
                let embed = new Discord.MessageEmbed()
                .setColor(process.env.DISCORD_COLOR_DANGER)
                .setTitle("Error")
                .setDescription("You don't have permission to purge messages.")
                .setTimestamp()
                .setFooter(`Offender: ${message.author.tag}`)
                return message.channel.send(embed);    
            }

            if (!isNaN(args[0])) {
                num = parseInt(args[0])

                if (num <= 100 && num > 1) {
                    message.delete()
                    message.channel.bulkDelete(num)
                } else {
                    let embed = new Discord.MessageEmbed()
                    .setColor(process.env.DISCORD_COLOR_DANGER)
                    .setTitle("Error")
                    .setDescription("Please enter a number between 2-100.")
                    .setTimestamp()
                    return message.channel.send(embed);
                }

            } else {
                let embed = new Discord.MessageEmbed()
                .setColor(process.env.DISCORD_COLOR_DANGER)
                .setTitle("Error")
                .setDescription("Please enter a number between 2-100.")
                .setTimestamp()
                return message.channel.send(embed);
                
            }
            
        } catch (err) {
        }
    }
}
