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

    db_list.js
    Codename: silence
    v 1.0
    Twitter: @Fairy_Phy
    
    Warning: Because it is Japanese Bot,To correspond to the language you are using,Please modify the code yourself.
                ↑google translate :(((((((((((((((

*/

module.exports =
    (message, date, who, cmd, args, connection, rolenames, cf) => {
        try {
            message.delete();
            connection.query(`SELECT * FROM ${cf.dbtable}`, (err, rows) => {
                if (err) throw err;
                message.member.send(`
                ┏━━━━━━━━━━━━━━━━━━━━━━━┓
                \n┃登録名前 ->                         UserID                       -> role┃
                `);
                rows.forEach( row => {
                    message.member.send(`
                    ┃${row.name} -> ${row.uuid} -> ${rolenames[row.role]}┃
                    `)
                });
                message.member.send(`
                ┗━━━━━━━━━━━━━━━━━━━━━━━┛
                `);
                message.reply(`DMをご確認ください`);
                console.log(`${who}${cmd}コマンドの実行${date}`);
            });
        }
        catch (err) {
            console.log(`${cmd}コマンド実行中にエラーが発生しました\n${err}`);
        }
    };