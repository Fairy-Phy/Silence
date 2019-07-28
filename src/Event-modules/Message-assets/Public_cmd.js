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

    Public_cmd.js
    Codename: silence
    v 1.0
    Twitter: @Fairy_Phy
    
    Warning: Because it is Japanese Bot,To correspond to the language you are using,Please modify the code yourself.
                ↑google translate :(((((((((((((((

*/

const find = require(`../../Commands/Public/Find`),
    ping = require(`../../Commands/Public/Ping`),
    ver = require(`../../Commands/Public/Ver`),
    help = require(`../../Commands/Public/Help`),
    emoji = require(`../../Commands/Public/Emoji`),
    role = require(`../../Commands/Public/role`);

module.exports =
    (client, message, cf, date, who, rolehas, rolenames) => {
        try {
            let msg = message.content.toLowerCase(),
                args = message.content.slice(cf.fpf.length).trim().split(/ +/g),
                cmd = args.shift().toLowerCase();

            let prec = message.content.slice(0, cf.fpf.length).trim().split(/ +/g),
                preco = prec.shift().toLowerCase();

            let precheck = cf.fpf == preco;

            if (!precheck) return;

            if (cmd === `find`) find(client, message, date, who, cmd, args);

            else if (cmd === `ping`) ping(message, date, who, cmd);

            else if (cmd === `ver`) ver(client, message, date, who, cmd);

            else if (cmd === `help`) help(message, cf, date, who, cmd, rolehas, rolenames);

            else if (cmd === `emoji`) emoji(message, date, who, cmd, args);

            else if (cmd === `role`) role(message, date, who, cmd, args);
        }
        catch (err) {
            console.log(`Publicコマンド中継地点でエラーが発生しました\n${err}`);
        }
    };