// Require necessary discord.js and node dependencies
const fs = require('node:fs');
const { Client, Intents, Collection, Interaction} = require('discord.js');
const { token } = require("./config.json");
const { REST } = require('@discordjs/rest');
const { Routes } = require("discord-api-types/v9");
const { Player } = require('discord-player');

// Create new client instance
const client = new Client({
    intents: [
        "GUILDS",
        "GUILD_VOICE_STATES"
    ]
});

client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
});

// Events handler
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

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

client.on('interactionCreate', async interaction => {
	async function handleCommand() {
        if (!interaction.isCommand()) return

        const command = client.commands.get(interaction.commandName)
        if (!command) interaction.reply("Not a valid slash command")

        await interaction.deferReply()
        await command.run({ client, interaction })
    }
    handleCommand()
});

// Login bot to Discord using client token
client.login(token);