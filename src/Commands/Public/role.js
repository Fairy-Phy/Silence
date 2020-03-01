// Copyright (Fairy)Phy. Licensed under the Apache License 2.0.
// Please see LICENSE file for details.
// Warning: Because it is Japanese Bot,To correspond to the language you are using,Please modify the code yourself.

module.exports =
    (message, date, who, cmd, args) => {
        try {
            message.delete();
            let id = args.join(` `);
            const role = message.guild.roles.find(role => role.id === id);
            message.channel.send(`${role.name}`)
                .then(message => console.log(`${who}${cmd}コマンドの実行${date}`))
                .catch(console.error);
        }
        catch (err) {
            console.log(`${cmd}コマンド実行中にエラーが発生しました\n${err}`)
        }
    };