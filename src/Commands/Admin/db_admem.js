// Copyright (Fairy)Phy. Licensed under the Apache License 2.0.
// Please see LICENSE file for details.
// Warning: Because it is Japanese Bot,To correspond to the language you are using,Please modify the code yourself.

const authcode = require(`../../tools/randomcode`);

module.exports =
    (message, date, who, cmd, args, connection, rolenames, cf) => {
        try {
            let [name, id, role] = args;
            //処理内で入力するのめんどい
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
                                    //もしかしたら入力しないで登録できてしまうための対策だけどいらないかもしれないから伏せ
                                    if (typeof name && role && id == 'undefined') {
                                        message.channel.send(`すべて入力されていないか入力箇所が足りません`)
                                            .then(message => console.log(`${who}${cmd}コマンドの実行失敗${date}`))
                                            .catch(console.error);
                                            return;
                                    }
                                    //数字じゃないとエラーのため
                                    if (isFinite(id && role)) {
                                        connection.query(`SELECT * FROM ${cf.dbtable} WHERE uuid = ${id}`, (erro, rowso) => {
                                            if (erro) throw erro;
                                            if (rowso.length > 0) {
                                                connection.query(`INSERT INTO ${cf.dbtable}(name, uuid, role) Values('${name}', ${id}, ${role})`, (errr, ress) => {
                                                    if (errr) throw errr;
                                                        message.channel.send(`名前: ${name}\nID: ${id}\nrole: ${rolenames[role]}\nをデータベースに追加しました`)
                                                            .then(message => console.log(`${who}${cmd}の実行${date}`))
                                                            .catch(console.error);
                                                });
                                            }
                                            else {
                                                rowso.forEach(rowo => {
                                                    let dbrole = rowo.role;
                                                    message.channel.send(`既にデータベース上に\n名前: ${rowo.name} role: ${rolenames[dbrole]}\nで登録されています`)
                                                        .then(message => console.log(`${who}${cmd}の実行失敗${date}`))
                                                        .catch(console.error);
                                                });
                                            }
                                        });
                                    }
                                    else {
                                        message.channel.send(`IDとroleは数字でなければいけません`)
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