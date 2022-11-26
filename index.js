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
                ]
            }
        })
    } else if (text == '/event_list'){
        await bot.sendMessage(chatId, 'Список твоих ближайших событий доступен по ссылке ниже:',{
            reply_markup:{
                inline_keyboard:[
                    [{text: 'ближайшие события', web_app:{url:webAppUrl}}]
                ]
            }
        })
    }

    if(msg?.web_app_data?.data){
        const data = {chatId:
            msg?.web_app_data?.data}

        try{
            fetch('http://127.0.0.1:8000/api/todos/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
              .then(() => {
                  const data = JSON.parse(msg?.web_app_data?.data);
                  bot.sendMessage(chatId,`Событие ${data?.todos.name} добавленно в Ваш календарь`)
              })
              .catch((err) => {
                  console.log(err)
              })

            console.log(msg?.web_app_data?.data)

        } catch (e){
            console.log(e);
        }
    }
});