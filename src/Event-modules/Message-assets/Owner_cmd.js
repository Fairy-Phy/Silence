// Copyright (Fairy)Phy. Licensed under the Apache License 2.0.
// Please see LICENSE file for details.
// Warning: Because it is Japanese Bot,To correspond to the language you are using,Please modify the code yourself.

const restart = require(`../../Commands/Owner/restart`),
    logout = require(`../../Commands/Owner/logout`);

module.exports =
    (client, message, cf, date, who) => {
        try {
            let msg = message.content.toLowerCase(),
                args = message.content.slice(cf.dpf.length).trim().split(/ +/g),
                cmd = args.shift().toLowerCase();

            let prec = message.content.slice(0, cf.dpf.length).trim().split(/ +/g),
                preco = prec.shift().toLowerCase();

            let precheck = cf.dpf == preco;

            if (!precheck) return;

            const botown = message.author.id == cf.bwid;

            if (!botown) {
                console.log(`${who}デバッグ用コマンドを実行しようとしました`)
                return;
            }

            if (cmd === `restart`) restart(client, message, date, cmd, cf);

            else if (cmd === `logout`) logout(client, message, date, cmd);
        }
        catch (err) {
            console.log(`Ownerコマンド中継地点でエラーが発生しました\n${err}`);
        }
    };