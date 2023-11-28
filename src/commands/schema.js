const { Constants, Client } = require("discord.js");

const Schema = [
  {
    name: "play",
    description: "Plays a song or playlist on Youtube",
    options: [
      {
        name: "input",
        type: ,
      },
    ],
  },
  {
    name: "soundcloud",
    description: "Plays a song, album or playlist on SoundCloud",
  },
  {
    name: "skip",
    description: "Skip to the next song in the queue",
  },
  {
    name: "queue",
    description: "See the music queue",
  },
  {
    name: "pause",
    description: "Pauses the song that is currently playing",
  },
  {
    name: "resume",
    description: "Resume playback of the current song",
  },
  {
    name: "leave",
    description: "Leave the voice channel",
  },
  {
    name: "nowplaying",
    description: "See the song that is currently playing",
  },
  {
    name: "jump",
    description: "Jump to song in queue by position",
  },
  {
    name: "remove",
    description: "Remove song in queue by position",
  },
  {
    name: "ping",
    description: "See the ping to server",
  },
  {
    name: "help",
    description: "See the help for this bot",
  },
];

module.exports = {
  Schema,
};
