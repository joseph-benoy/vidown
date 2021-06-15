let axios = require('axios');

let tg = {
    parseUpdate:(update)=>{
        return {
            chatId:update.message.chat.id,
            text:update.message.text
        };
    },
    send:(message)=>{
        axios.post("https://api.telegram.org/bot1763190416:AAEPaw2fHzBk6w_0o5WmIt0kMSY_Ic15llE/sendMessage",message);
    }
};

module.exports = tg;