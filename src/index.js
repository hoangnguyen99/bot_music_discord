require("dotenv").config();

const {
  Client,
  IntentsBitField,
  Events,
  Collection,
  REST,
  Routes,
} = require("discord.js");
const fs = require("fs");
const path = require("path");

// import { createCollection } from "./commands/actions";
// const { Schema } = require("./commands/play");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.GuildIntegrations,
    IntentsBitField.Flags.MessageContent,
  ],
});

const applicationId = "1178918076452962425";
const guildId = "1151153882186121336";

client.slashcommands = new Collection();

const commands = [];

const foldersPath = path.join(__dirname, "commands");
const commandFolder = fs
  .readdirSync(foldersPath)
  .filter((file) => file.endsWith(".js"));
console.log(commandFolder);

for (let file of commandFolder) {
  let commandFilePath = path.join(foldersPath, file);
  let command = require(commandFilePath);

  if ("data" in command && "execute" in command) {
    console.log(command.data.name);
    client.slashcommands.set(command.data.name, command);
    commands.push(command.data.toJSON());
  } else {
    console.log("Nothing import");
  }
}

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

client.on("ready", (data) => {
  console.log(`==> Bot is on ready ${data.user.tag}`);
});
// listen user enter command
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = interaction.client.slashcommands.get(interaction.commandName);
  if (!command) {
    console.log("Not command matching!!!");
    return;
  }
  try {
    await command.execute(interaction);
  } catch (error) {
    console.log(error);
  }
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
      // console.log(message);
      // await message.guild.commands.set(Schema);
      // console.log(client.application.owner.id);
      await rest.put(Routes.applicationGuildCommands(applicationId, guildId), {
        body: commands,
      });
      await message.reply("Deloyed");
    } catch (error) {
      console.log(error);
      await message.reply("Fail to Deploy");
    }
  }
});

// console.log(process.env.DISCORD_TOKEN);
client.login(process.env.DISCORD_TOKEN);
