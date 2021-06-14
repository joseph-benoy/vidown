let ytdl = require('ytdl-core');

const yt = {
    getVideoQaulities:async (url)=>{
        try{
            const info = await ytdl.getInfo(url);
            const videoFormats = ytdl.filterFormats(info.formats,'video');
            let qualityList = {};
            for(let i of videoFormats){
                if(i['hasVideo']){
                    qualityList[i['bitrate']] = i['container'];
                }
            }
            return qualityList;
        }
        catch(err){
            console.log(err);
        }
    },
    getAudioQualities:async (url)=>{
        try{
            const info = await ytdl.getInfo(url);
            const videoFormats = ytdl.filterFormats(info.formats,'audioonly');
            let qualityList = {};
            for(let i of videoFormats){
                if(!i['hasVideo']){
                    qualityList[i['bitrate']] = i['container'];
                }
            }
            return qualityList;
        }
        catch(err){
            console.log(err);
        }
    }
};

module.exports = yt;