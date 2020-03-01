// Copyright (Fairy)Phy. Licensed under the Apache License 2.0.
// Please see LICENSE file for details.
// Warning: Because it is Japanese Bot,To correspond to the language you are using,Please modify the code yourself.

module.exports =
    (client, date) => {
        console.log(`Error> 自動再起動の実行${date}`)
        client.destroy()
            .then(() => {
                client.login(client.tokenid);
            });
    };