const Telegraf = require('telegraf');
const Composer = require('telegraf/composer');
const session = require('telegraf/session');
const Stage = require('telegraf/stage');
const WizardScene = require('telegraf/scenes/wizard');
const webshot = require('webshot')
const fs = require('fs');
const http = require('http');
const mongoose = require('mongoose');
const Markup = require('telegraf/markup')
const crypto = require("crypto");
const imdb = require( 'imdb-api' )

const exphbs = require('express-handlebars');
const request = require('request');
const UserService = require('./user-service');
const BotUtils = require('./utils');
const Logger = require('./logger');
const path = require('path');
const bodyParser = require('body-parser');
const MessagesService = require('./messages-service');
const users = require('./message-model');
const express = require('express');
const app = express();

app.use('/', express.static('public'));

app.listen(process.env.PORT || 8080);


mongoose.connect('mongodb://top:88993421q@ds022408.mlab.com:22408/top', { useNewUrlParser: true });

const stepHandler = new Composer();

const tot = new WizardScene('tot',
    stepHandler,
    (ctx) => {
        const markdown = `
🔄*Перешлите нам пост со своего канала, на который хотите получить просмотры*:
`
        ctx.reply(markdown,{
            parse_mode: 'Markdown',
            reply_markup: {
                keyboard: [
                    ['❌Отмена']
                ],
                resize_keyboard: true
            }
        });
        return ctx.wizard.next()
    },
    (ctx) => {
        const forward = ctx.message.forward_from_chat;
        const { chat, message_id, text } = ctx.message;
        ctx.session.counter = ctx.message.text;
        if (ctx.message.text === '❌Отмена') {
            ctx.telegram.sendMessage(ctx.message.chat.id, '...', {
                reply_markup: {
                    keyboard: [
                        ['👤Заказать подписчиков', '👁‍🗨Просмотры'],
                        ['📃FAQ', '🎁Бонусы'],
                        ['📢Support']
                    ],
                    resize_keyboard: true
                },
            });
            return ctx.scene.leave()
        }
        else if(forward){
            ctx.telegram.forwardMessage(chat.id, chat.id, message_id, ctx.session.counter)
            const markdown = `
✅*Отлично! теперь дело за малым!*

👁‍🗨*Укажите количество просмотров*:`
            ctx.telegram.sendMessage(ctx.message.chat.id, markdown,{
                parse_mode: 'Markdown'
            });
            return ctx.wizard.next()
        }else {
            const arr = ["Это не совсем то, попробуй еще раз!",
                "Просто перешли пост со своего канала сюда!", "Упс... это не то что мы просили, попытайся еще раз!",
                "Просто сделай \"Переслать сообщение\" и сюда его!"];
            const rand = Math.floor(Math.random() * arr.length);
            const markdown = `
*${arr[rand]}*
`
            ctx.telegram.sendMessage(ctx.message.chat.id, markdown,{
                parse_mode: 'Markdown'
            });
        }
    },
    (ctx) => {

        if (ctx.message.text === '❌Отмена') {
            ctx.telegram.sendMessage(ctx.message.chat.id, '...', {
                reply_markup: {
                    keyboard: [
                        ['👤Заказать подписчиков', '👁‍🗨Просмотры'],
                        ['📃FAQ', '🎁Бонусы'],
                        ['📢Support']
                    ],
                    resize_keyboard: true
                },
            })
            return ctx.scene.leave()
        }
        else if(ctx.message.text < 300){
            const markdown = `⚠️*Минимальный заказ 300 просмотров*.
\`Укажите заново число просмотров\`:`
            ctx.telegram.sendMessage(ctx.message.chat.id, markdown,{
                parse_mode: 'Markdown'
            })
        }
        else if(ctx.message.text > 10000) {
            const markdown = `⚠️*Максимальное количество просмотров за один раз не более 10000 шт*.
\`Укажите заново число просмотров\`:`
            ctx.telegram.sendMessage(ctx.message.chat.id, markdown, {
                parse_mode: 'Markdown'
            })
        }
        else if(ctx.message.text >= 1000 && ctx.message.text <= 10000){
            const text = ctx.message.text * 0.1;
            const text1 = Math.round(text);
            const id = crypto.randomBytes(10).toString('hex');
            const markdown = `
♻️*Оформление заказа*:

👁‍🗨Число просмотров:  *${ctx.message.text}*
▪️Стоимость за единицу:  *0.1* ₽
💳Итого к оплате:  *${text1}* ₽

⚠️*Обязательно при оплате в комментариях укажите:* \`${ctx.message.chat.id}3\`
`
            ctx.telegram.sendMessage(ctx.message.chat.id, markdown,{
                parse_mode: 'Markdown',
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: `💳Оплатить QIWI`,
                                url: `https://qiwi.com/payment/form/99?extra%5B%27account%27%5D=79872132562&amountInteger=${text1}`
                            }
                        ],
                        [
                            {
                                text: `💳Оплатить Я.Деньги`,
                                url: `https://money.yandex.ru/to/410014917439508/${text1}`
                            }
                        ],
                        [
                            {
                                text: `Проверить оплату ₽`,
                                callback_data: 'say'
                            }
                        ],
                    ],
                },
            })
            return ctx.scene.leave()
        }
        else if(ctx.message.text > 10000) {
            const markdown = `⚠️*Максимальное количество просмотров за один раз не более 10000 шт*.
\`Укажите заново число просмотров\`:`
            ctx.telegram.sendMessage(ctx.message.chat.id, markdown, {
                parse_mode: 'Markdown'
            })
        }
        else if(ctx.message.text >= 300 && ctx.message.text <= 1000){
            const text = ctx.message.text * 0.3;
            const text1 = Math.round(text);
            const id = crypto.randomBytes(10).toString('hex');
            const markdown = `
♻️*Оформление заказа*:

👁‍🗨Число просмотров:  *${ctx.message.text}*
▪️Стоимость за единицу:  *0.3* ₽
💳Итого к оплате:  *${text1}* ₽

⚠️*Обязательно при оплате в комментариях укажите:* \`${ctx.message.chat.id}3\`
`
            ctx.telegram.sendMessage(ctx.message.chat.id, markdown,{
                parse_mode: 'Markdown',
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: `💳Оплатить QIWI`,
                                url: `https://qiwi.com/payment/form/99?extra%5B%27account%27%5D=79872132562&amountInteger=${text1}`
                            }
                        ],
                        [
                            {
                                text: `💳Оплатить Я.Деньги`,
                                url: `https://money.yandex.ru/to/410014917439508/${text1}`
                            }
                        ],
                        [
                            {
                                text: `Проверить оплату ₽`,
                                callback_data: 'say'
                            }
                        ],
                    ],
                },
            })
            return ctx.scene.leave()
        }else {
            const markdown = `
*Укажите корректное число:*
`
            ctx.telegram.sendMessage(ctx.message.chat.id, markdown,{
                parse_mode: 'Markdown',
                reply_markup: {
                    keyboard: [
                        ['❌Отмена']
                    ],
                    resize_keyboard: true
                },
            });
        }
    }
);

const top = new WizardScene('top',

    stepHandler,
    (ctx) => {
        const markdown = `
📢 *Есть какие та проблемы или вопросы?*
 
\`Пишите, мы рады будем вам ответить.\`
`
        ctx.telegram.sendMessage(ctx.message.chat.id, markdown,{
            parse_mode: 'Markdown',
            reply_markup: {
                keyboard: [
                    ['▪️Назад']
                ],
                resize_keyboard: true
            },
        })
        console.log(typeof ctx.message.text);
        return ctx.wizard.next()
    },
    (ctx) => {
        if (ctx.message.text === '▪️Назад') {
            ctx.telegram.sendMessage(ctx.message.chat.id, '...', {
                reply_markup: {
                    keyboard: [
                        ['👤Заказать подписчиков', '👁‍🗨Просмотры'],
                        ['📃FAQ', '🎁Бонусы'],
                        ['📢Support']
                    ],
                    resize_keyboard: true
                },
            })
            return ctx.scene.leave()
        }else{
            const html1 = `
📢<b>Ваше сообщение:</b>
 
"${ctx.message.text}"
 
<b>Сообщение уже в пути</b>📤
<pre>В скором времени на него ответят.</pre>`
            ctx.telegram.sendMessage(ctx.message.chat.id, html1,{
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: [
                        ['👤Заказать подписчиков', '👁‍🗨Просмотры'],
                        ['📃FAQ', '🎁Бонусы'],
                        ['📢Support']
                    ],
                    resize_keyboard: true
                },
            });
            const { chat, message_id, text } = ctx.message;

            ctx.telegram.forwardMessage(chatId=549073144, chat.id, message_id);
            return ctx.scene.leave()
        }
    }

);

const tok = new WizardScene('tok',
    stepHandler,
    (ctx) => {
        const markdown = `
*Укажите канал в формате*:  \`"@yourchannel"\`
`
        ctx.reply(markdown,{
            parse_mode: 'Markdown',
            reply_markup: {
                keyboard: [
                    ['❌Отмена']
                ],
                resize_keyboard: true
            }
        });
        return ctx.wizard.next()
    },
    (ctx) => {
        ctx.session.counter = ctx.message.text;
        if (ctx.message.text === '❌Отмена') {
            ctx.telegram.sendMessage(ctx.message.chat.id, '...', {
                reply_markup: {
                    keyboard: [
                        ['👤Заказать подписчиков', '👁‍🗨Просмотры'],
                        ['📃FAQ', '🎁Бонусы'],
                        ['📢Support']
                    ],
                    resize_keyboard: true
                },
            })
            return ctx.scene.leave()
        }
        else {
            const markdown = `
*Укажите количество подписчиков*:
`
            ctx.telegram.sendMessage(ctx.message.chat.id, markdown,{
                parse_mode: 'Markdown',
                reply_markup: {
                    keyboard: [
                        ['❌Отмена']
                    ],
                    resize_keyboard: true
                },
            });
            return ctx.wizard.next()
        }
    },
    (ctx) => {

        if (ctx.message.text === '❌Отмена') {
            ctx.telegram.sendMessage(ctx.message.chat.id, '...', {
                reply_markup: {
                    keyboard: [
                        ['👤Заказать подписчиков', '👁‍🗨Просмотры'],
                        ['📃FAQ', '🎁Бонусы'],
                        ['📢Support']
                    ],
                    resize_keyboard: true
                },
            })
            return ctx.scene.leave()
        }
        else if(ctx.message.text < 350){
            const markdown = `⚠️*Минимальный заказ 350 подписчиков*.
\`Укажите заново число подписчиков\`:`
            ctx.telegram.sendMessage(ctx.message.chat.id, markdown,{
                parse_mode: 'Markdown'
            })
        }
        else if(ctx.message.text > 5000) {
            const markdown = `⚠️*Максимальное количество подписчиков за раз не более 5000 шт*.
\`Укажите заново число подписчиков\`:`
            ctx.telegram.sendMessage(ctx.message.chat.id, markdown, {
                parse_mode: 'Markdown'
            })
        }
        else if(ctx.message.text >= 350 && ctx.message.text < 1000){
            const text = ctx.message.text * 0.3;
            const text1 = Math.round(text);
            const id = crypto.randomBytes(10).toString('hex');
            const html = `
♻️<b>Оформление заказа</b>:

➡️Ваш канал: ${ctx.session.counter}
👤Число подписчиков:  <b>${ctx.message.text}</b>
▪️Тип подписчиков:  <b>Боты</b>
▪️Стоимость за единицу:  <b>0.3</b> ₽
💳Итого к оплате:  <b>${text1}</b> ₽

⚠️<b>Обязательно при оплате в комментариях укажите:</b> <pre>${ctx.message.chat.id}1</pre>
⚠️<b>При оплате киви так же укажите сумму: ${text1}</b> ₽
`
            ctx.telegram.sendMessage(ctx.message.chat.id, html,{
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: `💳Оплатить QIWI`,
                                url: `https://qiwi.com/payment/form/99?extra%5B%27account%27%5D=79872132562&amountInteger=${text1}`
                            }
                        ],
                        [
                            {
                                text: `💳Оплатить Я.Деньги`,
                                url: `https://money.yandex.ru/to/410014917439508/${text1}`
                            }
                        ],
                        [
                            {
                                text: `Проверить оплату ₽`,
                                callback_data: 'say'
                            }
                        ],
                    ],
                },
            })
            return ctx.scene.leave()
        }
        else if(ctx.message.text >= 1000 && ctx.message.text <= 5000){
            const text = ctx.message.text * 0.2;
            const text1 = Math.round(text);
            const id = crypto.randomBytes(10).toString('hex');
            const html = `
♻️<b>Оформление заказа</b>:

➡️Ваш канал: ${ctx.session.counter}
👤Число подписчиков:  <b>${ctx.message.text}</b>
▪️Тип подписчиков:  <b>Боты</b>
▪️Стоимость за единицу:  <b>0.2</b> ₽
💳Итого к оплате:  <b>${text1}</b> ₽

⚠️<b>Обязательно при оплате в комментариях укажите:</b> <pre>${ctx.message.chat.id}1</pre>
⚠️<b>При оплате киви так же укажите сумму: ${text1}</b> ₽
`
            ctx.telegram.sendMessage(ctx.message.chat.id, html,{
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: `💳Оплатить QIWI`,
                                url: `https://qiwi.com/payment/form/99?extra%5B%27account%27%5D=79872132562&amountInteger=${text1}`
                            }
                        ],
                        [
                            {
                                text: `💳Оплатить Я.Деньги`,
                                url: `https://money.yandex.ru/to/410014917439508/${text1}`
                            }
                        ],
                        [
                            {
                                text: `Проверить оплату ₽`,
                                callback_data: 'say'
                            }
                        ],
                    ],
                },
            })
            return ctx.scene.leave()
        }
        else {
            const markdown = `
*Укажите корректное число:*
`
            ctx.telegram.sendMessage(ctx.message.chat.id, markdown,{
                parse_mode: 'Markdown',
                reply_markup: {
                    keyboard: [
                        ['❌Отмена']
                    ],
                    resize_keyboard: true
                },
            });
        }
    },
);

const teh = new WizardScene('teh',

    stepHandler,
    (ctx) => {
    const markdown = `
*Укажите канал в формате*:  \`"@yourchannel"\`
`
    ctx.reply(markdown,{
        parse_mode: 'Markdown',
        reply_markup: {
            keyboard: [
                ['❌Отмена']
            ],
            resize_keyboard: true
        }
    });
        return ctx.wizard.next()
    },
    (ctx) => {
        ctx.session.counter = ctx.message.text;
        if (ctx.message.text === '❌Отмена') {
            ctx.telegram.sendMessage(ctx.message.chat.id, '...', {
                reply_markup: {
                    keyboard: [
                        ['👤Заказать подписчиков', '👁‍🗨Просмотры'],
                        ['📃FAQ', '🎁Бонусы'],
                        ['📢Support']
                    ],
                    resize_keyboard: true
                },
            })
            return ctx.scene.leave()
        }
        else {
            const markdown = `
*Укажите количество подписчиков*:
`
            ctx.telegram.sendMessage(ctx.message.chat.id, markdown,{
                parse_mode: 'Markdown',
                reply_markup: {
                    keyboard: [
                        ['❌Отмена']
                    ],
                    resize_keyboard: true
                },
            });
            return ctx.wizard.next()
        }
    },
    (ctx) => {
        if (ctx.message.text === '❌Отмена') {
            ctx.telegram.sendMessage(ctx.message.chat.id, '...', {
                reply_markup: {
                    keyboard: [
                        ['👤Заказать подписчиков', '👁‍🗨Просмотры'],
                        ['📃FAQ', '🎁Бонусы'],
                        ['📢Support']
                    ],
                    resize_keyboard: true
                },
            })
            return ctx.scene.leave()
        }
        else if(ctx.message.text < 200){
            const markdown = `⚠️*Минимальный заказ 200 подписчиков*.
\`Укажите заново число подписчиков\`:`
            ctx.telegram.sendMessage(ctx.message.chat.id, markdown,{
                parse_mode: 'Markdown'
            })
        }
        else if(ctx.message.text > 5000) {
            const markdown = `⚠️*Максимальное количество подписчиков за раз не более 5000 шт*.
\`Укажите заново число подписчиков\`:`
            ctx.telegram.sendMessage(ctx.message.chat.id, markdown, {
                parse_mode: 'Markdown'
            })
        }
        else if(ctx.message.text >= 200 && ctx.message.text < 1000){
            const text = ctx.message.text * 0.5;
            const text1 = Math.round(text);
            const id = crypto.randomBytes(10).toString('hex');
            const html = `
♻️<b>Оформление заказа</b>:

➡️Ваш канал: ${ctx.session.counter}
👤Число подписчиков:  <b>${ctx.message.text}</b>
▪️Тип подписчиков:  <b>Живые</b>
▪️Стоимость за единицу:  <b>0.5</b> ₽
💳Итого к оплате:  <b>${text1}</b> ₽

⚠️<b>Обязательно при оплате в комментариях укажите:</b> <pre>${ctx.message.chat.id}1</pre>
⚠️<b>При оплате киви так же укажите сумму: ${text1}</b> ₽
`
                ctx.telegram.sendMessage(ctx.message.chat.id, html,{
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [
                            {
                                text: `💳Оплатить QIWI`,
                                url: `https://qiwi.com/payment/form/99?extra%5B%27account%27%5D=79872132562&amountInteger=${text1}`
                            }
                            ],
                            [
                                {
                                    text: `💳Оплатить Я.Деньги`,
                                    url: `https://money.yandex.ru/to/410016919873167/${text1}`
                                }
                            ],
                            [
                                {
                                    text: `Проверить оплату ₽`,
                                    callback_data: 'say'
                                }
                            ],
                        ],
                    },
                })
            return ctx.scene.leave()
        }
        else if(ctx.message.text >= 1000 && ctx.message.text <= 5000){
            const text = ctx.message.text * 0.3;
            const text1 = Math.round(text);
            const id = crypto.randomBytes(10).toString('hex');
            const html = `
♻️<b>Оформление заказа</b>:

➡️Ваш канал: ${ctx.session.counter}
👤Число подписчиков:  <b>${ctx.message.text}</b>
▪️Тип подписчиков:  <b>Живые</b>
▪️Стоимость за единицу:  <b>0.3</b> ₽
💳Итого к оплате:  <b>${text1}</b> ₽

⚠️<b>Обязательно при оплате в комментариях укажите:</b> <pre>${ctx.message.chat.id}1</pre>
⚠️<b>При оплате киви так же укажите сумму: ${text1}</b> ₽
`
            ctx.telegram.sendMessage(ctx.message.chat.id, html,{
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: `💳Оплатить QIWI`,
                                url: `https://qiwi.com/payment/form/99?extra%5B%27account%27%5D=79872132562&amountInteger=${text1}`
                            }
                        ],
                        [
                            {
                                text: `💳Оплатить Я.Деньги`,
                                url: `https://money.yandex.ru/to/410016919873167/${text1}`
                            }
                        ],
                        [
                            {
                                text: `Проверить оплату ₽`,
                                callback_data: 'say'
                            }
                        ],
                    ],
                },
            })
            return ctx.scene.leave()
        }
        else {
            const markdown = `
*Укажите корректное число:*
`
            ctx.telegram.sendMessage(ctx.message.chat.id, markdown,{
                parse_mode: 'Markdown',
                reply_markup: {
                    keyboard: [
                        ['❌Отмена']
                    ],
                    resize_keyboard: true
                },
            });
        }
    },

);


const bot = new Telegraf('628897377:AAHc7mxfKTPCgbdwb_1FuvtaS543Ulh7pzg');

const stage = new Stage();

stage.register(top, tok, tot, teh);
bot.use(session());
bot.use(stage.middleware());
bot.hears('🔑Войти', (ctx) => {
    ctx.scene.enter('top');
});
bot.hears('👤Живые', (ctx) => {
    ctx.scene.enter('teh');
});
bot.hears('👁‍🗨Заказать просмотры', (ctx) => {
    ctx.scene.enter('tot');
});
bot.hears('👁‍🗨Просмотры', (ctx) => {
    const markdown = `
✔️*Нужны просмотры к вашим постам?*

Предлагаем вам услугу просмотры для вашего поста.

*Стоимость*:

👁‍🗨
\`Цена за один просмотр\` - *0.3*₽
\`При заказе от 1000 просмотров, цена составит\` - *0.1*₽

⚠️\`Минимальный заказ составляет\` *300* \`просмотров\`.
⚠️\`Максимальный заказ на один пост суммарно составляет\` *20k* \`просмотров\`.
    `
    ctx.telegram.sendMessage(ctx.message.chat.id, markdown, {
        parse_mode: 'Markdown',
        reply_markup: {
            keyboard: [
                ['👁‍🗨Заказать просмотры'],
                ['❌Отмена']
            ],
            resize_keyboard: true
        },
        disable_notification: false
    })
});
bot.hears('🤖Боты', (ctx) => {
    ctx.scene.enter('tok');
});
bot.hears('📢Support', (ctx) => {
    ctx.scene.enter('top');
});
bot.hears('🕐За 24 часа', (ctx) => {

    ctx.telegram.sendMessage(ctx.message.chat.id, `Подождите, идет загрузка...`,)

    const optionsSelector = {
        captureSelector: '.chartjs-render-monitor'
    };
    webshot('https://uztelegram.com/channel/Prikolgif?period=day',
        '1112.jpg', optionsSelector, function(err) {
            if (!err) {
                console.log('Сделал скриншот')
                const day = '🕐За 24 часа';
                ctx.replyWithPhoto({ source: fs.readFileSync(__dirname + '/1112.jpg')}, {
                    caption: day,
                })
            }
        })
});
bot.hears('🕗За Месяц', (ctx) => {

    ctx.telegram.sendMessage(ctx.message.chat.id, `Подождите, идет загрузка...`,)

    const optionsSelector = {
        captureSelector: '.chartjs-render-monitor'
    };
    webshot('https://uztelegram.com/channel/Prikolgif?period=month',
        '1111.jpg', optionsSelector, function(err) {
            if (!err) {
                console.log('Сделал скриншот')
                const day = '🕗За Месяц';
                ctx.replyWithPhoto({ source: fs.readFileSync(__dirname + '/1111.jpg')}, {
                    caption: day,
                })
            }
        })
});
bot.hears('📃FAQ', (ctx) => {
    const markdown = `

📃*FAQ*
*Какая цена на услуги?*
\`Живые подписчики: до 1000шт -  0.5 ₽ свыше 1000шт - 0.3₽\`
\`Боты: до 1000шт - 0.3₽  свыше 1000шт - 0.2₽\`
\`Просмотры: до 1000шт - 0.3₽  свыше 1000шт - 0.1₽\`

*Как долго выполняется заказ?*
\`В зависимости от количества, в среднем от 1 до 72 часов(это касается подписчиков и просмотров).\` 

*Какое минимально количество бонусов можно обменять?*
\`Каких либо ограничений нету, обменивайте любое количество.\`

*Как долго начисляются бонусы?*
\`Бонусы начисляются в течении 5-20мин.\`

*Можно ли обменять бонусы на просмотры?*
\`Пока что нет\`.

*Тут нет вопроса на который я хотел бы получить ответ!*
\`Тогда пиши в\` /Support📢.
        `

    bot.telegram.sendMessage(ctx.message.chat.id, markdown, {
        parse_mode: 'Markdown'
    })
});
bot.hears('👤Заказать подписчиков', stepHandler, (ctx) => {

    const markdown = `
▪️*Выберите тип интересующих вас подписчиков*:

*Стоимость*:

👤\`Живые подписчики: до 1000шт\` - *0.5*₽ \` свыше 1000шт\` - *0.3*₽ 
🤖\`Боты: до 1000шт\` - *0.3*₽ \` свыше 1000шт\` - *0.2*₽
    `
    ctx.telegram.sendMessage(ctx.message.chat.id, markdown, {
        parse_mode: 'Markdown',
        reply_markup: {
            keyboard: [
                ['👤Живые', '🤖Боты'],
                ['❌Отмена']
            ],
            resize_keyboard: true
        },
        disable_notification: false
    })
});
bot.hears('❌Отмена', stepHandler, (ctx) => {

        ctx.telegram.sendMessage(ctx.message.chat.id, `⬇️`, {
            reply_markup: {
                keyboard: [
                    ['👤Заказать подписчиков', '👁‍🗨Просмотры'],
                    ['📃FAQ', '🎁Бонусы'],
                    ['📢Support']
                ],
                resize_keyboard: true
            },
            disable_notification: false
        })
});
bot.hears('▪️Назад', stepHandler, (ctx) => {

    ctx.telegram.sendMessage(ctx.message.chat.id, `⬇️`, {
        reply_markup: {
            keyboard: [
                ['👤Заказать подписчиков', '👁‍🗨Просмотры'],
                ['📃FAQ', '🎁Бонусы'],
                ['📢Support']
            ],
            resize_keyboard: true
        },
        disable_notification: false
    })
});
bot.hears('🎁Бонусы', (ctx) => {

    const markdown = `
🎁*Получайте бонусные баллы за привлечение потенциальных клиентов и обменивайте их на подписчиков!*

*За каждого привлеченного клиента который совершит заказ, вы получите 75 бонусов*.

*1Бонус* = 1подписчик

\`Текущий баланс\`:  *0* бонусов.
\`Всего совершенных заказов\`:  *0* шт.
    `

    ctx.telegram.sendMessage(ctx.message.chat.id, markdown, {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: '🔄Обменять бонусы',
                        callback_data: 'exchange'
                    }
                ],
                [
                    {
                        text: '➕ Заработать бонусы',
                        callback_data: 'client'
                    }
                ]
            ]
        }
    })
});
bot.hears(/start (.+)/, (ctx) => {


    const text = ctx.message.text;
    const id = text.replace(/\D+/g,"");

    if(id == ctx.message.chat.id){
        const markdown = `
⚠️*Неее, так дело не пойдет! Сам себе бонусы ты не начислишь!*😉

\`Давай все по честному\`))        
        `
        ctx.telegram.sendMessage(ctx.message.chat.id, markdown, {
            parse_mode: 'Markdown',
            reply_markup: {
                keyboard: [
                    ['👤Заказать подписчиков', '👁‍🗨Просмотры'],
                    ['📃FAQ', '🎁Бонусы'],
                    ['📢Support']
                ],
                resize_keyboard: true
            },
            disable_notification: false
        });
    }
    else{
        const markdown = `
😮*Опа!!! По твоей ссылке кто та запустил бота*. 

\`Ждемс пока этот кто та совершит заказ.\`       
        `
        const markdown1 = `
Приветствуем тебя *${ctx.from.username}*!`;
        ctx.telegram.sendMessage(ctx.message.chat.id, markdown1, {
            parse_mode: 'Markdown',
            reply_markup: {
                keyboard: [
                    ['👤Заказать подписчиков', '👁‍🗨Просмотры'],
                    ['📃FAQ', '🎁Бонусы'],
                    ['📢Support']
                ],
                resize_keyboard: true
            },
            disable_notification: false
        })
        ctx.telegram.sendMessage(ctx.message.chat.id=`${id}`, markdown, {
            parse_mode: 'Markdown',
            reply_markup: {
                keyboard: [
                    ['👤Заказать подписчиков', '👁‍🗨Просмотры'],
                    ['📃FAQ', '🎁Бонусы'],
                    ['📢Support']
                ],
                resize_keyboard: true
            },
            disable_notification: false
    });
    }

});
bot.command('start', (ctx) => {

        const markdown = `
Приветствуем тебя *${ctx.from.username}*!`;

        ctx.telegram.sendMessage(ctx.message.chat.id, markdown, {
            parse_mode: 'Markdown',
            reply_markup: {
                keyboard: [
                    ['👤Заказать подписчиков', '👁‍🗨Просмотры'],
                    ['📃FAQ', '🎁Бонусы'],
                    ['📢Support']
                ],
                resize_keyboard: true
            },
            disable_notification: false
        })
        console.log(ctx.message)
});
bot.command('Support', (ctx) => {
    ctx.scene.enter('top');
});
bot.on('callback_query', ctx => {

    const query = ctx.update.callback_query.data;
    const chatId = ctx.update.callback_query.from.id;
    const messageId = ctx.update.callback_query.message.message_id;

    if (query === 'exchange') {
        const markdown = `
⚠️*У вас нету активных бонусов*.

\`Привлекайте потенциальных клиентов и получайте бонусы, которые впоследствии можно обменять на подписчиков для вашего канала.\`
`
        ctx.editMessageText( markdown, {
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: '➕ Заработать бонусы',
                            callback_data: 'client'
                        }
                    ]
                ]
            }
        })
    }
    else if (query === 'client') {

        const markdown = `
➕*Для привлечения клиентов используйте реферальную ссылку*: 

t.me/televtopbot?start=${chatId}

▪️За каждый совершенный заказ по вашей ссылке, вам будет начисляться *75* бонусных баллов.
▫️Копите бонусы и обменивайте их на подписчиков.
▪️Возможно сразу использовать бонусы после их начисления, без каких либо ограничений.
`;

        ctx.editMessageText( markdown,{
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'Markdown',
            disable_web_page_preview: true
        })

    }
    else if (query === '1') {

        const markdown = `
➕
`;

        ctx.editMessageText( markdown,{
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'Markdown',
            reply_markup: {
                keyboard: [
                    ['👤Заказать подписчиков', '👁‍🗨Просмотры'],
                    ['📃FAQ', '🎁Бонусы'],
                    ['📢Support', '🔑Админка']
                ],
                resize_keyboard: true
            },
            disable_web_page_preview: true
        })

    }

    else if (query === '2') {
        ctx.telegram.answerCbQuery(ctx.callbackQuery.id, 'Платеж не найден!')
    }

    else{
        ctx.telegram.answerCbQuery(ctx.callbackQuery.id, 'Платеж не найден!')
        }

console.log(ctx.update)
});
bot.on('message', ctx => {

    const id = ctx.message.chat.id;
    const admin = 549073144;

    const forward = ctx.message.reply_to_message;

    if (forward && id === admin) {
        const text1 = ctx.message.reply_to_message.text;
        const text = ctx.message.text;
        const markdown =`
📥*Ответ на ваш вопрос*:

"\`${text1}\`"

▪️*${text}*
`;

        const id = ctx.message.reply_to_message.forward_from.id;

        ctx.telegram.sendMessage(ctx.message.chat.id=`${id}`, markdown,{
            parse_mode: 'Markdown'
        });
        console.log(ctx.message.reply_to_message.text)
    }

});
bot.startPolling();

