// Require necessary discord.js and node dependencies
const fs = require('node:fs');
const { Client, Intents, Interaction } = require('discord.js');
const { token } = require("./config.json");

// Create new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Initialization code, only run once
client.once('ready', c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Command handler
client.commands = new Collection();
// Read in all files in jellybot-js/commands/ with a .js extension
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Iterate through every file and set the command from the file
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);

    // Set a new item in the Collection with the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

// Events handler
const eventFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file  of eventFiles) {
    const command = require(`./commands/${file}`);
}

// Listens for and executes commands
client.on('interactionCreate', async interaction => {
    if(!interaction.isCommand()) return;

    const command =  client.commands.get(interaction.commandName);

    if(!command) return;

    try {
        await command.execute(interaction);
    } catch(error) {
        console.error(error);
        await interactions.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

// Login bot to Discord using client token
client.login(token);