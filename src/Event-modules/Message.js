// Copyright (Fairy)Phy. Licensed under the Apache License 2.0.
// Please see LICENSE file for details.
// Warning: Because it is Japanese Bot,To correspond to the language you are using,Please modify the code yourself.

const public = require(`./Message-assets/Public_cmd`),
    admin = require(`./Message-assets/Admin_cmd`),
    owner = require(`./Message-assets/Owner_cmd`);


module.exports =
    (client, message, connection, cf, date) => {
        try {
            if (message.author.bot) return;

            if (!message.guild) return;

            /*
               roleids is
               0 => Administrator role
               1 => Normal role
           */
            let roleids = [cf.suid, cf.exid];

            const surole = message.guild.roles.find(role => role.id === roleids[0]),
                su = message.member.roles.has(surole.id);

            const rtrole = message.guild.roles.find(role => role.id === roleids[1]),
                rt = message.member.roles.has(rtrole.id);

            /*
                rolenames & rolehas is
                0 => Administrator role
                1 => Normal role
            */
            const rolenames = [surole.name, rtrole.name];
            const rolehas = [su, rt];

            let who = `${message.author.tag}が`;

            public(client, message, cf, date, who, rolehas, rolenames);
            admin(client, message, cf, date, who, roleids, rolehas, rolenames, connection);
            owner(client, message, cf, date, who);
        }
        catch (err) {
            console.log(`Messageイベント時にエラーが発生しました\n${err}`);
        }
    };