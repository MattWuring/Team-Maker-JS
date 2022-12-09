require('dotenv/config')
const { Client, GatewayIntentBits, Routes } = require('discord.js')
const { REST } = require('@discordjs/rest')

const TOKEN = process.env.TOKEN
const CLIENT_ID = process.env.CLIENT_ID
const GUILD_ID = process.env.GUILD_ID
const STEAM = process.env.STEAM


const rest = new REST({ version: '10' }).setToken(TOKEN)


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})


client.on('ready', () => {console.log('The bot is ready')})

client.on('interactionCreate', (interaction) => {
    if(!interaction.isChatInputCommand()) return;

    switch (interaction.commandName) {
        case "test":
            interaction.reply("hello")
            console.log("test used")
            break;
        case "test2":
            console.log("test2 used")
            break;
    }
})

async function main() {
    const commands = [
        {
        name: 'test',
        description: 'test',
        },
        {
            name: 'test2',
            description: 'test',
        },
    ]

    try{
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { 
            body: commands
        });

        client.login(TOKEN)

    } catch (err) {
        console.log(err)
    }
}

main()