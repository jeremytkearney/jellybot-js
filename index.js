// Require necessary discord.js dependencies
const { Client, Intents, Interaction } = require('discord.js');
const { token } = require("./config.json");

// Create new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Initialization code, only run once
client.once('ready', () => {
    console.log('Jellybot is ready to go!');
});

// Listen for interactions and reply to commands
client.on('interactionCreate', async interaction => {    
    if(!Interaction.isCommand()) return;

    const { commandName } = interaction;

    if(commandName === 'ping') {
        await interaction.reply('Pong!');
    } else if(commandName === 'server') {
        await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
    } else if (commandName === 'user') {
        await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
    }
});

// Login bot to Discord using client token
client.login(token);