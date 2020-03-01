// Copyright (Fairy)Phy. Licensed under the Apache License 2.0.
// Please see LICENSE file for details.
// Warning: Because it is Japanese Bot,To correspond to the language you are using,Please modify the code yourself.

module.exports =
    (message, date, who, cmd) => {
        try {
            message.delete();
            message.channel.send('しばらくお待ち下さい...')
                .then(mes => {
                    mes.edit(`このサーバーの現在のpingは${mes.createdTimestamp - message.createdTimestamp}msです！`)
                        .then(message => console.log(`${who}${cmd}コマンドの実行${date}`))
                        .catch(console.error);
                });
        }
        catch (err) {
            console.log(`${cmd}コマンド実行中にエラーが発生しました\n${err}`);
        }
    };