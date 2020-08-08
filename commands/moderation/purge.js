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
                .setColor("#3f51b5")
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
                    .setColor("#3f51b5")
                    .setTitle("Error")
                    .setDescription("Please enter a number between 2-100.")
                    .setTimestamp()
                    return message.channel.send(embed);
                }

            } else {
                let embed = new Discord.MessageEmbed()
                .setColor("#3f51b5")
                .setTitle("Error")
                .setDescription("Please enter a number between 2-100.")
                .setTimestamp()
                return message.channel.send(embed);
                
            }

            let warnEmbed = new Discord.MessageEmbed()
            .setTitle("Purge Report")
            .setColor("#3f51b5")
            .addField("Purged By:", `<@${message.author.id}>`)
            .addField("Purged In:", message.channel)
            .addField("Amount Purged:", num)
            .setTimestamp()
        let warnchannel = "741414700251873303"
        if (!warnchannel) return message.channel.send(`Could not find logs channel.`);
        warnchannel.send(warnEmbed);

        } catch (err) {
            message.channel.send('Error.\n You should never see this.\n' + err).catch()
        }
    }
}
