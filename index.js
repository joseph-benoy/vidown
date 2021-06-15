const yt = require('./yt');
const fs = require('fs');
let express = require('express');
let cookieParser = require('cookie-parser');
let tg = require('./tg');
let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.post('/',(req,res)=>{
    let {chatId,text} = tg.parseUpdate(req.body);
    if(text=="/start"){
        let message = {
            chat_id:chatId,
            text:"Welcome to the Vidown Bot!\nSend a valid youtube video url tp download"
        };
        tg.send(message);
    }
    else if(text=="Video HQ"){
        tg.send({chat_id:chatId,text:"Downloading............",  reply_markup: JSON.stringify({
            remove_keyboard: true
        })});
    }
    else if((/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/).test(text))
    {
        let btnMarkup = {
            resize_keyboard: true,
            one_time_keyboard: true,
            keyboard: [['Video HQ'],['Video LQ'],['Audio HQ'],['Audio LQ']]
          };
        let message = {
            chat_id:chatId,
            text:"Video or Audio?",
            reply_markup:btnMarkup
        };
        tg.send(message);
    }
    else{
        tg.send({chat_id:chatId,text:"Invalid input!"});
    }














    console.log(chatId,text);
    res.end();
});








app.listen(3000);