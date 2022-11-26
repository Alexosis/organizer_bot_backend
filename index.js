const TelegramBot = require('node-telegram-bot-api');

const token = '5846790166:AAEzM_XqkqnPjdz7x5R8b7iiZ80OLLCPjj4';

const webAppUrl = 'https://magnificent-genie-bc9521.netlify.app';

const bot = new TelegramBot(token, {polling: true});


bot.on('message', async(msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if(text == '/start'){
        await bot.sendMessage(chatId, 'Ниже кнопка, заполни форму',{
            reply_markup:{
                keyboard:[
                    [{text: 'добавить событие', web_app:{url:webAppUrl + '/form'}}],
                    [{text: 'посмотреть календарь', web_app:{url:webAppUrl}}]
                ]
            }
        })
    }

    if(msg?.web_app_data?.data){
        try{
            fetch('')

            const data = JSON.parse(msg?.web_app_data?.data);
            await bot.sendMessage(chatId,`Событие ${data?.name} добавленно в Ваш календарь`)
        } catch (e){
            console.log(e);
        }
    }
});