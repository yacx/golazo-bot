'use strict';

const Script = require('smooch-bot').Script;

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say('Just a second...'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot.say('Hi! Ich helfe dir, das Spiel nicht zu verpassen!')
                .then(() => 'askIntention');
        }
    },

    askIntention: {
        prompt: (bot) => bot.say('Was möchtest Du schauen?'),
        receive: (bot, message) => {
            const answer = message.text;
            return bot.setProp('match', answer)
                .then(() => bot.say(`Cool! Du kannst ${match} hier sehen: %[Intertank](postback:intertank) %[Milchbar](postback:milchbar)`))
                .then(() => 'finish');
        }
    },

    finish: {
        receive: (bot, message) => {
            return bot.getProp('match')
                .then((name) => bot.say('Sorry habe keine Locations gefunden'))
                .then(() => 'finish');
        }
    }
});
