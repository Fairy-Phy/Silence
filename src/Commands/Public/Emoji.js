// Copyright (Fairy)Phy. Licensed under the Apache License 2.0.
// Please see LICENSE file for details.
// Warning: Because it is Japanese Bot,To correspond to the language you are using,Please modify the code yourself.

module.exports =
    (message, date, who, cmd, args) => {
        try {
            message.delete();
            let name = args.join(` `);
            let Attachment = (message.attachments).array();
            Attachment.forEach(attachment => {
                message.guild.createEmoji(`${attachment.url}`, `${name}`)
                    .then(emoji => {
                        console.log(`${who} ${emoji.name}の追加`);
                        message.channel.send(`${emoji.name}を追加しました！`);
                    })
                    .catch(console.error);
            });
        }
        catch (err) {
            console.log(`${cmd}コマンド実行中にエラーが発生しました\n${err}`);
        }
    };