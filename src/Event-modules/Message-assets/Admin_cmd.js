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

    Admin_cmd.js
    Codename: silence
    v 1.0.1
    Twitter: @Fairy_Phy
    
    Warning: Because it is Japanese Bot,To correspond to the language you are using,Please modify the code yourself.
                ↑google translate :(((((((((((((((

*/

const db_find = require(`../../Commands/Admin/db_find`),
    db_list = require(`../../Commands/Admin/db_list`),
    db_cname = require(`../../Commands/Admin/db_cname`),
    db_crole = require(`../../Commands/Admin/db_crole`),
    db_admem = require(`../../Commands/Admin/db_admem`),
    db_delmem = require(`../../Commands/Admin/db_delmem`);

module.exports =
    (client, message, cf, date, who, roleids, rolehas, rolenames, connection) => {
        try {
            let msg = message.content.toLowerCase(),
                args = message.content.slice(cf.spf.length).trim().split(/ +/g),
                cmd = args.shift().toLowerCase();

            let prec = message.content.slice(0, cf.spf.length).trim().split(/ +/g),
                preco = prec.shift().toLowerCase();

            let precheck = cf.spf == preco;

            if (!precheck) return;

            if (!rolehas[0]) {
                console.log(`${message.author.tag}は${rolenames[0]}ではありません`)
                return;
            }

            if (cmd === `db-find`) db_find(message, date, who, cmd, args, connection, cf);

            else if (cmd === `db-list`) db_list(message, date, who, cmd, args, connection, rolenames, cf);

            else if (cmd === `db-cname`) db_cname(message, date, who, cmd, args, connection, rolenames, cf);

            else if (cmd === `db-crole`) db_crole(client, message, date, who, cmd, args, connection, rolenames, roleids, cf);

            else if (cmd === `db-admem`) db_admem(message, date, who, cmd, args, connection, rolenames, cf);

            else if (cmd === `db-delmem`) db_delmem(message, date, who, cmd, args, connection, cf);
        }
        catch (err) {
            console.log(`Adminコマンド中継地点でエラーが発生しました\n${err}`);
        }
    };