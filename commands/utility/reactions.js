// dotenv requirement for token data
const dotenv = require('dotenv');
dotenv.config();

// discord requirement
const Discord = require('discord.js');
const bot = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]})

module.exports = {
  name: "reactions",
  category: "utility",
  description: "Sets up reaction roles.",

  run: async (client, message, args) => {

    if (!message.member.hasPermission("ADMINSTRATOR")){
        let embed = new Discord.MessageEmbed()
            .setColor(process.env.DISCORD_COLOR_PRIMARY)
            .setTitle("Error")
            .setDescription("You don't have permission to make a reaction role channel.")
            .setTimestamp()
            .setFooter(`Offender: ${message.author.tag}`)
            return message.channel.send(embed);    
    }

  let embed = new Discord.MessageEmbed()
    .setTitle("Self-roles")
    .setDescription("React with the corresponding emojis to obtain roles.")
    .setColor(process.env.DISCORD_COLOR_PRIMARY)

    let msgEmbed = await message.channel.send(embed)
    msgEmbed.react("688985121436729375")

    bot.on("messageReactionAdd", async (reaction, user)=> {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return
        
        if (reaction.emoji.name === ""){ // PUT EMOJI 1 ID IN HERE
            await reaction.message.guild.members.cache.get(user.id).roles.add("") // PUT ROLE 1 ID IN HERE
        }  
    })
        
    bot.on("messageReactionRemove", async (reaction, user)=> {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return
        if (reaction.emoji.name === ""){ // PUT EMOJI 1 ID IN HERE
        await reaction.message.guild.members.cache.get(user.id).roles.remove("") // PUT ROLE 1 ID IN HERE
            }
        });
    }
}