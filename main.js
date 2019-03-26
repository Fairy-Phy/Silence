/*

   Copyright 2018 (Fairy)Phy

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0       

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

    main.js
    Codename: silence
    v dev2.0 project(20190326)
    Twitter: @Fairy_Phy
    
    Warning: Because it is Japanese Bot,To correspond to the language you are using,Please modify the code yourself.
                ↑google translate :(((((((((((((((

*/

require('json5/lib/register')

const Discord = require('discord.js');

const client = new Discord.Client();

const cf = require(`./cf.json5`);

const date = `\n${String(new Date())}`;

const botver = cf.version;

/*
rolenames & roleids is
0 => Administrator role
1 => Normal role
2 => One Time Moderater role
3 => One Time role
*/
const rolenames = [cf.firstrole, cf.secondrole, cf.thirdrole, cf.fourthrole];

const roleids = [cf.suid, cf.exid, cf.otmid, cf.otid];

const connection = require('./dbconf');

client.on('ready', () => {
    let start = `${client.user.username}Bot起動${date}`;
    function readyy() {
        connection.query(`SELECT count(*) AS usercounts FROM ${cf.dbtable}`, function (err, rows) {
            if (err) throw err;
            rows.forEach((row) => {
                var counto = rows[0].usercounts;
                connection.query(`SELECT count(*) AS usercounts FROM ${cf.ottable}`, function (erro, rowso) {
                    if (erro) throw erro;
                    rowso.forEach((rowo) => {
                        var countt = rowso[0].usercounts;
                        var count = counto + countt;
                        client.user.setActivity(`${cf.fpf}help | ${count} Users!`, { type: `${cf.botact}` })
                        client.user.setStatus(cf.botsta);
                    })
                })
            })
        })
    }
    setInterval(readyy, 1000);
    console.log(start);
});

//対話β
client.on('message', message => {

    if (message.author.bot) return;

    if (!message.guild) return;

    const otdel = message.guild.roles.find(role => role.id === roleids[3]);

    const delot = message.member.roles.has(otdel.id);

    const surole = message.guild.roles.find(role => role.id === roleids[0]);

    const su = message.member.roles.has(surole.id);

    const rtrole = message.guild.roles.find(role => role.id === roleids[1]);

    const rt = message.member.roles.has(rtrole.id);

    const otmrole = message.guild.roles.find(role => role.id === roleids[2]);

    const otm = message.member.roles.has(otmrole.id);

    if (delot) {
        console.log(`${message.author.tag}は${rolenames[3]}です`)
        return;
    }

    let who = `${message.author.tag}が`;

    if (message.isMentioned(client.user)) {

        if (su) {
            message.channel.send(`はい！何でしょうか？ 以下の項目から選択したい番号を入力してください！(番号外は反応しません)`);
            message.channel.send(`<メニュー>
                                \n1, 各実行コマンドの説明
                                \n2, ping, ver等の雑用コマンド
                                \n3, データベースの追加、変更、削除等のコマンド
                                \n4, 認定証の発行(今は選べません)`)
                .then(() => {
                    //結局||つけても意味がないので自由入力にさせて後のifで変える(switchでも良かったかなぁ)
                    message.channel.awaitMessages(response => response.content === ' ' || ' ', {
                        max: 1,
                        time: 10000,
                        errors: ['time'],
                    })
                        .then((collected) => {
                            if (collected.first().content == 1) {
                                message.reply(`DMをご確認ください！`);
                                message.member.send(`
                                一般コマンド\(プレフィックスは ${cf.fpf} です\)
                                \n\`\`\`
                                \n${cf.fpf}ping => pingを測ります
                                \n${cf.fpf}ver => Botのバージョンを表示します
                                \n${cf.fpf}help => ヘルプを表示します
                                \n${cf.fpf}emoji [名前] [画像URL] => 画像URLをもとに絵文字を作成します
                                \n${cf.fpf}onetime-add [ID] => データベースにワンタイムとしてIDを登録します(${rolenames[0]},${rolenames[1]},${rolenames[3]}専用)
                                \n\`\`\`
                                `)
                                    .then(message => console.log(`${who}${cmd}コマンドの実行${date}`))
                                const alor = message.guild.roles.find(role => role.id === roleids[0]);
                                const su = message.member.roles.has(alor.id);
                                if (su) {
                                    message.member.send(`
                                    SUコマンド\(プレフィックスは ${cf.spf} です\)
                                    \n\`\`\`
                                    \n${cf.spf}db-find [Userid] => データベース上にIDが登録されているか確認します
                                    \n${cf.spf}db-list => データベースに登録されている名前とIDをリストにして表示します
                                    \n${cf.spf}db-cname [ID] [変更したい名前] => 登録されているIDの名前を変更できます
                                    \n${cf.spf}db-crole [ID] [変更したいrole(Super=0 Root=1)] => 登録されているIDのroleを変更できます
                                    \n${cf.spf}db-admem [名前] [ID] [role(${rolenames[0]}=0 ${rolenames[1]}=1 ${rolenames[3]}=3 (${rolenames[2]}=2 互換性を保つため )] => データベースにそのIDを追加します
                                    \n${cf.spf}db-delmem [ID]=> そのIDをデータベースから削除します
                                    \n\`\`\`
                                    `)
                                    const Bw = message.author.id == cf.bwid;
                                    if (Bw) {
                                        message.member.send(`
                                        Botownデバッグコマンド\(プレフィックスは ${cf.dpf} です\)
                                        \n\`\`\`
                                        \n${cf.dpf}restart => Botの再起動
                                        \n${cf.dpf}logout => Botの終了
                                        \n${cf.dpf}botstart =>Botの状態をオンラインにする
                                        \n${cf.dpf}botmem => Botの状態をメンテナンス中にする
                                        \n\`\`\`
                                        `)
                                    }
                                    else {
                                        return;
                                    }
                                }
                                else {
                                    return;
                                }
                            }
                            if (collected.first().content == 2) {
                                message.channel.send(`<ping, ver等の雑用コマンド>
                                                    \n1, Pingを測ります！
                                                    \n2, Botのバージョンを表示します！
                                                    \n3, 絵文字を追加します！(URL方式)`);
                            }
                            else if (collected.first().content == 3) {
                                message.channel.send(`2を入力しました`);
                            }
                            else if (collected.first().content == 4) {
                                message.channel.send(`まだ作られていません！カミングスーン！`);
                            }
                            else if (collected.first().content > 4) {
                                message.channel.send(`番号が違います！`);
                                console.log(`${who}対話の実行失敗${date}`)
                            }
                        })
                        .catch(() => {
                            message.channel.send('入力時間が過ぎました！再度やりたい場合はまた声をかけてください！');
                            console.log(`${who}対話の実行失敗${date}`)
                        });
                });
        }

        if (rt) {
            message.channel.send(`はい！何でしょうか？ 以下の項目から選択したい番号を入力してください！`)
                .then(() => {
                    //結局||つけても意味がないので後のifで変える
                    message.channel.awaitMessages(response => response.content === ' ' || ' ', {
                        max: 1,
                        time: 30000,
                        errors: ['time'],
                    })
                        .then((collected) => {
                            console.log(collected.first().content);
                            if (collected.first().content == 0) {
                                message.channel.send(`0を入力しました`);
                            }
                            else if (collected.first().content == 1) {
                                message.channel.send(`1を入力しました`);
                            }
                            else {
                                message.channel.send(`入力が違います`);
                            }
                        })
                        .catch(() => {
                            message.channel.send('入力時間が過ぎました');
                        });
                });
        }
    };
});

//メインコマンド
client.on('message', message => {

    if (message.author.bot) return;

    if (!message.guild) return;

    const otdel = message.guild.roles.find(role => role.id === roleids[3]);

    const delot = message.member.roles.has(otdel.id);

    if (delot) {
        console.log(`${message.author.tag}は${rolenames[3]}です`)
        return;
    }

    let msg = message.content.toLowerCase();
    let args = message.content.slice(cf.fpf.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    let prec = message.content.slice(0, cf.fpf.length).trim().split(/ +/g);
    let preco = prec.shift().toLowerCase();

    let precheck = cf.fpf == preco;

    if (!precheck) return;

    let who = `${message.author.tag}が`;

    //後のアプデの参考になるかと
    /*if (cmd === `find`) {
        let idd = args.join(` `);
        message.delete();
        let member = client.users.find("id", `${idd}`);
        message.channel.send(member.username)
            .then(message => console.log(`${who}${cmd}コマンドの実行${date}`))
            .catch(console.error);
    }*/

    if (cmd === `ping`) {
        message.delete();
        message.channel.send('しばらくお待ち下さい...')
            .then(function (m) {
                m.edit(`このサーバーの現在のpingは${m.createdTimestamp - message.createdTimestamp}msです！`)
                    .then(message => console.log(`${who}${cmd}コマンドの実行${date}`))
                    .catch(console.error);
            })
    }

    if (cmd === `ver`) {
        message.delete();
        message.channel.send(`Botname: ${client.user.username}\nVersion: ${botver}`)
            .then(message => console.log(`${who}${cmd}コマンドの実行${date}`))
            .catch(console.error);
    }

    if (cmd === `help`) {
        message.delete();
        message.reply(`DMをご確認ください！`);
        message.member.send(`
        一般コマンド\(プレフィックスは ${cf.fpf} です\)
        \n\`\`\`
        \n${cf.fpf}ping => pingを測ります
        \n${cf.fpf}ver => Botのバージョンを表示します
        \n${cf.fpf}help => ヘルプを表示します
        \n${cf.fpf}emoji [名前] [画像URL] => 画像URLをもとに絵文字を作成します
        \n\`\`\`
        `)
            .then(message => console.log(`${who}${cmd}コマンドの実行${date}`))
            .catch(console.error);
        const otmrl = message.guild.roles.find(role => role.id === roleids[2]);
        const otm = message.member.roles.has(otmrl.id);
        const rtrl = message.guild.roles.find(role => role.id === roleids[1]);
        const rt = message.member.roles.has(rtrl.id);
        const alor = message.guild.roles.find(role => role.id === roleids[0]);
        const su = message.member.roles.has(alor.id);
        if (otm || su || rt) {
            message.member.send(`
            ${rolenames[3]}DBコマンド\(プレフィックスは ${cf.fpf} です\)
            \n\`\`\`
            \n${cf.fpf}onetime-find [Userid] => ${rolenames[3]}データベース上にIDが登録されているか確認します
            \n${cf.fpf}onetime-list => ${rolenames[3]}データベースに登録されている名前とIDをリストにして表示します
            \n${cf.fpf}onetime-cname [ID] [変更したい名前] => 登録されているIDの名前を変更できます
            \n${cf.fpf}onetime-add [名前] [ID] [time(0以上25未満の時間)] => データベースにそのIDを追加します
            \n${cf.fpf}onetime-del [ID] => そのIDをデータベースから削除します
            \n\`\`\`
            `)
        }
        if (su) {
            message.member.send(`
            SUコマンド\(プレフィックスは ${cf.spf} です\)
            \n\`\`\`
            \n${cf.spf}db-find [ID] => データベース上にIDが登録されているか確認します
            \n${cf.spf}db-list => データベースに登録されている名前とIDをリストにして表示します
            \n${cf.spf}db-cname [ID] [変更したい名前] => 登録されているIDの名前を変更できます
            \n${cf.spf}db-crole [ID] [変更したいrole(Super=0 Root=1)] => 登録されているIDのroleを変更できます
            \n${cf.spf}db-admem [名前] [ID] [role(${rolenames[0]}=0 ${rolenames[1]}=1 ${rolenames[2]}=2] => データベースにそのIDを追加します
            \n${cf.spf}db-delmem [ID]=> そのIDをデータベースから削除します
            \n\`\`\`
            `)
        }
        const Bw = message.author.id == cf.bwid;
        if (Bw) {
            message.member.send(`
            Botownデバッグコマンド\(プレフィックスは ${cf.dpf} です\)
            \n\`\`\`
            \n${cf.dpf}restart => Botの再起動
            \n${cf.dpf}logout => Botの終了
            \n${cf.dpf}botstart =>Botの状態を稼働中にする
            \n${cf.dpf}botmem => Botの状態をメンテナンス中にする
            \n\`\`\`
            `)
        }
        else {
            return;
        }
    }

    if (cmd === `emoji`) {
        let name = args.join(` `);
        let Attachment = (message.attachments).array();
        message.delete();
        Attachment.forEach(function (attachment) {
            message.guild.createEmoji(`${attachment.url}`, `${name}`)
                .then(emoji => {
                    console.log(`${emoji.name}の追加`);
                    message.channel.send(`${emoji.name}を追加しました！`);
                })
                .catch(console.error);
        })
    }

});

client.on('guildMemberAdd', member => {
    connection.query(`SELECT uuid, role FROM ${cf.dbtable} WHERE uuid = '${member.user.id}'`, function (err, rows) {
        if (err) throw err;
        connection.query(`SELECT uuid, time FROM ${cf.ottable} WHERE uuid = '${member.user.id}'`, function (erro, rowso) {
            if (erro) throw erro;
            if (rows.length > 0) {
                if (!member.user.bot) {
                    rows.forEach((row) => {
                        if (row.role == 0) {
                            const surole = member.guild.roles.find(role => role.id === roleids[0]);
                            member.addRole(surole);
                            const channel = client.channels.find(ch => ch.id === `${cf.logc}`);
                            channel.send({
                                embed: {
                                    title: "参加を許可します",
                                    description: `名前: ${member.user.tag}
                                \nID: ${member.user.id}
                                \nrole: ${rolenames[0]}`,
                                    color: 7328768,
                                    timestamp: new Date(),
                                    footer: {
                                        text: `${client.user.username} Bot`
                                    },
                                    author: {
                                        name: "アクセス権の確認",
                                    }
                                }
                            });
                            member.send({
                                embed: {
                                    title: `Welcome to ${member.guild.name}! ${rolenames[0]}では次のことが許可されています！`,
                                    "fields": [
                                        {
                                            "name": "サーバーの操作ができます",
                                            "value": "今日からあなたはここの管理者です。"
                                        },
                                        {
                                            "name": "データベースへの追加、変更、削除等が行えます",
                                            "value": "結入Botのすべてのコマンドを使うことができます"
                                        },
                                        {
                                            "name": "すべてのチャンネルを読んだり送信することができます",
                                            "value": "これはあなたが認定された証です"
                                        },
                                        {
                                            "name": "抜けたらBANされます",
                                            "value": `現在${rolenames[0]}は抜けたらBANされます`
                                        },
                                        {
                                            "name": "他にもいろいろ...?",
                                            "value": "様々なことができたり追加されたりします、乞うご期待！"
                                        }
                                    ],
                                    color: 7328768,
                                    footer: {
                                        text: `${client.user.username} Bot`
                                    }
                                }
                            });
                        }
                        else if (row.role == 1) {
                            const exrole = member.guild.roles.find(role => role.id === roleids[1]);
                            member.addRole(exrole);
                            let channel = client.channels.find(ch => ch.id === `${cf.logc}`);
                            channel.send({
                                embed: {
                                    title: "参加を許可します",
                                    description: `名前: ${member.user.tag}
                                \nID: ${member.user.id}
                                \nrole: ${rolenames[1]}`,
                                    color: 7328768,
                                    timestamp: new Date(),
                                    footer: {
                                        text: `${client.user.username} Bot`
                                    },
                                    author: {
                                        name: "アクセス権の確認",
                                    }
                                }
                            });
                            member.send({
                                embed: {
                                    title: `Welcome to ${member.guild.name}! ${rolenames[1]}では次のことが許可されています！`,
                                    "fields": [
                                        {
                                            "name": "サーバーの操作ができます",
                                            "value": "ほぼ自由にサーバーを操作できます"
                                        },
                                        {
                                            "name": `${rolenames[3]}の追加、有効化、削除等が行なえます`,
                                            "value": "結入Botのほぼすべてのコマンドを使うことができます"
                                        },
                                        {
                                            "name": "すべてのチャンネルを読んだり送信することができます",
                                            "value": "これはあなたが認定された証です"
                                        },
                                        {
                                            "name": "抜けたらBANされます",
                                            "value": `現在${rolenames[1]}は抜けたらBANされます`
                                        }
                                    ],
                                    color: 7328768,
                                    footer: {
                                        text: `${client.user.username} Bot`
                                    }
                                }
                            });
                        }
                        else if (row.role == 2) {
                            const otmrole = member.guild.roles.find(role => role.id === roleids[2]);
                            member.addRole(otmrole);
                            let channel = client.channels.find(ch => ch.id === `${cf.logc}`);
                            channel.send({
                                embed: {
                                    title: "参加を許可します",
                                    description: `名前: ${member.user.tag}
                                \nID: ${member.user.id}
                                \nrole: ${rolenames[2]}`,
                                    color: 7328768,
                                    timestamp: new Date(),
                                    footer: {
                                        text: `${client.user.username} Bot`
                                    },
                                    author: {
                                        name: "アクセス権の確認",
                                    }
                                }
                            });
                            member.send({
                                embed: {
                                    title: `Welcome to ${member.guild.name}! ${rolenames[2]}では次のことが許可されています！`,
                                    "fields": [
                                        {
                                            "name": "絵文字、パブリックエリアの操作、名前の変更ができます",
                                            "value": "一部制限がありますがサーバーを操作できます"
                                        },
                                        {
                                            "name": `${rolenames[3]}の追加、有効化、削除等が行なえます`,
                                            "value": `結入Botのほぼすべてのコマンドを${rolenames[1]}同様使うことができます`
                                        },
                                        {
                                            "name": "パブリックエリアのチャンネルを読んだり送信することができます",
                                            "value": `${rolenames[2]}のため、パブリックエリアは永続ですがメインエリアには入れません`
                                        },
                                        {
                                            "name": "抜けたらBANされます",
                                            "value": `現在${rolenames[2]}は抜けたらBANされます`
                                        }
                                    ],
                                    color: 7328768,
                                    footer: {
                                        text: `${client.user.username} Bot`
                                    }
                                }
                            });
                        }
                    })
                }
                console.log(`${member.user.tag}のアクセス権の確認${date}`);
                return;
            }

            //ここでワンタイム検証
            else if (rowso.length > 0) {
                rowso.forEach((rowo) => {
                    const otrole = member.guild.roles.find(role => role.id === roleids[3]);
                    member.addRole(otrole);
                    var channel = client.channels.find(ch => ch.id === `${cf.logc}`);
                    channel.send({
                        embed: {
                            title: "参加を許可します",
                            description: `名前: ${member.user.tag}
                            \nID: ${member.user.id}
                            \nrole: ${rolenames[3]}`,
                            color: 9605778,
                            timestamp: new Date(),
                            footer: {
                                text: `${client.user.username} Bot`
                            },
                            author: {
                                name: "アクセス権の確認",
                            }
                        }
                    });
                    member.send({
                        embed: {
                            title: `Welcome to ${member.guild.name}! ${rolenames[3]}では次のことが許可されています！`,
                            "fields": [
                                {
                                    "name": "機能が制限されます",
                                    "value": `${rolenames[3]}では一部機能が制限されます`
                                },
                                {
                                    "name": "パブリックエリアのチャンネルを読んだり送信することができます",
                                    "value": "時間制のため、時間が切れると自動的にチャンネルが表示されなくなります"
                                },
                                {
                                    "name": "抜けてもBANはされません",
                                    "value": `現在${rolenames[3]}は抜けてもBANはされません`
                                }
                            ],
                            color: 7328768,
                            footer: {
                                text: `${client.user.username} Bot`
                            }
                        }
                    });
                    var channel = client.channels.find(ch => ch.id === `${cf.otc}`);

                    let timeoutms = row.time / 3600000;

                    channel.send(`${member} あなたは現在有効化されています、${timeoutms}時間後自動的に無効化されます。`)
                        .then(msg => {
                            msg.delete(row.time);
                        })
                        .catch(console.error);
                    let timeout = new Promise((resolve, reject) => {
                        setTimeout(function () {
                            member.send(`有効化の時間が過ぎたため無効化されました`)
                                .then(function () {
                                    connection.query(`UPDATE ${cf.ottable} SET time= '0', tof= '0' WHERE uuid= '${member.user.id}'`, function (errr, ress) {
                                        if (errr) throw errr;
                                        member.removeRole(otrole);
                                    })
                                        .then(() => {
                                            console.log(`${member.user.tag}は${rolenames[3]}の時間が切れたため無効化${date}`)
                                        })
                                        .catch(console.error);
                                })
                                .catch(console.error);
                        }, row.time);
                    })
                    timeout.catch(() => {
                        console.error('エラー発生！')
                    })
                    console.log(`${member.user.tag}のアクセス権の確認${date}`);
                    return;
                })
            }

            else if (member.user.bot) {
                const botrole = member.guild.roles.find(role => role.id === cf.botrid);
                member.addRole(botrole);
                const channel = client.channels.find(ch => ch.id === `${cf.logc}`);
                channel.send({
                    embed: {
                        title: "Botです",
                        description: `名前: ${member.user.tag}\nID: ${member.user.id}`,
                        color: 4886754,
                        timestamp: new Date(),
                        footer: {
                            text: `${client.user.username} Bot`
                        },
                        author: {
                            name: "アクセス完了",
                        }
                    }
                });
                console.log(`${member.user.tag}はBotです${date}`);
                return;
            }
            else {

                //DB追加がない場合
                member.send(`あなたはアクセス権がありません、もしアクセス権があり入れない場合はサーバー管理者にお問い合わせください`);
                member.ban(`アクセス権がありません`)
                    .then(() => {
                        console.log(`${member.user.tag}はアクセス権なし${date}`)
                    })
                    .catch(console.error);
                const channel = client.channels.find(ch => ch.id === `${cf.logc}`);
                channel.send({
                    embed: {
                        title: "BANされました",
                        description: `名前: ${member.user.tag}\nID: ${member.user.id}`,
                        color: 16711680,
                        timestamp: new Date(),
                        footer: {
                            text: `${client.user.username} Bot`
                        },
                        author: {
                            name: "アクセス権がありません",
                        }
                    }
                });
            }
        })
    })
});

client.on("guildMemberRemove", member => {
    if (!member.user.bot) {
        connection.query(`SELECT role FROM ${cf.dbtable} WHERE uuid = ${member.user.id}`, function (err, rows) {
            if (err) throw err;
            if (rows.length > 0) {
                rows.forEach((row) => {
                    connection.query(`DELETE FROM ${cf.dbtable} WHERE uuid = ${member.user.id}`, function (errr, ress) {
                        if (errr) throw errr;
                    })
                    member.ban(`サーバーを抜けたため`)
                        .then(() => {
                            console.log(`${member.user.tag}はサーバーを抜けました${rolenames[row.role]}${date}`)
                        })
                        .catch(console.error);
                    const channel = client.channels.find(ch => ch.id === `${cf.logc}`);
                    channel.send({
                        embed: {
                            title: "BANされました",
                            description: `名前: ${member.user.tag}\nID: ${member.user.id}`,
                            color: 16711680,
                            timestamp: new Date(),
                            footer: {
                                text: `${client.user.username} Bot`
                            },
                            author: {
                                name: "サーバーを抜けました",
                            }
                        }
                    });
                });
            }
            else {
                connection.query(`DELETE FROM ${cf.ottable} WHERE uuid = ${member.user.id}`, function (errr, ress) {
                    if (errr) throw errr;
                })
                const channel = client.channels.find(ch => ch.id === `${cf.logc}`);
                channel.send({
                    embed: {
                        title: "抜けました\n再度招待したい場合もう一度\nDBに登録して招待してください。",
                        description: `名前: ${member.user.tag}\nID: ${member.user.id}`,
                        color: 16711680,
                        timestamp: new Date(),
                        footer: {
                            text: `${client.user.username} Bot`
                        },
                        author: {
                            name: "サーバーを抜けました",
                        }
                    }
                });
            }
        });
    }
    else {
        const channel = client.channels.find(ch => ch.id === `${cf.logc}`);
        channel.send({
            embed: {
                title: "Botです",
                description: `名前: ${member.user.tag}\nID: ${member.user.id}`,
                color: 16711680,
                timestamp: new Date(),
                footer: {
                    text: `${client.user.username} Bot`
                },
                author: {
                    name: "サーバーから削除しました",
                }
            }
        });
        console.log(`${member.user.tag}はBotです${date}`);
    };
});

//OT以外のコマンド
client.on('message', message => {
    if (message.author.bot) return;

    if (!message.guild) return;

    let msg = message.content.toLowerCase();
    let args = message.content.slice(cf.fpf.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    let prec = message.content.slice(0, cf.fpf.length).trim().split(/ +/g);
    let preco = prec.shift().toLowerCase();

    let precheck = cf.fpf == preco;

    if (!precheck) return;

    let who = `${message.author.tag}が`;

    const surole = message.guild.roles.find(role => role.id === roleids[0]);

    const otasu = message.member.roles.has(surole.id);

    const rtrole = message.guild.roles.find(role => role.id === roleids[1]);

    const otart = message.member.roles.has(rtrole.id);

    const otmrole = message.guild.roles.find(role => role.id === roleids[2]);

    const otaotm = message.member.roles.has(otmrole.id);

    if (otasu || otart || otaotm) {

        if (cmd === `onetime-add`) {
            let [name, id, time] = args;
            //処理内で入力するのめんどい
            message.delete();
            //数字じゃないとエラーのため
            if (isFinite(id)) {
                //数字じゃないとエラーのため&必ず時間指定(24時間以内)
                if (isFinite(time) && time > 0 && time < 25) {
                    connection.query(`SELECT * FROM ${cf.dbtable} WHERE uuid = ${id}`, function (err, rows) {
                        if (err) throw err;
                        if (!rows.length > 0) {
                            connection.query(`SELECT * FROM ${cf.ottable} WHERE uuid = ${id}`, function (erro, rowso) {
                                if (erro) throw erro;
                                if (!rowso.length > 0) {
                                    connection.query(`SELECT * FROM ${cf.ottable} WHERE name = '${name}'`, function (errt, rowst) {
                                        if (errt) throw errt;
                                        if (!rowst.length > 0) {
                                            let timems = time * 3600000;
                                            connection.query(`INSERT INTO ${cf.ottable}(name, uuid, time) Values('${name}', ${id}, ${timems})`, function (errr, ress) {
                                                if (errr) throw errr;
                                                message.channel.send(`name: ${name} \nID: ${id} \nTime: ${time}時間をデータベースに追加しました`)
                                                    .then(message => console.log(`${who}${cmd}の実行${date}`))
                                                    .catch(console.error);
                                            })
                                        }
                                        else {
                                            rowst.forEach((rowt) => {
                                                message.channel.send(`既に${rolenames[3]}データベース上に\n名前: ${rowt.name}で登録されています`)
                                                    .then(message => console.log(`${who}${cmd}の実行失敗${date}`))
                                                    .catch(console.error);
                                            })
                                        }
                                    })
                                }
                                else {
                                    rowso.forEach((rowo) => {
                                        message.channel.send(`既に${rolenames[3]}データベース上に\n名前: ${rowo.name}で登録されています`)
                                            .then(message => console.log(`${who}${cmd}の実行失敗${date}`))
                                            .catch(console.error);
                                    })
                                }
                            })
                        }
                        else {
                            rows.forEach((row) => {
                                message.channel.send(`既にメインデータベース上に\n名前: ${row.name}\nrole: ${rolenames[row.role]}で登録されています`)
                                    .then(message => console.log(`${who}${cmd}の実行失敗${date}`))
                                    .catch(console.error);
                            })
                        }
                    })
                }
                else {
                    message.channel.send(`Timeは数字でかつ0 < Time < 25時間でなければいけません`)
                        .then(message => console.log(`${who}${cmd}コマンドの実行失敗${date}`))
                        .catch(console.error);
                }
            }
            else {
                message.channel.send(`IDは数字でなければいけません`)
                    .then(message => console.log(`${who}${cmd}コマンドの実行失敗${date}`))
                    .catch(console.error);
            }
        }

        if (cmd === `onetime-true`) {
            let [id, time] = args;
            //処理内で入力するのめんどい
            message.delete();
            //数字じゃないとエラーのため
            if (isFinite(id)) {
                //数字じゃないとエラーのため&必ず時間指定(24時間以内)
                if (isFinite(time) && time > 0 && time < 25) {
                    connection.query(`SELECT * FROM ${cf.ottable} WHERE uuid = ${id}`, function (erro, rowso) {
                        if (erro) throw erro;
                        if (rowso.length > 0) {
                            let timems = time * 3600000;
                            connection.query(`UPDATE ${cf.ottable} SET time= '${timems}', tof= '1' WHERE uuid= '${id}'`, function (errr, ress) {
                                if (errr) throw errr;
                                let member = message.guild.members.find("id", `${id}`);
                                const otroles = message.guild.roles.find(role => role.id === roleids[3]);
                                member.addRole(otroles);
                                let channel = client.channels.find(ch => ch.id === `${cf.otc}`);
                                channel.send(`${member} あなたは現在有効化されています、${time}時間後自動的に無効化されます。`)
                                    .then(msg => {
                                        msg.delete(time);
                                    })
                                    .catch(console.error);
                                let timeout = new Promise((resolve, reject) => {
                                    setTimeout(function () {
                                        member.send(`有効化の時間が過ぎたため無効化されました`)
                                            .then(function () {
                                                connection.query(`UPDATE ${cf.ottable} SET time= '0', tof= '0' WHERE uuid= '${member.user.id}'`, function (errro, resso) {
                                                    if (errro) throw errro;
                                                    member.removeRole(otroles);
                                                })
                                                    .then(() => {
                                                        console.log(`${member.user.tag}は${rolenames[3]}の時間が切れたため無効化${date}`)
                                                    })
                                                    .catch(console.error);
                                            })
                                            .catch(console.error);
                                    }, time);
                                })
                                timeout.catch(() => {
                                    console.error('エラー発生！')
                                })
                                message.channel.send(`ID: ${id} \nTime: ${time}でデータベースに追加しました`)
                                    .then(message => console.log(`${who}${cmd}の実行${date}`))
                                    .catch(console.error);
                            })
                        }
                        else {
                            message.channel.send(`${rolenames[3]}データベース上に\nID: ${id}\n名前: ${name}で登録されていません`)
                                .then(message => console.log(`${who}${cmd}の実行失敗${date}`))
                                .catch(console.error);
                        }
                    })
                }
                else {
                    message.channel.send(`Timeは数字でかつ0 < Time < 25時間でなければいけません`)
                        .then(message => console.log(`${who}${cmd}コマンドの実行失敗${date}`))
                        .catch(console.error);
                }
            }
            else {
                message.channel.send(`IDは数字でなければいけません`)
                    .then(message => console.log(`${who}${cmd}コマンドの実行失敗${date}`))
                    .catch(console.error);
            }
        }

        if (cmd === `onetime-del`) {
            let id = args.join(` `);
            if (isFinite(id)) {
                connection.query(`SELECT * FROM ${cf.ottable} WHERE uuid = ${id}`, function (err, rows) {
                    if (err) throw err;
                    if (rows.length > 0) {
                        rows.forEach((row) => {
                            connection.query(`DELETE FROM ${cf.ottable} WHERE uuid = ${id}`, function (errr, ress) {
                                if (errr) throw errr;
                                message.delete();
                                message.channel.send(`${row.name}をデータベースから削除しました`)
                                    .then(message => console.log(`${who}${cmd}コマンドの実行${date}`))
                                    .catch(console.error);
                            })
                        })
                    }
                    else {
                        message.delete();
                        message.channel.send(`そのIDはDB上に存在しません`)
                            .then(message => console.log(`${who}${cmd}コマンドの実行失敗${date}`))
                            .catch(console.error);
                    }
                })
            }
            else {
                message.delete();
                message.channel.send(`IDは数字でなければいけません`)
                    .then(message => console.log(`${who}${cmd}コマンドの実行失敗${date}`))
                    .catch(console.error);
            }
        }

        if (cmd === `onetime-find`) {
            let id = args.join(` `);
            if (isFinite(id)) {
                connection.query(`SELECT * FROM ${cf.ottable} WHERE uuid = ${id}`, function (err, rows) {
                    if (err) throw err;
                    if (rows.length > 0) {
                        rows.forEach((row) => {
                            message.delete();
                            message.channel.send(`DB内に${row.name}という名前で登録されています`)
                                .then(message => console.log(`${who}${cmd}コマンドの実行${date}`))
                                .catch(console.error);
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

        if (cmd === `onetime-list`) {
            message.delete();
            connection.query(`SELECT * FROM ${cf.ottable}`, function (err, rows) {
                if (err) throw err;
                message.member.send(`
                ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
                \n┃登録名前 ->                         UserID                       -> time -> true or false┃
                `)
                rows.forEach((row) => {
                    message.member.send(`
                    ┃${row.name} -> ${row.uuid} -> ${row.time * 3600000} -> ${row.tof}┃
                    `)
                })
                message.member.send(`
                ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                `)
                message.reply(`DMをご確認ください`);
                console.log(`${who}${cmd}コマンドの実行${date}`);
            })
        }

        if (cmd === `onetime-cname`) {
            let [id, name] = args;
            if (isFinite(id)) {
                connection.query(`SELECT * FROM ${cf.ottable} WHERE uuid = ${id}`, function (err, rows) {
                    if (err) throw err;
                    if (rows.length > 0) {
                        rows.forEach((row) => {
                            let dfname = row.name;
                            connection.query(`UPDATE ${cf.dbtable} SET name= '${name}' WHERE uuid= ${id}`, function (errr, ress) {
                                if (errr) throw errr;
                                message.delete();
                                message.channel.send(`ID: ${id}の名前を${dfname}から${name}に変更しました`)
                                    .then(message => console.log(`${who}${cmd}コマンドの実行${date}`))
                                    .catch(console.error);
                            })
                        });
                    }
                    else {
                        message.delete();
                        message.channel.send(`そのIDは登録されていません`)
                            .then(message => console.log(`${who}${cmd}コマンドの実行失敗${date}`))
                            .catch(console.error);
                    }
                })
            }
            else {
                message.delete();
                message.channel.send(`IDは数字でなければいけません`)
                    .then(message => console.log(`${who}${cmd}コマンドの実行失敗${date}`))
                    .catch(console.error);
            }
        }

    }
    else {
        console.log(`${message.author.tag}は${rolenames[0]},${rolenames[1]},${rolenames[2]}ではありません`)
        return;
    }
})

//SUコマンド
client.on('message', message => {

    if (message.author.bot) return;

    if (!message.guild) return;

    let msg = message.content.toLowerCase();
    let args = message.content.slice(cf.spf.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    let prec = message.content.slice(0, cf.spf.length).trim().split(/ +/g);
    let preco = prec.shift().toLowerCase();

    let precheck = cf.spf == preco;

    if (!precheck) return;

    let who = `${message.author.tag}が`;

    const alors = message.guild.roles.find(role => role.id === roleids[0]);

    const dbsu = message.member.roles.has(alors.id);

    if (!dbsu) {
        console.log(`${message.author.tag}は${rolenames[0]}ではありません`)
        return;
    }

    if (cmd === `db-find`) {
        let id = args.join(` `);
        if (isFinite(id)) {
            connection.query(`SELECT * FROM ${cf.dbtable} WHERE uuid = ${id}`, function (err, rows) {
                if (err) throw err;
                if (rows.length > 0) {
                    rows.forEach((row) => {
                        message.delete();
                        message.channel.send(`DB内に${row.name}という名前で登録されています`)
                            .then(message => console.log(`${who}${cmd}コマンドの実行${date}`))
                            .catch(console.error);
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

    if (cmd === `db-list`) {
        message.delete();
        connection.query(`SELECT * FROM ${cf.dbtable}`, function (err, rows) {
            if (err) throw err;
            message.member.send(`
            ┏━━━━━━━━━━━━━━━━━━━━━━━┓
            \n┃登録名前 ->                         UserID                       -> role┃
            `)
            rows.forEach((row) => {
                message.member.send(`
                ┃${row.name} -> ${row.uuid} -> ${rolenames[row.role]}┃
                `)
            })
            message.member.send(`
            ┗━━━━━━━━━━━━━━━━━━━━━━━┛
            `)
            message.reply(`DMをご確認ください`);
            console.log(`${who}${cmd}コマンドの実行${date}`);
        })
    }

    if (cmd === `db-cname`) {
        let [id, name] = args;
        if (isFinite(id)) {
            connection.query(`SELECT * FROM ${cf.dbtable} WHERE uuid = ${id}`, function (err, rows) {
                if (err) throw err;
                if (rows.length > 0) {
                    rows.forEach((row) => {
                        let dfname = row.name;
                        connection.query(`UPDATE ${cf.dbtable} SET name= '${name}' WHERE uuid= ${id}`, function (errr, ress) {
                            if (errr) throw errr;
                            message.delete();
                            message.channel.send(`ID: ${id}の名前を${dfname}から${name}に変更しました`)
                                .then(message => console.log(`${who}${cmd}コマンドの実行${date}`))
                                .catch(console.error);
                        })
                    });
                }
                else {
                    message.delete();
                    message.channel.send(`そのIDは登録されていません`)
                        .then(message => console.log(`${who}${cmd}コマンドの実行失敗${date}`))
                        .catch(console.error);
                }
            })
        }
        else {
            message.delete();
            message.channel.send(`IDは数字でなければいけません`)
                .then(message => console.log(`${who}${cmd}コマンドの実行失敗${date}`))
                .catch(console.error);
        }
    }

    if (cmd === `db-crole`) {
        let [id, afrole] = args;
        message.delete();
        if (isFinite(id)) {
            if (afrole > 2) {
                connection.query(`SELECT * FROM ${cf.dbtable} WHERE uuid = ${id}`, function (err, rows) {
                    if (err) throw err;
                    if (rows.length > 0) {
                        rows.forEach((row) => {
                            let dfrole = row.role;
                            if (dfrole != 2) {
                                connection.query(`UPDATE ${cf.dbtable} SET role= '${afrole}' WHERE uuid= ${id}`, function (errr, ress) {
                                    if (errr) throw errr;
                                    let changerole = new Promise((resolve, reject) => {

                                        const dlrole = message.guild.roles.find(role => role.id === roleids[dfrole]);

                                        const member = message.guild.members.find(user => user.id === id);

                                        member.removeRole(dlrole);

                                        const adrole = message.guild.roles.find(role => role.id === roleids[afrole]);

                                        member.addRole(adrole);
                                    })
                                    changerole.catch(() => {
                                        console.error('エラー発生！')
                                    })
                                    message.channel.send(`ID: ${id}のRoleを${rolenames[dfrole]}から${rolenames[afrole]}に変更しました`)
                                        .then(message => console.log(`${who}${cmd}コマンドの実行${date}`))
                                        .catch(console.error);
                                })
                            }
                            else {
                                message.channel.send(`${rolenames[dfrole]}ユーザーは変更できません`)
                                    .then(message => console.log(`${who}${cmd}コマンドの実行失敗${date}`))
                                    .catch(console.error);
                            }
                        });
                    }
                    else {
                        message.channel.send(`そのIDは登録されていません`)
                            .then(message => console.log(`${who}${cmd}コマンドの実行失敗${date}`))
                            .catch(console.error);
                    }
                })
            }
            else {
                message.channel.send(`${rolenames[afrole]}には変更できません`)
                    .then(message => console.log(`${who}${cmd}コマンドの実行失敗${date}`))
                    .catch(console.error);
            }
        }
        else {
            message.channel.send(`IDは数字でなければいけません`)
                .then(message => console.log(`${who}${cmd}コマンドの実行失敗${date}`))
                .catch(console.error);
        }
    }

    if (cmd === `db-admem`) {
        let [name, id, role] = args;
        //処理内で入力するのめんどい
        message.delete();
        //もしかしたら入力しないで登録できてしまうための対策
        if (typeof name && role && id !== 'undefined') {
            //数字じゃないとエラーのため
            if (isFinite(id && role)) {
                connection.query(`SELECT * FROM ${cf.dbtable} WHERE uuid = ${id}`, function (err, rows) {
                    if (err) throw err;
                    if (!rows.length > 0) {
                        connection.query(`INSERT INTO ${cf.dbtable}(name, uuid, role) Values('${name}', ${id}, ${role})`, function (errr, ress) {
                            if (errr) throw errr;
                            let rolecode =
                                message.channel.send(`名前: ${name}\nID: ${id}\nrole: ${rolenames[role]}\nをデータベースに追加しました`)
                                    .then(message => console.log(`${who}${cmd}の実行${date}`))
                                    .catch(console.error);
                        })
                    }
                    else {
                        rows.forEach((row) => {
                            let dbrole = row.role
                            message.channel.send(`既にデータベース上に\n名前: ${row.name} role: ${rolenames[dbrole]}\nで登録されています`)
                                .then(message => console.log(`${who}${cmd}の実行失敗${date}`))
                                .catch(console.error);
                        })
                    }
                })
            }
            else {
                message.channel.send(`IDとroleは数字でなければいけません`)
                    .then(message => console.log(`${who}${cmd}コマンドの実行失敗${date}`))
                    .catch(console.error);
            }
        }
        else {
            message.channel.send(`すべて入力されていないか入力箇所が足りません`)
                .then(message => console.log(`${who}${cmd}コマンドの実行失敗${date}`))
                .catch(console.error);
        }
    }

    if (cmd === `db-delmem`) {
        let id = args.join(` `);
        if (isFinite(id)) {
            connection.query(`SELECT * FROM ${cf.dbtable} WHERE uuid = ${id}`, function (err, rows) {
                if (err) throw err;
                if (rows.length > 0) {
                    rows.forEach((row) => {
                        connection.query(`DELETE FROM ${cf.dbtable} WHERE uuid = ${id}`, function (errr, ress) {
                            if (errr) throw errr;
                            message.delete();
                            message.channel.send(`${row.name}をデータベースから削除しました`)
                                .then(message => console.log(`${who}${cmd}コマンドの実行${date}`))
                                .catch(console.error);
                        })
                    })
                }
                else {
                    message.delete();
                    message.channel.send(`そのIDはDB上に存在しません`)
                        .then(message => console.log(`${who}${cmd}コマンドの実行失敗${date}`))
                        .catch(console.error);
                }
            })
        }
        else {
            message.delete();
            message.channel.send(`IDは数字でなければいけません`)
                .then(message => console.log(`${who}${cmd}コマンドの実行失敗${date}`))
                .catch(console.error);
        }
    }


});

//Botオーナーコマンド
client.on('message', message => {

    if (message.author.bot) return;

    if (message.guild) return;

    let msg = message.content.toLowerCase();
    let args = message.content.slice(cf.dpf.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    let prec = message.content.slice(0, cf.dpf.length).trim().split(/ +/g);
    let preco = prec.shift().toLowerCase();

    let precheck = cf.dpf == preco;

    if (!precheck) return;

    let who = `${message.author.tag}が`;

    const botown = message.author.id == cf.bwid;

    if (!botown) {
        console.log(`${who}デバッグ用コマンドを実行しようとしました`)
        return;
    }

    //非常事態のために
    if (cmd === `restart`) {

        message.channel.send('再起動をしています...')
            .then(m => {
                console.log(`Debug>再起動の実行${date}`)
                client.destroy()
                    .then(() => {
                        client.login(cf.token);
                    });
            });
    }

    if (cmd === `logout`) {

        message.channel.send('終了します...')
            .then(m => {
                console.log(`Debug>終了の実行${date}`)
                client.destroy()
            });
    }

});

client.login(cf.token);