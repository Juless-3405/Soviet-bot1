const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')

const privateMessage = require('./Private-Message.js')



const poll = require('./poll')

const { Client, MessageEmbed } = require('discord.js')
const command = require('./command')

const welcome = require('./welcome')

client.on('ready', () => {
  console.log('yeet')

  privateMessage(client, '*help', 'Use `*cmdlist` to get a list of commands.')

  welcome(client)

  poll(client)

    client.user.setPresence({ activity: { name: ' *help || Developed by </Juless>#3405' },
     type: 'WATCHING',
      status: 'Online' })
  .then(console.log)
  .catch(console.error);
  command(client, 'ban', (message) => {
    const { member, mentions } = message

    const tag = `<@${member.id}>`

    if (
      member.hasPermission('ADMINISTRATOR') ||
      member.hasPermission('BAN_MEMBERS')
    ) {
      const target = mentions.users.first()
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id)
        targetMember.ban()
        message.channel.send(`${tag}, <@${target.id}> has been successfully banned.`)
      } else {
        message.channel.send(`${tag}, Please specify someone to ban.`)
      }
    } else {
      message.channel.send(
        `${tag} You do not have permission to use this command.`
      )
    }
  })

  command(client, 'kick', (message) => {
    const { member, mentions } = message

    const tag = `<@${member.id}>`

    if (
      member.hasPermission('ADMINISTRATOR') ||
      member.hasPermission('KICK_MEMBERS')
    ) {
      const target = mentions.users.first()
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id)
        targetMember.kick()
        message.channel.send(`${tag}, <@${target.id}> has been kicked`)
      } else {
        message.channel.send(`${tag}, Please specify someone to kick.`)
      }
    } else {
      message.channel.send(
        `${tag}, You do not have permission to use this command.`
      )
    }
  })


})

command(client, 'ping', message => {
  message.channel.send('Pong!')
})
command(client, 'serverinfo', message => {
  client.guilds.cache.forEach(guild => {
    message.channel.send(`${guild.name} has a total of ${guild.memberCount} members. `)
  })
})
command(client, ['cc', 'clearchannel'], message => {
  if (message.member.hasPermission('ADMINISTRATOR')) {
    message.channel.messages.fetch().then((results) => {
      message.channel.bulkDelete(results)
     
    })
  }
})

command(client, 'cmdlist', message => {
  const embed = new MessageEmbed()

  .setTitle('Here is a command list for me:')

  .addField('`*cc`, or `*clearchannel`', 'Will respond in me deleting all recent messages.')

  .addField('`*ban @member`','Will ban a member of your choice.')

  .addField('`*kick @member`', 'Will kick a member of your choice, much like banning, but they can rejoin with a new invite.')

  .addField('`*serverinfo`', 'Will give you all the servers and their info that I am in.')

  .addField('`*invite`', 'Will give you an invite link for me.')

  .addField('`*poll`', 'This one is rather complicated. First you must __send__ your message poll, then after you send it, send another message that reads `*poll` and it will delete the message you just sent, then start a poll.')

  .addField('`*mcpoll`', 'Just use `*mcpollhelp` and it will tell you.')

  .setColor('RANDOM')

  message.channel.send(embed);


})
command(client, 'help', message => {
  message.react('✅')
})
command(client, 'invite', message => {
  const embed = new MessageEmbed()

  .setTitle('My invite link you dumb fuck')

  .setColor('RANDOM')

  .setDescription('Click [here](https://discord.com/oauth2/authorize?client_id=763115607654531092&scope=bot&permissions=8) to invite me to whatever other fucking server you have dumb fuck.')

  .setURL('https://discord.com/oauth2/authorize?client_id=763115607654531092&scope=bot&permissions=8')

  message.channel.send(embed);
})
command(client, 'mcpoll', message => {
  message.react('🅰️')


   setTimeout(() => {
     message.react('🅱️')
   }, 500)
  
   

})
command(client, 'mcpollhelp', message => {
  const embed = new MessageEmbed()

  .setTitle('The Multiple Choice Poll')

  .setColor('RANDOM')

  .setDescription('The Multiple Choice Poll is much like the regular polls, but this time you can choose A or B. How does it work? Well, you have to write out your poll in this format shown below. Then, you watch as people choose the choices you gave.')

  message.channel.send(embed);
    setTimeout(() => {
        message.channel.send('*mcpoll Burgers (A) Pizza (B)')
    }, 6000)
  


})
command(client, 'no', message => {
 const embed = new MessageEmbed()

 .setTitle('Do not read the description.')

 .setDescription('Do not click [here](https://www.youtube.com/watch?v=Lx6YV_nJSps)')

 .setColor('RANDOM')

 message.channel.send(embed);
})

client.login(config.token)