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

    db_delmem.js
    Codename: silence
    v 1.0
    Twitter: @Fairy_Phy
    
    Warning: Because it is Japanese Bot,To correspond to the language you are using,Please modify the code yourself.
                ↑google translate :(((((((((((((((

*/

const authcode = require(`../../tools/randomcode`);

module.exports =
    (message, date, who, cmd, args, connection, cf) => {
        try {
            let id = args.join(` `);
            var Auth = authcode();
            message.member.send(Auth);
            message.channel.send(`DMに送った言葉を入力してください(タイムアウト2分)`)
                .then(() => {
                    message.channel.awaitMessages(response => response.content === ` ` || ` `, {
                        max: 1,
                        time: 120000,
                        errors: ['time'],
                    })
                        .then(collected => {
                            collected.tap(message => {
                                if (Auth == message.content) {
                                    if (isFinite(id)) {
                                        connection.query(`SELECT * FROM ${cf.dbtable} WHERE uuid = ${id}`, (err, rows) => {
                                            if (err) throw err;
                                            if (rows.length > 0) {
                                                rows.forEach(row => {
                                                    connection.query(`DELETE FROM ${cf.dbtable} WHERE uuid = ${id}`, (errr, ress) => {
                                                        if (errr) throw errr;
                                                        message.delete();
                                                        let member = message.guild.members.find(user => user.id === id);
                                                        if (member !== null) {
                                                            member.kick(`${who}によってDBから削除されたため`);
                                                            message.channel.send(`${row.name}をデータベース・サーバーから削除しました`)
                                                                .then(message => console.log(`${who}${cmd}コマンドの実行${date}`))
                                                                .catch(console.error);
                                                        }
                                                        else {
                                                            message.channel.send(`${row.name}をデータベースから削除しました`)
                                                                .then(message => console.log(`${who}${cmd}コマンドの実行${date}`))
                                                                .catch(console.error);
                                                        }
                                                    });
                                                });
                                            }
                                            else {
                                                message.delete();
                                                message.channel.send(`そのIDはDB上に存在しません`)
                                                    .then(message => console.log(`${who}${cmd}コマンドの実行失敗${date}`))
                                                    .catch(console.error);
                                            }
                                        });
                                    }
                                    else {
                                        message.delete();
                                        message.channel.send(`IDは数字でなければいけません`)
                                            .then(message => console.log(`${who}${cmd}コマンドの実行失敗${date}`))
                                            .catch(console.error);
                                    }
                                }
                                else {
                                    message.channel.send(`認証番号が違います！`);
                                    console.log(`${who}${cmd}コマンドの実行失敗${date}`);
                                    return;
                                }
                            });
                        });
                });
        }
        catch (err) {
            console.log(`${cmd}コマンド実行中にエラーが発生しました\n${err}`);
        }
    };