const Discord = require('discord.js');

module.exports = {
    name: "userinfo",
    category: "utility",
    description: "Fetches information on a mentioned user.",
    run: async (client, message, args) => {
        try {
            const user = message.mentions.members.first() || message.member

            const embed = new Discord.MessageEmbed()
                .setTitle(user.user.tag)
                .setFooter(`ID: ${user.id}`)
                .addField('Account Creation Date: ', `${user.user.createdAt}`, true)
                .addField('Current Game: ', `${user.user.presence.game || 'none'}`, true)
                .setThumbnail(user.user.avatarURL)
                .setColor("#3f51b5")
                .setTimestamp()
                message.channel.send(embed)
                
        } catch (err) {
            message.channel.send('Error. You should not be seeing this.\n' + err).catch()
        }
    }
}
