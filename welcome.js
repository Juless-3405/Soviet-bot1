module.exports = (client) => {
  const channelId = '763173740947046400' // welcome channel
  const targetChannelId = '762806188076695562' // VQ
  const targetChannelId2 = '762806221152583710' // VA
  const targetChannelId3 = '762803226377715746' // rules
  
  client.on('guildMemberAdd', (member) => {
    const message = ` <@${
      member.id
    }>, Go read the ${member.guild.channels.cache
    .get(targetChannelId3)
    .toString()} and read the questions in ${member.guild.channels.cache
      .get(targetChannelId)
      .toString()} and answer them in ${member.guild.channels.cache
      .get(targetChannelId2)
      .toString()}`

    const channel = member.guild.channels.cache.get(channelId)
    channel.send(message)
  })
}