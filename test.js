const yt = require('./yt');
const fs = require('fs');
let express = require('express');
let cookieParser = require('cookie-parser');
let tg = require('./tg');
let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


let message = {
  chat_id: 764390489,
  text: 'some text',
  reply_markup: JSON.stringify({
      remove_keyboard: true
  })
};



tg.send(message);