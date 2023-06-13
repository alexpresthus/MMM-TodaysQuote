var NodeHelper = require('node_helper');
var request = require('request');

module.exports = NodeHelper.create({
    start: function () {
        console.log('Starting node helper for: ' + this.name);
    },

    socketNotificationReceived: function (notification, payload) {
        var self = this;
        if (notification === 'GET_QUOTE') {
            self.config = payload.config;
            self.quoteUrl = payload.notionUrl;
            this.getQuote();
        }
    },

    getQuote: function () {
        var self = this;
        var quoteData = {};
        var quoteUrl = this.quoteUrl

        request({ url: quoteUrl, method: 'GET' }, function (error, response, message) {
            if (!error && (response.statusCode == 200 || response.statusCode == 304)) {
                quoteData.quote = JSON.parse(message);
                self.setNextUpdate(response.headers);
            }
            setTimeout(function () { self.getQuote(); }, self.config.updateInterval);
        });
    },
});
