'use strict';
module.change_code = 1;
var _ = require('lodash');
var Alexa = require('alexa-sdk');
var TwitterHelper = require('./twitter_helper');
var APP_ID = undefined;

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('HomeIntent');
    },
    'HomeIntent': function () {
      var twitterHelper = new TwitterHelper(this.context.user.accessToken);

      var home = [
        '後藤さんは最近良くやってる',
        '最近の後藤さんは実にやっていきがありますね',
        'あの時の後藤さんは、今の僕でも超えるのは難しいでしょうね',
        '後藤さんが後藤さんである所以わかります？',
      ];

      twitterHelper.postTweet(home[Math.floor(Math.random() * home.length)])
        .then(() => {
            this.emit(':tell', '後藤さんを適当に褒めときました');
        })
        .catch((err) => {
            this.context.done(err);
        });
    }
};
