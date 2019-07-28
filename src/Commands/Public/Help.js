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

    Help.js
    Codename: silence
    v 1.0
    Twitter: @Fairy_Phy
    
    Warning: Because it is Japanese Bot,To correspond to the language you are using,Please modify the code yourself.
                ↑google translate :(((((((((((((((

*/

module.exports =
    (message, cf, date, who, cmd, rolehas, rolenames) => {
        try {
            message.delete();
            message.reply(`DMをご確認ください！`);
            message.member.send(`
                            一般コマンド\(プレフィックスは ${cf.fpf} です\)
                            \n\`\`\`
                            \n${cf.fpf}ping => pingを測ります
                            \n${cf.fpf}ver => Botのバージョンを表示します
                            \n${cf.fpf}help => ヘルプを表示します
                            \n${cf.fpf}emoji [名前] (画像アップロード) => 画像をもとに絵文字を作成します
                            \n\`\`\`
                            `)
                .then(message => console.log(`${who}${cmd}コマンドの実行${date}`))
                .catch(console.error);
            if (rolehas[0]) {
                message.member.send(`
                                SUコマンド\(プレフィックスは ${cf.spf} です\)
                                \n\`\`\`
                                \n${cf.spf}db-find [ID] => データベース上にIDが登録されているか確認します
                                \n${cf.spf}db-list => データベースに登録されている名前とIDをリストにして表示します
                                \n${cf.spf}db-cname [ID] [変更したい名前] => 登録されているIDの名前を変更できます
                                \n${cf.spf}db-crole [ID] [変更したいrole(Super=0 Root=1)] => 登録されているIDのroleを変更できます
                                \n${cf.spf}db-admem [名前] [ID] [role(${rolenames[0]}=0 ${rolenames[1]}=1)] => データベースにそのIDを追加します
                                \n${cf.spf}db-delmem [ID]=> そのIDをデータベース・サーバーから削除します
                                \n\`\`\`
                                `);
            }
            const Bw = message.author.id == cf.bwid;
            if (Bw) {
                message.member.send(`
                                Botownデバッグコマンド\(プレフィックスは ${cf.dpf} です\)
                                \n\`\`\`
                                \n${cf.dpf}restart => Botの再起動
                                \n${cf.dpf}logout => Botの終了
                                \n\`\`\`
                                `);
            }
            else return;
        }
        catch (err) {
            console.log(`${cmd}コマンド実行中にエラーが発生しました\n${err}`)
        }
    }