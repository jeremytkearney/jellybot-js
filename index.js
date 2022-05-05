// Require necessary discord.js dependencies
const { Client, Intents } = require('discord.js');
const { token } = require("./config.json");

// Create new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Initialization code, only run once
client.once('ready', () => {
    console.log('Jellybot is ready to go!');
});

// Login bot to Discord using client token
client.login(token);