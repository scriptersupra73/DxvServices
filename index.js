const { Client, GatewayIntentBits, Collection } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Create the commands collection manually
client.commands = new Collection();

// Import your verify command directly
const verify = require('./verify.js');
client.commands.set(verify.data.name, verify);

// v15 event name
client.once('clientReady', () => {
  console.log(`✅ Bot is online! Logged in as ${client.user.tag}`);
});

// Handle interactions
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(`❌ Error executing /${interaction.commandName}:`, error);
    if (!interaction.replied && !interaction.deferred) {
      await interaction.reply({ content: '❌ Something went wrong!', flags: 64 });
    }
  }
});

client.login(process.env.TOKEN);
