# Discordbotコードネーム: Silence


![](https://img.shields.io/github/release/Fairy-Phy/Silence.svg?label=version&style=flat-square)
![](https://img.shields.io/github/repo-size/Fairy-Phy/Silence.svg?style=flat-square)
![](https://img.shields.io/github/license/Fairy-Phy/Silence.svg?color=CB2533&style=flat-square)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/30f12a4ab2d64b4abe4380247c06a53f)](https://www.codacy.com/app/Fairy-Phy/Silence?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Fairy-Phy/Silence&amp;utm_campaign=Badge_Grade)

## **<span style="color: yellow; ">Warning: This README is Japanese only.</span>**

これはDiscordjsで作られたBotです。

動かすにはnodejs、Mysqlが必要です(各自でnpmプラグインをインストールする場合Discord.js, mysqlが必要です)

誰も使わないと思いますが自由に使っても構いません

main.jsの他にコンフィグファイルとしてcf.jsonがあるのでそちらと合わせてご利用ください

私のDiscord鯖用に作ってるのでメッセージ等はコードをいじって変更したほうがいいです

※コードをいじる際私的理解の変数名があるので注意してください(コメントで説明していますが足りてないところもあるので)

## どういうBot？
このBotはDBにDiscordのユーザーIDを追加することでホワイトリスト方式で招待できるかできないかを判別するBotです

ちなみにBotの追加も判別で追加できるようにしてあります、モデレーターRole(プログラム文ではSu)と通常Role(Rt)の2種類に分けられています

## どうやって使用する？
1. ファイルを[ダウンロード](https://github.com/Fairy-Phy/Silence/archive/master.zip "master.zip")する
2. サーバーにnodejsとMySQLをlinuxならyumやらaptとかでインスコする(この際各プラットフォームに分かれるので各自ググってください)

この時VPSとかでRAM500MBとかので契約するとMySQLがメモリ足りないって起こるのでそのときはSWAP領域を追加してあげると動きます

3. Mysqlのテーブルとユーザーを作成します

「は？要はなんのテーブル作ればいいんだよ」って人はこの文を打てば大体どうにかなります

```sql
CREATE DATABASE 適当なDB名;

USE 作ったdb名;

CREATE TABLE 適当なテーブル名(name longtext, uuid longtext, role int);

CREATE USER 適当なユーザー名 IDENTIFIED WITH mysql_native_password BY `適当なパスワード`;

GRANT ALL PRIVILEGES ON `作成したDB名`.* TO `作成したユーザー名`@`localhost`;
```

4. dbconf.jsにさっき作ったユーザー名・パスワード・DB名を入れて保存します(この時rootじゃなくて違うユーザーを新たに作ることをおすすめします)
5. cf.jsonに各IDやらなんやらを入れて保存します(焼けくそ)
6. npm install pm2を入れても入れなくてもいいですが入れておいたほうがいいです
7. pm2入れているならpm2 start main.js  nodejsならnode main.jsで起動できます

ひどい解説だけどすいません...m(_ _)m

作成日 2019/03/05

更新日 2019/07/28

---
## ライセンス

Silence(以下、「本コード」といいます)はApache License Version 2.0(以下、「本ライセンス」といいます。)に基づいてライセンスされます。あなたがこのファイルを使用するためには、本ライセンスに従わなければなりません。本ライセンスのコピーは下記の場所から入手できます。

http://www.apache.org/licenses/LICENSE-2.0

適用される法律または書面での同意によって命じられない限り、本ライセンスに基づいて頒布される本コードは、明示黙示を問わず、いかなる保証も条件もなしに「現状のまま」頒布されます。本ライセンスでの権利と制限を規定した文言については、本ライセンスを参照してください。
