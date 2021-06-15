const fs = require('fs');
const ytdl = require('ytdl-core');


ytdl('https://www.youtube.com/watch?v=s-bZD3O3P80',{ quality: '136' })
  .pipe(fs.createWriteStream('video.mp4'));