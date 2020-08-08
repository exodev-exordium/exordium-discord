const Discord = require('discord.js');

module.exports = {
    name: "server",
    category: "utility",
    description: "Fetches information on the server.",
    run: async (client, message, args) => {
        const Icon = message.guild.iconURL === null
            ? 'https://discordapp.com/assets/6debd47ed13483642cf09e832ed0bc1b.png' : message.guild.iconURL
        const verified = message.guild.verified !== true ? 'Not verified.' : 'Verified.'
        const afk_channel = message.guild.afkChannel === null ? 'N/A' : message.guild.afkChannel

        let region = ''
        if (message.guild.region === 'brazil') region = ':flag_br: Brazil'
        if (message.guild.region === 'central-europe') region = ':flag_eu: Central Europe'
        if (message.guild.region === 'western-europe') region = ':flag_eu: Western Europe'
        if (message.guild.region === 'hong-kong') region = ':flag_hk: Hong Kong'
        if (message.guild.region === 'india') region = ':flag_in: India'
        if (message.guild.region === 'japan') region = ':flag_jp: Japan'
        if (message.guild.region === 'russia') region = ':flag_ru: Russia'
        if (message.guild.region === 'singapore') region = ':flag_sg: Singapore'
        if (message.guild.region === 'south-africa') region = ':flag_za: South Africa'
        if (message.guild.region === 'sydney') region = ':flag_au: Australia'
        if (message.guild.region === 'us-central') region = ':flag_us: US Central'
        if (message.guild.region === 'us-east') region = ':flag_us: US East'
        if (message.guild.region === 'us-south') region = ':flag_us: US South'
        if (message.guild.region === 'us-west') region = ':flag_us: US West'

        const embed = new Discord.MessageEmbed()
            .setColor("#3f51b5")
            .setThumbnail(Icon)
            .setFooter(`ID: ${message.guild.id}`,
                'https://cdn.discordapp.com/avatars/492871769485475840/6164d0068b8e76e497af9b0e1746f671.png?size=2048')
            .setTitle(`${message.guild.name}`)
            .addField('Owner: ', `${message.guild.owner}`, true)
            .addField('Member Count: ', `${message.guild.memberCount}`, true)
            .addField('Server Verification: ', `${verified}`)
            .addField('Server Creation Date: ', `${message.guild.createdAt}`, true)
            .addField('Region: ', `${region}`, true)
            .setTimestamp()

        message.channel.send(embed)
    }
}    