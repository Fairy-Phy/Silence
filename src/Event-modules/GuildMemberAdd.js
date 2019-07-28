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

    GuildMemberAdd.js
    Codename: silence
    v 1.0
    Twitter: @Fairy_Phy
    
    Warning: Because it is Japanese Bot,To correspond to the language you are using,Please modify the code yourself.
                ↑google translate :(((((((((((((((

*/

module.exports =
    (client, member, connection, cf, date) => {
        try {
            const roleids = [cf.suid, cf.exid],
                surole = member.guild.roles.find(role => role.id === roleids[0]),
                exrole = member.guild.roles.find(role => role.id === roleids[1]),
                rolenames = [surole.name, exrole.name];

            connection.query(`SELECT uuid, role FROM ${cf.dbtable} WHERE uuid = '${member.user.id}'`, (err, rows) => {
                if (err) throw err;
                if (rows.length > 0) {
                    if (!member.user.bot) {
                        rows.forEach(row => {

                            if (row.role == 0) {
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
                                                "value": `結入Botのすべてのコマンドを使うことができます\n@${client.user.username}で確認できます！`
                                            },
                                            {
                                                "name": "すべてのチャンネルを読んだり送信することができます",
                                                "value": "これはあなたが認定された証です"
                                            },
                                            {
                                                "name": "抜けたらBANされます",
                                                "value": `現在${rolenames[0]}は抜けたらBANされます`
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
                        });
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
            });
        }

        catch (err) {
            console.log(`GuildMemberAddイベント中にエラーが発生しました\n${err}`)
        }
    };