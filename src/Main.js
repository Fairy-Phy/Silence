// Copyright (Fairy)Phy. Licensed under the Apache License 2.0.
// Please see LICENSE file for details.
// Warning: Because it is Japanese Bot,To correspond to the language you are using,Please modify the code yourself.

require('json5/lib/register');
const cf = require(`./Config/cf.json5`),
    Discord = require('discord.js'),
    client = new Discord.Client(),
    date = `\n${String(new Date())}`,
    connection = require('./Config/DBconf'),
    mes = require(`./Event-modules/Message`),
    readyy = require(`./Event-modules/Ready`),
    memberadd = require(`./Event-modules/GuildMemberAdd`),
    memberrem = require(`./Event-modules/GuildMemberRemove`);

client.tokenid = cf.token;
client.ver = cf.version;

module.exports =
    debugs => {
        try {
            if (debugs === true) client.on('ready', () => readyy.debug(client, date));

            else client.on('ready', () => readyy.ready(client, connection, cf, date));

            client.on('message', message => mes(client, message, connection, cf, date));

            client.on('guildMemberAdd', member => memberadd(client, member, connection, cf, date));

            client.on("guildMemberRemove", member => memberrem(client, member, connection, cf, date));

            client.login(client.tokenid);
        }
        catch (err) {
            console.log(`Mainコード内でエラーが発生しました\n${err}`);
            const restart = require(`./Restart`);
            restart(client, date);
        }
    };