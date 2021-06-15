const { spawn } = require('child_process');
const fs = require('fs');
const ytdl = require('ytdl-core');
const axios = require('axios');
/*(async()=>{
  console.log(await ytdl.getBasicInfo("https://www.youtube.com/watch?v=CSk9dUBH4K0"));
})();*/

/*ytdl.getBasicInfo("https://www.youtube.com/watch?v=CSk9dUBH4K0").then((info)=>{
  console.log(info.videoDetails.title);
});*/
/*

ytdl("https://www.youtube.com/watch?v=2VeYkS6FfM8",{quality:'highestvideo'}).pipe(fs.createWriteStream(`abc.mp4`));
ytdl("https://www.youtube.com/watch?v=2VeYkS6FfM8",{quality:'highestaudio'}).pipe(fs.createWriteStream(`abc.mp3`));

*/

let message = {
  chat_id:764390489,
  video:`GustavoSantaolalla-B.mp4`,
  caption:`This is the file!`
};

axios.post('https://api.telegram.org/bot1763190416:AAEPaw2fHzBk6w_0o5WmIt0kMSY_Ic15llE/sendVideo',message,{
    'content-type': 'multipart/form-data'
  })
  .then((value)=>console.log(value))
  .catch((value)=>console.log(value));