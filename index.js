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
      var twitterHelper = new TwitterHelper(this.event.session.user.accessToken);

      var home = [
        '後藤さんは最近良くやってる',
        '最近の後藤さんは実にやっていきがありますね',
        'あの時の後藤さんは、今の僕でも超えるのは難しいでしょうね',
        '後藤さんが後藤さんである所以わかります？',
        '後藤さんかっこいい！',
        '後藤さんおしゃれ',
        '後藤さん、頼りがいがあるよね！',
        '後藤さん、面白い！楽しい！',
        '後藤さん、頭の回転が速いよね',
        '後藤さん、さすがですね！',
        '後藤さん、いい声してるよね',
        '後藤さん、優しい、心が広い',
        '後藤さん、尊敬する',
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
