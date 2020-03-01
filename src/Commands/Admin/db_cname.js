// Copyright (Fairy)Phy. Licensed under the Apache License 2.0.
// Please see LICENSE file for details.
// Warning: Because it is Japanese Bot,To correspond to the language you are using,Please modify the code yourself.

module.exports =
    (message, date, who, cmd, args, connection, cf) => {
        try {
            let [id, name] = args;
            if (isFinite(id)) {
                connection.query(`SELECT * FROM ${cf.dbtable} WHERE uuid = ${id}`, (err, rows) => {
                    if (err) throw err;
                    if (rows.length > 0) {
                        rows.forEach( row => {
                            let dfname = row.name;
                            connection.query(`UPDATE ${cf.dbtable} SET name= '${name}' WHERE uuid= ${id}`, (errr, ress) => {
                                if (errr) throw errr;
                                message.delete();
                                message.channel.send(`ID: ${id}の名前を${dfname}から${name}に変更しました`)
                                    .then(message => console.log(`${who}${cmd}コマンドの実行${date}`))
                                    .catch(console.error);
                            });
                        });
                    }
                    else {
                        message.delete();
                        message.channel.send(`そのIDは登録されていません`)
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
        catch (err) {
            console.log(`${cmd}コマンド実行中にエラーが発生しました\n${err}`);
        }
    };