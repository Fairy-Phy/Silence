// Copyright (Fairy)Phy. Licensed under the Apache License 2.0.
// Please see LICENSE file for details.
// Warning: Because it is Japanese Bot,To correspond to the language you are using,Please modify the code yourself.

module.exports =
    (client, message, date, who, cmd, args) => {
        try {
            message.delete();
            let id = args.join(` `);
            let member = client.users.find(user => user.id === id);
            message.channel.send(member.username)
                .then(message => console.log(`${who}${cmd}コマンドの実行${date}`))
                .catch(console.error);
        }
        catch (err) {
            console.log(`${cmd}コマンド実行中にエラーが発生しました\n${err}`);
        }
    };