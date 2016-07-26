var request = require('request');
var FeedParser = require('feedparser');

var FeedParser = require('feedparser')
        , request = require('request');

var req = request('https://milwaukee.craigslist.org/search/sss?query=bike&sort=rel&srchType=T&postedToday=1&search_distance=50&postal=53186&format=rss')
        , feedparser = new FeedParser();

req.on('error', function (error) {
    // handle any request errors
});

req.on('response', function (res) {
    var stream = this;

    if (res.statusCode !== 200)
        return this.emit('error', new Error('Bad status code'));

    stream.pipe(feedparser);
});


feedparser.on('error', function (error) {
    // always handle errors
});

feedparser.on('readable', function () {
    // This is where the action is!
    var stream = this,
            meta = this.meta,
            item;

    while (item = stream.read()) {
        console.log(item.title);
    }
});