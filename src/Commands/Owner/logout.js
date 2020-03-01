// Copyright (Fairy)Phy. Licensed under the Apache License 2.0.
// Please see LICENSE file for details.
// Warning: Because it is Japanese Bot,To correspond to the language you are using,Please modify the code yourself.

module.exports =
    (client, message, date, cmd) => {
        try {
            message.channel.send('終了します...')
                .then(m => {
                    console.log(`Debug>終了の実行${date}`)
                    client.destroy()
                });
        }
        catch (err) {
            console.log(`${cmd}コマンド実行中にエラーが発生しました\n${err}`);
        }
    };