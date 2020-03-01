// Copyright (Fairy)Phy. Licensed under the Apache License 2.0.
// Please see LICENSE file for details.
// Warning: Because it is Japanese Bot,To correspond to the language you are using,Please modify the code yourself.

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