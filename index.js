const ytdl = require('ytdl-core');
const fs = require('fs');
let express = require('express');
let cookieParser = require('cookie-parser');
let tg = require('./tg');
let app = express();
let NodeCache = require('node-cache');
let ch = new NodeCache();
let exec = require('child_process').exec;
const { stderr, stdout } = require('process');




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
        if(ch.has(chatId)){
            let url = JSON.parse(ch.get(chatId)).url;
            let filename = decodeURIComponent(JSON.parse(ch.get(chatId)).filename);
            var combining = /[\u0300-\u036F]/g; 
            filename = filename.normalize('NFKD').replace(combining, '');
            ch.take(chatId);
            let caption = decodeURIComponent(filename);
            filename = filename.replace(/\s/g,"");
            filename = filename.replace(/'/g,"");
            filename = filename.substring(0,20);
            exec(`mkdir downloads/${filename}`,(error,stdout,stderr)=>{
                let videoReadable = ytdl(url,{quality:'highestvideo'});
                let videoWriteable = fs.createWriteStream(`downloads/${filename}/${filename}+++++.mp4`);
                let audioReadable = ytdl(url,{quality:'highestaudio'});
                let audioWriteable = fs.createWriteStream(`downloads/${filename}/${filename}+++++.mp3`);
                videoReadable.pipe(videoWriteable);
                videoWriteable.on('finish',()=>{
                    audioReadable.pipe(audioWriteable);
                    audioWriteable.on('finish',()=>{
                        exec(`ffmpeg -i downloads/${filename}/${filename}+++++.mp4 -i downloads/${filename}/${filename}+++++.mp3 -c:v copy -c:a aac downloads/${filename}/${filename}.mp4`,(error)=>{
                            tg.sendVideo(chatId,caption,`downloads/${filename}/${filename}.mp4`,()=>{
                                exec("cd downloads && rm -r *");
                                console.log("Finshed!");
                            });
                        });
                    });
                });
            });
        }
    }
    else if(text=="Audio HQ"){
        console.log("@@@@@@@  AUDIO HQ @@@@@@@");
        tg.send({chat_id:chatId,text:"Downloading............",  reply_markup: JSON.stringify({
            remove_keyboard: true
        })});
        if(ch.has(chatId)){
            let url = JSON.parse(ch.get(chatId)).url;
            let filename = JSON.parse(ch.get(chatId)).filename;
            var combining = /[\u0300-\u036F]/g; 
            filename = filename.normalize('NFKD').replace(combining, '');
            ch.take(chatId);
            let caption = filename;
            filename = filename.replace(/\s/g,"");
            filename = filename.replace(/'/g,"");
            filename = filename.substring(0,20);
            exec(`mkdir downloads/${filename}`,(error,stdout,stderr)=>{
                let audioReadable = ytdl(url,{quality:'highestaudio'});
                let audioWriteable = fs.createWriteStream(`downloads/${filename}/${filename}.mp3`);
                audioReadable.pipe(audioWriteable);
                audioWriteable.on('finish',()=>{
                    tg.sendFile(chatId,caption,`downloads/${filename}/${filename}.mp3`,()=>{
                        exec("cd downloads && rm -r *");
                        console.log("Finshed!");
                    });
                });
            });
        }
    }
    else if((/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/).test(text))
    {
        let btnMarkup = {
            resize_keyboard: true,
            one_time_keyboard: true,
            keyboard: [['Video HQ'],['Audio HQ']]
          };
        let message = {
            chat_id:chatId,
            text:"Video or Audio?",
            reply_markup:btnMarkup
        };
        tg.send(message);
        let filename = "";
        ytdl.getBasicInfo(text).then((info)=>{
            filename = info.videoDetails.title;
            console.log(filename);
            if(!ch.has(chatId)){    
                ch.set(chatId,JSON.stringify({url:text,filename:filename}));
            }
            else{
                tg.send({chat_id:chatId,text:"Something went wrong!"});
            }
        });
    }
    else{
        tg.send({chat_id:chatId,text:"Invalid input!"});
    }
    console.log(chatId,text);
    res.end();
});
app.listen(3000);