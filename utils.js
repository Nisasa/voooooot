const BotUtils = {
    getClientInfo: function (ctx) {
        return {
            firstName: ctx.from.first_name,
            userName: ctx.from.username,
            telegramId: ctx.message.chat.id
        };
    },

    getLastMessageText: function (ctx) {
        return ctx.message.text;
    },

    buildDefaultButton: function (text, callback_data) {
        return [{
            text: text,
            callback_data: callback_data
        }]
    },

    buildUrlButton : function (text, url) {
        return [{
            text: text,
            url: url
        }]
    },

    buildShareButton: function (text, shareUrl) {
        return [{
            text: text,
            url: 'https://telegram.me/share/url?url=' + shareUrl
        }]
    },

    buildMessageOptions: function (buttons) {
        return {
            parse_mode: "HTML",
            disable_web_page_preview: false,
            reply_markup : JSON.stringify({
                inline_keyboard: buttons
            })
        }
    },

    buildMessageOptionsForVoting: function () {
        return {
            parse_mode: "HTML",
            disable_web_page_preview: false,
            reply_markup : JSON.stringify({
                inline_keyboard: [
                    [{ text: 'Да', callback_data: 'yes' }, { text: 'Нет', callback_data: 'no'}]
                ]
            })
        };
    }
};

module.exports = BotUtils;