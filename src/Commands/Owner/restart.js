// Copyright (Fairy)Phy. Licensed under the Apache License 2.0.
// Please see LICENSE file for details.
// Warning: Because it is Japanese Bot,To correspond to the language you are using,Please modify the code yourself.

module.exports =
    (client, message, date, cmd, cf) => {
        try {
            message.channel.send('再起動をしています...')
                .then(m => {
                    console.log(`Debug>再起動の実行${date}`);
                    client.destroy()
                        .then(() => {
                            client.login(cf.token);
                        });
                });
        }
        catch (err) {
            console.log(`${cmd}コマンド実行中にエラーが発生しました\n${err}`);
        }
    };