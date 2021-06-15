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
    if((/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/).test(text))
    {
        var videoFormats = {};
        var audioFormats = {};
        yt.getVideoQaulities(text).then((info)=>{
            videoFormats = info;
            yt.getAudioQualities(text).then((info)=>{
                audioFormats = info;
            });
            let message = {
                chat_id:chatId,
                text:"Choose a download option"
            };
            tg.send(message);
        });
    }
    else{
        let message = {
            chat_id:chatId,
            text:"Invalid url!"
        };
        tg.send(message);
    }

















    console.log(chatId,text);
    res.end();
});








app.listen(3000);