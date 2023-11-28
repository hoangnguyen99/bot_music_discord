require("dotenv").config();

const { Client, IntentsBitField, Events } = require("discord.js");

// import { createCollection } from "./commands/actions";
const { Schema } = require("./commands/schema");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.GuildIntegrations,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (data) => {
  console.log(`==> Bot is on ready ${data.user.tag}`);
});

client.on("messageCreate", async (message) => {
  //   if (!message.guild) return;

  if (!client.application?.owner) {
    await client.application?.fetch();
  }
  // client.commands = new Collection();

  // console.log(message);
  //   console.log(client.application.owner);

  if (
    message.content.toLowerCase() === "!deploy" &&
    message.author.id === client.application.owner.id
  ) {
    try {
      await message.guild.commands.set(Schema);
      await message.reply("Deloyed");
    } catch (error) {
      await message.reply("Fail to Deploy");
    }
  }
});

// console.log(process.env.DISCORD_TOKEN);
client.login(process.env.DISCORD_TOKEN);
