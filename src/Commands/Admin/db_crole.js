// Copyright (Fairy)Phy. Licensed under the Apache License 2.0.
// Please see LICENSE file for details.
// Warning: Because it is Japanese Bot,To correspond to the language you are using,Please modify the code yourself.

const authcode = require(`../../tools/randomcode`);

module.exports =
    (client, message, date, who, cmd, args, connection, rolenames, roleids, cf) => {
        try {
            let [id, afrole] = args;
            message.delete();
            const Auth = authcode();
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
                                        if (afrole < 2) {
                                            connection.query(`SELECT * FROM ${cf.dbtable} WHERE uuid = ${id}`, (err, rows) => {
                                                if (err) throw err;
                                                if (rows.length > 0) {
                                                    rows.forEach( row => {
                                                        let dfrole = row.role;
                                                        connection.query(`UPDATE ${cf.dbtable} SET role= '${afrole}' WHERE uuid= ${id}`, (errr, ress) => {
                                                            if (errr) throw errr;
                                                            let changerole = new Promise((resolve, reject) => {

                                                                const dlrole = message.guild.roles.find(role => role.id === roleids[dfrole]);

                                                                const member = message.guild.members.find(user => user.id === id);

                                                                if (member !== null) {

                                                                    member.removeRole(dlrole);

                                                                    const adrole = message.guild.roles.find(role => role.id === roleids[afrole]);

                                                                    member.addRole(adrole);

                                                                    if (afrole == 0) {

                                                                        member.send({
                                                                            embed: {
                                                                                title: `コマンド実行によりRoleが変更されました！ ${rolenames[0]}では次のことが許可されています！`,
                                                                                "fields": [
                                                                                    {
                                                                                        "name": "サーバーの操作ができます",
                                                                                        "value": "今日からあなたはここの管理者です。"
                                                                                    },
                                                                                    {
                                                                                        "name": "データベースへの追加、変更、削除等が行えます",
                                                                                        "value": `結入Botのすべてのコマンドを使うことができます\n@${client.user.username}で確認できます！`
                                                                                    },
                                                                                    {
                                                                                        "name": "すべてのチャンネルを読んだり送信することができます",
                                                                                        "value": "これはあなたが認定された証です"
                                                                                    },
                                                                                    {
                                                                                        "name": "抜けたらBANされます",
                                                                                        "value": `現在${rolenames[0]}は抜けたらBANされます`
                                                                                    }
                                                                                ],
                                                                                color: 7328768,
                                                                                footer: {
                                                                                    text: `${client.user.username} Bot`
                                                                                }
                                                                            }
                                                                        });

                                                                    }
                                                                    else if (afrole == 1) {
                                                                        member.send({
                                                                            embed: {
                                                                                title: `コマンド実行によりRoleが変更されました！ ${rolenames[1]}では次のことが許可されています！`,
                                                                                "fields": [
                                                                                    {
                                                                                        "name": "サーバーの操作ができます",
                                                                                        "value": "ほぼ自由にサーバーを操作できます"
                                                                                    },
                                                                                    {
                                                                                        "name": "すべてのチャンネルを読んだり送信することができます",
                                                                                        "value": "これはあなたが認定された証です"
                                                                                    },
                                                                                    {
                                                                                        "name": "抜けたらBANされます",
                                                                                        "value": `現在${rolenames[1]}は抜けたらBANされます`
                                                                                    }
                                                                                ],
                                                                                color: 7328768,
                                                                                footer: {
                                                                                    text: `${client.user.username} Bot`
                                                                                }
                                                                            }
                                                                        });
                                                                    }
                                                                }
                                                            });
                                                            changerole.catch(() => {
                                                                console.error('エラー発生！')
                                                            });
                                                            message.channel.send(`ID: ${id}のRoleを${rolenames[dfrole]}から${rolenames[afrole]}に変更しました`)
                                                                .then(message => console.log(`${who}${cmd}コマンドの実行${date}`))
                                                                .catch(console.error);

                                                        });
                                                    });
                                                }
                                                else {
                                                    message.channel.send(`そのIDは登録されていません`)
                                                        .then(message => console.log(`${who}${cmd}コマンドの実行失敗${date}`))
                                                        .catch(console.error);
                                                }
                                            });
                                        }
                                        else {
                                            message.channel.send(`${rolenames[afrole]}には変更できません`)
                                                .then(message => console.log(`${who}${cmd}コマンドの実行失敗${date}`))
                                                .catch(console.error);
                                        }
                                    }
                                    else {
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
                            })
                        })
                })
        }
        catch (err) {
            console.log(`${cmd}コマンド実行中にエラーが発生しました\n${err}`);
        }
    };