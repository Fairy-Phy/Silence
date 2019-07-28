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

    GuildMemberRemove.js
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
                rtrole = member.guild.roles.find(role => role.id === roleids[1]),
                rolenames = [surole.name, rtrole.name];

            const channel = client.channels.find(ch => ch.id === `${cf.logc}`);

            if (!member.user.bot) {
                connection.query(`SELECT * FROM ${cf.dbtable} WHERE uuid = ${member.user.id}`, (err, rows) => {
                    if (err) throw err;
                    if (rows.length > 0) {
                        rows.forEach(row => {
                                connection.query(`DELETE FROM ${cf.dbtable} WHERE uuid = ${member.user.id}`, (errr, ress) => { if (errr) throw errr; });
                                member.ban(`サーバーを抜けたため`)
                                    .then(() => console.log(`${member.user.tag}はサーバーを抜けました${rolenames[row.role]}${date}`))
                                    .catch(console.error);
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
                        channel.send({
                            embed: {
                                title: "サーバーに登録されていないかデータベース上から削除されました",
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
            }
        }
        catch (err) {
            console.log(`guildMemberRemoveイベント中にエラーが発生しました\n${err}`);
        }
    };