// Copyright (Fairy)Phy. Licensed under the Apache License 2.0.
// Please see LICENSE file for details.
// Warning: Because it is Japanese Bot,To correspond to the language you are using,Please modify the code yourself.

module.exports.ready =
    (client, connection, cf, date) => {
        try {
            connection.query(`SELECT count(*) AS usercounts FROM ${cf.dbtable}`, function (err, rows) {
                if (err) throw err;
                rows.forEach(row => {
                    var count = rows[0].usercounts;
                    client.user.setActivity(`${cf.fpf}help | ${count} Users!`, { type: `${cf.botact}` });
                    client.user.setStatus(cf.botsta);
                });
            });
            let start = `${client.user.username}Bot起動${date}`;
            console.log(start);
        }
        catch (err) {
            console.log(`readyイベントでエラーが発生しました\n${err}`);
        }
    };

module.exports.debug =
    (client, date) => {
        try {
            let start = `${client.user.username}Bot起動${date}`;
            console.log(start);
            console.log(`Test debug>終了の実行${date}`);
            client.destroy();
        }
        catch (err) {
            console.log(`テストデバッグ中にエラーが発生しました\n${err}`);
        }
    };