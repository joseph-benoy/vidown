let axios = require('axios');
let formData = require('form-data');
let fs = require('fs');

let tg = {
    parseUpdate:(update)=>{
        return {
            chatId:update.message.chat.id,
            text:update.message.text
        };
    },
    send:(message)=>{
        axios.post("https://api.telegram.org/bot1763190416:AAEPaw2fHzBk6w_0o5WmIt0kMSY_Ic15llE/sendMessage",message,        {
            headers: {
              "Content-Type": "application/json",
            },
          });
    },
    sendVideo:(chatId,caption,filePath,callback)=>{
        console.log("###############################");
        let form = new formData();
        form.append('chat_id',chatId);
        form.append('video',fs.createReadStream(filePath));
        form.append('caption',caption);
        let url = "https://api.telegram.org/bot1763190416:AAEPaw2fHzBk6w_0o5WmIt0kMSY_Ic15llE/sendVideo";
        axios.post(url,form,{headers:{
            'Accept': 'application/json',
            'Content-Type': `multipart/form-data`,
            ...form.getHeaders()
          },
          maxContentLength:Infinity,
          maxBodyLength:Infinity
        })
          .then((value)=>{
            console.log('File sent successfully!');
            callback();
          }).catch((value)=>{
            console.log(value);
          });
    },
    sendFile:(chatId,caption,filePath,callback)=>{
      console.log("################# SENDING FILE ##############");
      let form = new formData();
      form.append('chat_id',chatId);
      form.append('document',fs.createReadStream(filePath));
      form.append('caption',caption);
      let url = "https://api.telegram.org/bot1763190416:AAEPaw2fHzBk6w_0o5WmIt0kMSY_Ic15llE/sendDocument";
      axios.post(url,form,{headers:{
          'Accept': 'application/json',
          'Content-Type': `multipart/form-data`,
          ...form.getHeaders()
        },
        maxContentLength:Infinity,
        maxBodyLength:Infinity
      })
        .then((value)=>{
          console.log('File sent successfully!');
          callback();
        }).catch((value)=>{
          console.log(value);
        });
  }
};

module.exports = tg;