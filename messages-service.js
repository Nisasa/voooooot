const users = require('./message-model');
const Logger = require('./logger');

const MessagesService = {
    getByTitle: function (title, callback) {
        Logger.notify('Called MessagesService.getByTitle with title: ' + title + ' ');

        users.findOne({title1: title}, function (err, message) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, message);
            }
        });
    },
    getByTitle1: function (title, callback) {
        Logger.notify('Called MessagesService.getByTitle1 with title: ' + title + ' ');

        users.findOne({title: title}, function (err, message) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, message);
            }
        });
    },
    getByTitle2: function (title, callback) {
        Logger.notify('Called MessagesService.getByTitle1 with title: ' + title + ' ');

        users.findOne({title2: title}, function (err, message) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, message);
            }
        });
    },
    getByTitle3: function (title, callback) {
        Logger.notify('Called MessagesService.getByTitle1 with title: ' + title + ' ');

        users.findOne({title3: title}, function (err, message) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, message);
            }
        });
    },
    getByTitle4: function (title, callback) {
        Logger.notify('Called MessagesService.getByTitle1 with title: ' + title + ' ');

        users.findOne({title4: title}, function (err, message) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, message);
            }
        });
    },
    getByTitle5: function (title, callback) {
        Logger.notify('Called MessagesService.getByTitle1 with title: ' + title + ' ');

        users.findOne({title5: title}, function (err, message) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, message);
            }
        });
    },
    getByTitle6: function (title, callback) {
        Logger.notify('Called MessagesService.getByTitle1 with title: ' + title + ' ');

        users.findOne({title6: title}, function (err, message) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, message);
            }
        });
    },
    getByTitle7: function (title, callback) {
        Logger.notify('Called MessagesService.getByTitle1 with title: ' + title + ' ');

        users.findOne({title7: title}, function (err, message) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, message);
            }
        });
    },
    getByTitle8: function (title, callback) {
        Logger.notify('Called MessagesService.getByTitle1 with title: ' + title + ' ');

        users.findOne({title8: title}, function (err, message) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, message);
            }
        });
    },
    getByTitle9: function (title, callback) {
        Logger.notify('Called MessagesService.getByTitle1 with title: ' + title + ' ');

        users.findOne({title13: title}, function (err, message) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, message);
            }
        });
    },
    getByTitle10: function (title, callback) {
        Logger.notify('Called MessagesService.getByTitle1 with title: ' + title + ' ');

        users.findOne({title11: title}, function (err, message) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, message);
            }
        });
    },
    getByTitle11: function (title, callback) {
        Logger.notify('Called MessagesService.getByTitle1 with title: ' + title + ' ');

        users.findOne({title9: title}, function (err, message) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, message);
            }
        });
    },
    getByTitle12: function (title, callback) {
        Logger.notify('Called MessagesService.getByTitle1 with title: ' + title + ' ');

        users.findOne({title12: title}, function (err, message) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, message);
            }
        });
    },
    getByTitle13: function (title, callback) {
        Logger.notify('Called MessagesService.getByTitle1 with title: ' + title + ' ');

        users.findOne({title14: title}, function (err, ctx) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, ctx);
            }
        });
    },
    getByTitle14: function (title, callback) {
        Logger.notify('Called MessagesService.getByTitle1 with title: ' + title + ' ');

        users.findOne({title15: title}, function (err, ctx) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, ctx);
            }
        });
    },
    getByTitle15: function (title, callback) {
        Logger.notify('Called MessagesService.getByTitle1 with title: ' + title + ' ');

        users.findOne({title16: title}, function (err, ctx) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, ctx);
            }
        });
    },
    getByTitle16: function (title, callback) {
        Logger.notify('Called MessagesService.getByTitle1 with title: ' + title + ' ');

        users.findOne({title17: title}, function (err, ctx) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, ctx);
            }
        });
    },
    getByTitle17: function (title, callback) {
        Logger.notify('Called MessagesService.getByTitle1 with title: ' + title + ' ');

        users.findOne({title18: title}, function (err, ctx) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, ctx);
            }
        });
    },
    getByTitle18: function (title, callback) {
        Logger.notify('Called MessagesService.getByTitle1 with title: ' + title + ' ');

        users.findOne({title19: title}, function (err, ctx) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, ctx);
            }
        });
    },
    getByTitle19: function (title, callback) {
        Logger.notify('Called MessagesService.getByTitle1 with title: ' + title + ' ');

        users.findOne({title20: title}, function (err, ctx) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, ctx);
            }
        });
    },
    getByTitle20: function (title, callback) {
        Logger.notify('Called MessagesService.getByTitle1 with title: ' + title + ' ');

        users.findOne({title21: title}, function (err, ctx) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, ctx);
            }
        });
    },
    getByTitle21: function (title, callback) {
        Logger.notify('Called MessagesService.getByTitle1 with title: ' + title + ' ');

        users.findOne({title22: title}, function (err, ctx) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, ctx);
            }
        });
    },
    getByTitle22: function (title, callback) {
        Logger.notify('Called MessagesService.getByTitle1 with title: ' + title + ' ');

        users.findOne({title23: title}, function (err, ctx) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, ctx);
            }
        });
    },
    getByTitle23: function (title, callback) {
        Logger.notify('Called MessagesService.getByTitle1 with title: ' + title + ' ');

        users.findOne({title24: title}, function (err, ctx) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, ctx);
            }
        });
    },
    getByTitle24: function (title, callback) {
        Logger.notify('Called MessagesService.getByTitle1 with title: ' + title + ' ');

        users.findOne({title25: title}, function (err, ctx) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, ctx);
            }
        });
    },
    getByTitle26: function (title, callback) {
        Logger.notify('Called MessagesService.getByTitle1 with title: ' + title + ' ');

        users.findOne({title26: title}, function (err, ctx) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, ctx);
            }
        });
    },
    getByTitle25: function (title, callback) {
        Logger.notify('Called MessagesService.getByTitle1 with title: ' + title + ' ');

        users.findOne({title10: title}, function (err, ctx) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, ctx);
            }
        });
    },
    getByTitle27: function (title, callback) {
        Logger.notify('Called MessagesService.getByTitle1 with title: ' + title + ' ');

        users.findOne({title27: title}, function (err, ctx) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, ctx);
            }
        });
    },
    getByTitle28: function (title, callback) {
        Logger.notify('Called MessagesService.getByTitle1 with title: ' + title + ' ');

        users.findOne({title28: title}, function (err, ctx) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, ctx);
            }
        });
    },
    getByTitle29: function (title, callback) {
        Logger.notify('Called MessagesService.getByTitle1 with title: ' + title + ' ');

        users.findOne({title29: title}, function (err, ctx) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, ctx);
            }
        });
    },
    getByTitle30: function (title, callback) {
        Logger.notify('Called MessagesService.getByTitle1 with title: ' + title + ' ');

        users.findOne({title30: title}, function (err, ctx) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, ctx);
            }
        });
    },
    getByTitle31: function (title, callback) {
        Logger.notify('Called MessagesService.getByTitle1 with title: ' + title + ' ');

        users.findOne({title31: title}, function (err, ctx) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, ctx);
            }
        });
    },
    getByTitle32: function (title, callback) {
        Logger.notify('Called MessagesService.getByTitle1 with title: ' + title + ' ');

        users.findOne({title32: title}, function (err, ctx) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, ctx);
            }
        });
    },
    getByTitle33: function (title, callback) {
        Logger.notify('Called MessagesService.getByTitle1 with title: ' + title + ' ');

        users.findOne({title33: title}, function (err, ctx) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, ctx);
            }
        });
    },

};

module.exports = MessagesService;