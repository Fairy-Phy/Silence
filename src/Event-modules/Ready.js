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

    Ready.js
    Codename: silence
    v 1.0
    Twitter: @Fairy_Phy
    
    Warning: Because it is Japanese Bot,To correspond to the language you are using,Please modify the code yourself.
                ↑google translate :(((((((((((((((

*/

module.exports.ready =
    (client, connection, cf, date) => {
        try {
            connection.query(`SELECT count(*) AS usercounts FROM ${cf.dbtable}`, function (err, rows) {
                if (err) throw err;
                rows.forEach(row => {
                    var count = rows[0].usercounts;
                    client.user.setActivity(`${cf.fpf}help | ${count} Users!`, { type: `${cf.botact}` });
                    client.user.setStatus(cf.botsta);
                });
            });
            let start = `${client.user.username}Bot起動${date}`;
            console.log(start);
        }
        catch (err) {
            console.log(`readyイベントでエラーが発生しました\n${err}`);
        }
    };

module.exports.debug =
    (client, date) => {
        try {
            let start = `${client.user.username}Bot起動${date}`;
            console.log(start);
            console.log(`Test debug>終了の実行${date}`);
            client.destroy();
        }
        catch (err) {
            console.log(`テストデバッグ中にエラーが発生しました\n${err}`);
        }
    };