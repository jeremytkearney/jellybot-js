// Require necessary discord.js and node dependencies
const fs = require('node:fs');
const { Client, Intents, Interaction } = require('discord.js');
const { token } = require("./config.json");
const { REST } = require('@discordjs/rest');

// Create new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Events handler
const eventFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file  of eventFiles) {
    const event = require(`./events/${file}`);
    if(event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Command handler
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.data.name, command);
}

// Login bot to Discord using client token
client.login(token);