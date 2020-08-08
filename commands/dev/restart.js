var { token } = require(`../../config.json`)
const Discord = require('discord.js');

module.exports = {
    name: "restart",
    category: "dev",
    description: "Restarts the bot.",

    run: async (client, message, args) => {
        if (!message.author.id === `729294501755224146`){
            let embed = new Discord.MessageEmbed()
            .setColor(`#3f51b5`)
            .setTitle("Error")
            .setDescription("You don't have permission to restart the bot.")
            .setTimestamp()
            return message.channel.send(embed);
        }
        let rembed = new Discord.MessageEmbed()
        .setTitle("Restarting...")
        .setTimestamp()
        .setColor("#3f51b5")
        const m = await message.channel.send(rembed)
            .then(client.destroy())
            .then(client.login(token))
            .then(client.user.setActivity(`over Exordium's Discord.`))
            let rdembed = new Discord.MessageEmbed()
            .setTitle("Successfully restarted!")
            .addField(`Restart requested by:`, "`" + message.author.tag + "`")
            .setTimestamp()
            .setColor("#3f51b5")
        m.edit(rdembed)
    }
}