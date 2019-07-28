/*

   Copyright 2018 (Fairy)Phy

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0       

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

    Main.js
    Codename: silence
    v 1.0
    Twitter: @Fairy_Phy
    
    Warning: Because it is Japanese Bot,To correspond to the language you are using,Please modify the code yourself.
                ↑google translate :(((((((((((((((

*/

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