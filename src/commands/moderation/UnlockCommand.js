const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class UnlockCommand extends BaseCommand {
  constructor() {
    super('unlock', 'moderation', []);
  }

  async run(client, message, args) {

    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.inlineReply("**You are missing the permission:** `manage_channels`");
    if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.inlineReply("**I'm missing the permission:** `manage_channels`");

    let lockChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
    if(!lockChannel) lockChannel = message.channel;

    try{
      await lockChannel.updateOverwrite(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == "@everyone"), {
        SEND_MESSAGES: true
      })
      message.inlineReply("**Successfully unlocked channel.**")
    } catch(err) {
      message.inlineReply("**Failed to unlock channel.**")
    }
  }
}