const TelegramBot = require('node-telegram-bot-api');
const token = '6521417444:AAH5-kkoRNg1N1eB7GwMlnKR3eHB5R6iN28';
const bot = new TelegramBot(token, { polling: true });

const helloMessageText = `<b>Добро пожаловать в MyWear</b> 🏪\n\nВыбери, что тебе нужно:`;
const helloCartMessageText = `<b>Вижу, что ты уже добавил товары в коризну</b> 🤗\n\nВыбери, что тебе нужно:`;
const menuMessageText = `<b>Главное меню MyWear</b> 🏪\n\nВыбери, что тебе нужно:`;
let count = 0;
let cart = [];
const menuOptinos = {
    reply_markup: {
        inline_keyboard: [
            [{ text: 'Корзина 🛒', callback_data: 'sd' }],
            [{ text: 'Написать менеджеру ❔', callback_data: 'ds' }],
            [{ text: 'Калькулятор стоимости 📱', callback_data: 'sd' }],
            [{ text: 'Отследить товар 🔎', callback_data: 'sd' }],
            [{ text: 'Отзывы ⭐', callback_data: 'f' }],
        ],
    },
    parse_mode: 'HTML',
};
const cartOptions = {
    reply_markup: {
        inline_keyboard: [
            [{ text: 'Оформить заказ 💶', callback_data: 's' }],
            [{ text: 'Корзина 🛒', callback_data: 'a' }],
            [{ text: 'Написать менеджеру ❔', callback_data: 's' }],
            [{ text: 'Главная 🔙', callback_data: 'menu' }],
        ],
    },
    parse_mode: 'HTML',
};

function getUserCart(msg) {
    console.log(msg)
    fetch('http://localhost:3000/cart/tg', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": ''
        },
        body: JSON.stringify({
            'tg': 'sdsfd',
        })
    })
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((res) => {
            cart = res.data
            if (cart.length != 0) {
                bot.sendMessage(msg.chat.id, helloCartMessageText, cartOptions);
            } else {
                bot.sendMessage(msg.chat.id, helloMessageText, menuOptinos);
            }
        })
        .catch((err) => {
            console.log(err)
        })
}

bot.onText(/\/start/, (msg) => {
    getUserCart(msg)
});

bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;
    switch (data) {
        case 'btn1':
            count = 0
            bot.sendMessage(chatId, '✏️ Напиши стоимость в юанях (¥) ✏️', {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Назад 🔙', callback_data: 'back' }],
                    ],
                },
            });
            bot.once('message', (msg) => {
                const number = parseInt(msg.text);
                if (isNaN(number)) {
                    bot.sendMessage(chatId, '❌ Вы ввели некорректное число. ❌\nПопробуйте еще раз.', {
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: 'Еще раз ↪️', callback_data: 'btn1' }],
                                [{ text: 'Назад 🔙', callback_data: 'back' }],
                            ],
                        },
                        parse_mode: 'HTML',
                    });
                } else {
                    const result = Math.floor(number * 13.2 * 1.08 + 500);
                    bot.sendMessage(chatId, `✅ *Итоговая стоимость с доставкой до склада в Москве: ${result}₽* ✅\n\n_Доставка в регионы считается отдельно и стоит 300₽_`, {
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: 'Рассчитать еще раз ↪️', callback_data: 'btn1' }],
                                [{ text: 'Назад 🔙', callback_data: 'back' }],
                            ],
                        },
                        parse_mode: 'MarkdownV2',
                    });
                }
            });
            break;
        case 'btn2':
            count = 0
            bot.sendMessage(chatId, '🔎 Напиши номер заказа. 🔎', {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Назад 🔙', callback_data: 'back' }],
                    ],
                },
            });
            bot.once('message', (msg) => {
                const number = msg.text;
                if (number.length != 10 || number.split('')[0] != 'M') {
                    bot.sendMessage(chatId, '❌ Некорректный номер. ❌\nПопробуйте еще раз.', {
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: 'Еще раз ↪️', callback_data: 'btn2' }],
                                [{ text: 'Назад 🔙', callback_data: 'back' }],
                            ],
                        },
                        parse_mode: 'HTML',
                    });
                } else {
                    bot.sendMessage(chatId, `✅ Статус Вашего заказа:* сортировка на складе в Китае* ✅\n\n_Примерно 10 января посылка приедет в Москву_`, {
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: 'Отследить другой заказ ↪️', callback_data: 'btn2' }],
                                [{ text: 'Назад 🔙', callback_data: 'back' }],
                            ],
                        },
                        parse_mode: 'MarkdownV2',
                    });
                }
            });
            break;
        case 'btn3':
            count < textRevs.length
                ? bot.sendPhoto(chatId, imgRevs[count], {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: 'Еще отзывы ↪️', callback_data: 'btn3' }],
                            [{ text: 'Назад 🔙', callback_data: 'back' }],
                        ],
                    },
                    parse_mode: 'MarkdownV2',
                }) && bot.sendMessage(chatId, textRevs[count], { parse_mode: 'MarkdownV2' }) && count++
                : bot.sendMessage(chatId, `✅ *Больше отзывов в нашем тг канале @mokwar* ✅`, {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: 'Назад 🔙', callback_data: 'back' }],
                        ],
                    },
                    parse_mode: 'MarkdownV2',
                });

            break;
        case 'menu':
            count = 0
            bot.sendMessage(chatId, menuMessageText, menuOptinos);
            break;
    }
});