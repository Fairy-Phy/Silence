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

    Owner_cmd.js
    Codename: silence
    v 1.0
    Twitter: @Fairy_Phy
    
    Warning: Because it is Japanese Bot,To correspond to the language you are using,Please modify the code yourself.
                ↑google translate :(((((((((((((((

*/

const restart = require(`../../Commands/Owner/restart`),
    logout = require(`../../Commands/Owner/logout`);

module.exports =
    (client, message, cf, date, who) => {
        try {
            let msg = message.content.toLowerCase(),
                args = message.content.slice(cf.dpf.length).trim().split(/ +/g),
                cmd = args.shift().toLowerCase();

            let prec = message.content.slice(0, cf.dpf.length).trim().split(/ +/g),
                preco = prec.shift().toLowerCase();

            let precheck = cf.dpf == preco;

            if (!precheck) return;

            const botown = message.author.id == cf.bwid;

            if (!botown) {
                console.log(`${who}デバッグ用コマンドを実行しようとしました`)
                return;
            }

            if (cmd === `restart`) restart(client, message, date, cmd, cf);

            else if (cmd === `logout`) logout(client, message, date, cmd);
        }
        catch (err) {
            console.log(`Ownerコマンド中継地点でエラーが発生しました\n${err}`);
        }
    };