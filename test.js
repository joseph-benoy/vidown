const fs = require('fs');
const ytdl = require('ytdl-core');

/*(async()=>{
  console.log(await ytdl.getBasicInfo("https://www.youtube.com/watch?v=CSk9dUBH4K0"));
})();*/

ytdl.getBasicInfo("https://www.youtube.com/watch?v=CSk9dUBH4K0").then((info)=>{
  console.log(info.videoDetails.title);
});

