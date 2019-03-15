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
    v1.5.12
    Twitter: @Fairy_Phy
*/
const Discord = require('discord.js');

const client = new Discord.Client();

const cf = require("./cf.json");

const date = `\n${String(new Date())}`;

const botver = `v1.5.12`;

//後に必要になる
const rolenames = ['Super', 'Root', 'One-time'];

const roleidl = [cf.suid, cf.exid, cf.otid];

const connection = require('./dbconf');

client.on('ready', () => {
    let start_text = `${client.user.username}Bot起動${date}`;
    client.user.setActivity(`${cf.fpf}help | 稼働中！`, { type: "WATCHING" })
    client.user.setStatus("online");
    console.log(start_text)
});

client.on('message', message => {

    if (message.author.bot) return;

    if (!message.guild) return;

    let msg = message.content.toLowerCase();
    let args = message.content.slice(cf.fpf.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    let who = `${message.author.tag}が`;

    if (cmd === `ping`) {
        message.delete();
        message.channel.send('しばらくお待ち下さい...')
            .then(function (m) {
                m.edit(`このサーバーの現在のpingは${m.createdTimestamp - message.createdTimestamp}msです！`)
                    .then(message => console.log(`${who}pingコマンドの実行${date}`))
                    .catch(console.error);
            })
    }

    if (cmd === `ver`) {
        message.delete();
        message.channel.send(`Botname: ${client.user.username}\nVersion: ${botver}`)
            .then(message => console.log(`${who}コマンドverの実行${date}`))
            .catch(console.error);
    }

    if (cmd === `help`) {
        message.delete();
        message.reply(`DMをご確認ください`);
        message.member.send(`
        一般コマンド\(プレフィックスは ${cf.fpf} です\)
        \n\`\`\`
        \n${cf.fpf}ping => pingを測ります
        \n${cf.fpf}ver => Botのバージョンを表示します
        \n${cf.fpf}help => ヘルプを表示します
        \n${cf.fpf}onetime-add [ID] => データベースにワンタイムとしてIDを登録します(Root,Super専用)
        \n\`\`\`
        `)
            .then(message => console.log(`${who}コマンドhelpの実行${date}`))
            .catch(console.error);
        const alor = message.guild.roles.find(role => role.id === cf.suid);
        const su = message.member.roles.has(alor.id);
        if (su) {
            message.member.send(`
            SUコマンド\(プレフィックスは ${cf.spf} です\)
            \n\`\`\`
            \n${cf.spf}db-find [Userid] => データベース上にIDが登録されているか確認します
            \n${cf.spf}db-list => データベースに登録されている名前とIDをリストにして表示します
            \n${cf.spf}db-cname [ID] [変更したい名前] => 登録されているIDの名前を変更できます
            \n${cf.spf}db-crole [ID] [変更したいrole(Super=0 Root=1)] => 登録されているIDのroleを変更できます
            \n${cf.spf}db-admem [名前] [ID] [role(Super=0 Root=1 ※One-Time=2 互換性を保つため)] => データベースにそのIDを追加します
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
                \n${cf.dpf}botstart =>Botの状態を稼働中にする
                \n${cf.dpf}botmem => Botの状態をメンテナンス中にする
                \n\`\`\`
                `)
            }
        }
        else {
            return;
        }
    }

    if (cmd === `emoji`) {
        let name = args.join(` `);
        var Attachment = (message.attachments).array();
        message.delete();
        Attachment.forEach(function (attachment) {
            console.log(attachment.url);
            message.guild.createEmoji(`${attachment.url}`, `${name}`)
                .then(emoji => {
                    console.log(`${emoji.name}の追加`);
                    message.channel.send(`${emoji.name}を追加しました！`);
                })
                .catch(console.error);
        })
    }

    if (cmd === `onetime-add`) {
        const rtrole = message.guild.roles.find(role => role.id === cf.exid);

        const surole = message.guild.roles.find(role => role.id === cf.suid);

        const otasu = message.member.roles.has(surole.id);

        const otart = message.member.roles.has(rtrole.id);
        if (otasu || otart) {
        let id = args.join(` `);
        //処理内で入力するのめんどい
        message.delete();
        //数字じゃないとエラーのため
        if (isFinite(id)) {
            connection.query(`SELECT * FROM ${cf.dbtable} WHERE uuid = ${id}`, function (err, rows) {
                if (err) throw err;
                if (!rows.length > 0) {
                    connection.query(`INSERT INTO ${cf.dbtable}(name, uuid, role) Values('One-time', ${id}, '2')`, function (errr, ress) {
                        if (errr) throw errr;

                        message.channel.send(`ID: ${id} をデータベースに追加しました`)
                            .then(message => console.log(`${who}onetime-addの実行${date}`))
                            .catch(console.error);
                    })
                }
                else {
                    rows.forEach((row) => {
                        message.channel.send(`既にデータベース上に\n名前: ${row.name}\nrole: ${rolenames[row.role]}で登録されています`)
                            .then(message => console.log(`${who}onetime-addの実行失敗${date}`))
                            .catch(console.error);
                    })
                }
            })
        }
        else {
            message.channel.send(`IDは数字でなければいけません`)
                .then(message => console.log(`${who}onetime-addコマンドの実行失敗${date}`))
                .catch(console.error);
        }
    }
    else {
        console.log(`${message.author.tag}はSU,RTではありません`)
        return;
    }
    }

});

client.on('guildMemberAdd', member => {
    connection.query(`SELECT uuid, role FROM ${cf.dbtable} WHERE uuid = '${member.user.id}'`, function (err, rows) {
        if (err) throw err;
        if (rows.length > 0) {
            if (!member.user.bot) {
                rows.forEach((row) => {
                    if (row.role == 0) {
                        const surole = member.guild.roles.find(role => role.id === cf.suid);
                        member.addRole(surole);
                        const channel = client.channels.find(ch => ch.id === `${cf.logc}`);
                        channel.send({
                            embed: {
                                title: "参加を許可します",
                                description: `名前: ${member.user.tag}
                                \nID: ${member.user.id}
                                \nrole: super`,
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
                    }
                    else if (row.role == 1) {
                        const exrole = member.guild.roles.find(role => role.id === cf.exid);
                        member.addRole(exrole);
                        let channel = client.channels.find(ch => ch.id === `${cf.logc}`);
                        channel.send({
                            embed: {
                                title: "参加を許可します",
                                description: `名前: ${member.user.tag}
                                \nID: ${member.user.id}
                                \nrole: root`,
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
                    }
                    else if (row.role == 2) {
                        const otrole = member.guild.roles.find(role => role.id === cf.otid);
                        member.addRole(otrole);
                        var channel = client.channels.find(ch => ch.id === `${cf.logc}`);
                        channel.send({
                            embed: {
                                title: "参加を許可します",
                                description: `名前: ${member.user.tag}
                                \nID: ${member.user.id}
                                \nrole: One Time`,
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
                        var channel = client.channels.find(ch => ch.id === `${cf.otc}`);
                        channel.send(`${member} あなたは現在ワンタイムです、${cf.onetimeout}ミリ秒後自動的にキックされます。`)
                            .then(msg => {
                                msg.delete(cf.onetimeout);
                            })
                            .catch(console.error);
                        let timeout = new Promise((resolve, reject) => {
                            setTimeout(function () {
                                member.kick(`時間切れ`)
                                    .then(() => {
                                        console.log(`${member.user.tag}はOTの時間が切れたためキック${date}`)
                                    })
                                    .catch(console.error);
                            }, cf.onetimeout);
                        })
                        timeout.catch(() => {
                            console.error('エラー発生！')
                        })
                        return;

                    }
                })
            }
            console.log(`${member.user.tag}のアクセス権の確認${date}`);
            return;
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
});

client.on("guildMemberRemove", member => {
    if (!member.user.bot) {
        connection.query(`SELECT role FROM ${cf.dbtable} WHERE uuid = ${member.user.id}`, function (err, rows) {
            if (err) throw err;
            rows.forEach((row) => {
                connection.query(`DELETE FROM ${cf.dbtable} WHERE uuid = ${member.user.id}`, function (errr, ress) {
                    if (errr) throw errr;
                })
                if (row.role !== 2) {
                    member.ban(`サーバーを抜けたため`)
                        .then(() => {
                            console.log(`${member.user.tag}はサーバーを抜けました${row.role}${date}`)
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
                }
                else {
                    const channel = client.channels.find(ch => ch.id === `${cf.logc}`);
                    channel.send({
                        embed: {
                            title: "滞在時間が過ぎたか抜けました\n再度招待したい場合もう一度\nDBに登録して招待してください。",
                            description: `名前: ${member.user.tag}\nID: ${member.user.id}`,
                            color: 16711680,
                            timestamp: new Date(),
                            footer: {
                                text: `${client.user.username} Bot`
                            },
                            author: {
                                name: "ワンタイムアラート",
                            }
                        }
                    });
                }
            });
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

//SUコマンド
client.on('message', message => {

    if (message.author.bot) return;

    if (!message.guild) return;

    let msg = message.content.toLowerCase();
    let args = message.content.slice(cf.spf.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    let who = `${message.author.tag}が`;

    const alors = message.guild.roles.find(role => role.id === cf.suid);

    const dbsu = message.member.roles.has(alors.id);

    if (!dbsu) {
        console.log(`${message.author.tag}はSUではありません`)
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
                            .then(message => console.log(`${who}db-findコマンドの実行${date}`))
                            .catch(console.error);
                    });
                }
                else {
                    message.delete();
                    message.channel.send(`そのIDは登録されていません`)
                        .then(message => console.log(`${who}db-findコマンドの実行失敗${date}`))
                        .catch(console.error);
                }
            });
        }
        else {
            message.delete();
            message.channel.send(`IDは数字でなければいけません`)
                .then(message => console.log(`${who}db-findコマンドの実行失敗${date}`))
                .catch(console.error);
        }
    }

    if (cmd === `db-list`) {
        message.delete();
        connection.query(`SELECT * FROM ${cf.dbtable}`, function (err, rows) {
            if (err) throw err;
            message.member.send(`
            ┏━━━━━━━━━━━━━━━━━━━┓
            \n┃登録名前 -> UserID -> role┃
            `)
            rows.forEach((row) => {
                message.member.send(`
                ┃${row.name} -> ${row.uuid} -> ${rolenames[row.role]}┃
                `)
            })
            message.member.send(`
            ┗━━━━━━━━━━━━━━━━━━━┛
            `)
            message.reply(`DMをご確認ください`);
            console.log(`${who}db-listコマンドの実行${date}`);
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
                                .then(message => console.log(`${who}db-cnameコマンドの実行${date}`))
                                .catch(console.error);
                        })
                    });
                }
                else {
                    message.delete();
                    message.channel.send(`そのIDは登録されていません`)
                        .then(message => console.log(`${who}db-cnameコマンドの実行失敗${date}`))
                        .catch(console.error);
                }
            })
        }
        else {
            message.delete();
            message.channel.send(`IDは数字でなければいけません`)
                .then(message => console.log(`${who}db-cnameコマンドの実行失敗${date}`))
                .catch(console.error);
        }
    }

    if (cmd === `db-crole`) {
        let [id, afrole] = args;
        message.delete();
        if (isFinite(id)) {
            if (afrole != 2) {
                connection.query(`SELECT * FROM ${cf.dbtable} WHERE uuid = ${id}`, function (err, rows) {
                    if (err) throw err;
                    if (rows.length > 0) {
                        rows.forEach((row) => {
                            let dfrole = row.role;
                            if (dfrole != 2) {
                                connection.query(`UPDATE ${cf.dbtable} SET role= '${afrole}' WHERE uuid= ${id}`, function (errr, ress) {
                                    if (errr) throw errr;
                                    let changerole = new Promise((resolve, reject) => {
                                        const dlrole = message.guild.roles.find(role => role.id === roleidl[dfrole]);
                                        const member = message.guild.members.find(user => user.id === id);
                                        member.removeRole(dlrole);
                                        const adrole = message.guild.roles.find(role => role.id === roleidl[afrole]);
                                        member.addRole(adrole);
                                    })
                                    changerole.catch(() => {
                                        console.error('エラー発生！')
                                    })
                                    message.channel.send(`ID: ${id}のRoleを${rolenames[dfrole]}から${rolenames[afrole]}に変更しました`)
                                        .then(message => console.log(`${who}db-croleコマンドの実行${date}`))
                                        .catch(console.error);
                                })
                            }
                            else {
                                message.channel.send(`${rolenames[dfrole]}ユーザーは変更できません`)
                                    .then(message => console.log(`${who}db-croleコマンドの実行失敗${date}`))
                                    .catch(console.error);
                            }
                        });
                    }
                    else {
                        message.channel.send(`そのIDは登録されていません`)
                            .then(message => console.log(`${who}db-croleコマンドの実行失敗${date}`))
                            .catch(console.error);
                    }
                })
            }
            else {
                message.channel.send(`${rolenames[afrole]}には変更できません`)
                    .then(message => console.log(`${who}db-croleコマンドの実行失敗${date}`))
                    .catch(console.error);
            }
        }
        else {
            message.channel.send(`IDは数字でなければいけません`)
                .then(message => console.log(`${who}db-croleコマンドの実行失敗${date}`))
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
                                    .then(message => console.log(`${who}db-admemの実行${date}`))
                                    .catch(console.error);
                        })
                    }
                    else {
                        rows.forEach((row) => {
                            let dbrole = row.role
                            message.channel.send(`既にデータベース上に\n名前: ${row.name} role: ${rolenames[dbrole]}\nで登録されています`)
                                .then(message => console.log(`${who}db-admemの実行失敗${date}`))
                                .catch(console.error);
                        })
                    }
                })
            }
            else {
                message.channel.send(`IDとroleは数字でなければいけません`)
                    .then(message => console.log(`${who}db-admemコマンドの実行失敗${date}`))
                    .catch(console.error);
            }
        }
        else {
            message.channel.send(`すべて入力されていないか入力箇所が足りません`)
                .then(message => console.log(`${who}db-admemコマンドの実行失敗${date}`))
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
                                .then(message => console.log(`${who}db-delmemの実行${date}`))
                                .catch(console.error);
                        })
                    })
                }
                else {
                    message.delete();
                    message.channel.send(`そのIDはDB上に存在しません`)
                        .then(message => console.log(`${who}db-delmemの実行失敗${date}`))
                        .catch(console.error);
                }
            })
        }
        else {
            message.delete();
            message.channel.send(`IDは数字でなければいけません`)
                .then(message => console.log(`${who}db-delmemコマンドの実行失敗${date}`))
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