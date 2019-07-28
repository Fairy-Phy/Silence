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

    randomcode.js
    Codename: silence
    v 1.0
    Twitter: @Fairy_Phy
    
    Warning: Because it is Japanese Bot,To correspond to the language you are using,Please modify the code yourself.
                ↑google translate :(((((((((((((((

*/

module.exports =
    () => {
        try {
            const Alplist = () => {
                const a = `a`.charCodeAt(0),
                    A = `A`.charCodeAt(0),
                    alp = Array.apply(null, new Array(26)).map((al, i) => {
                        return String.fromCharCode(a + i);
                    }),
                    ALP = Array.apply(null, new Array(26)).map((AL, i) => {
                        return String.fromCharCode(A + i);
                    });

                let Alp = [],
                    j = 0;

                for (let i = 0; i < 100; i++) {
                    Alp[i] = alp[j];
                    i++;
                    Alp[i] = ALP[j];
                    j++;
                    if (j == alp.length && j == ALP.length) {
                        j = 1;
                    }
                    else {
                        continue;
                    }
                }
                //初期化
                j = undefined;

                return Alp;
            };

            const Alp = Alplist();
            let A = [];
            for (let i = 0; i < 6; i++) {
                A[i] = Math.floor(Math.random() * 100);
            }

            const Auth = Alp[A[0]] + Alp[A[1]] + Alp[A[2]] + Alp[A[3]] + Alp[A[4]] + Alp[A[5]];

            return Auth;
        }
        catch (err) {
            console.log(`エラー発生\n${err}`);
        }
    };