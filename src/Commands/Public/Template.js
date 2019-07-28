//テンプレート

module.exports =
    (client, message, date, who, cmd, args) => {
        try {
            message.delete();
            //ここに処理
        }
        catch (err) {
            console.log(`${cmd}コマンド実行中にエラーが発生しました\n${err}`)
        }
    }