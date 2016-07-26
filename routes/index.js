var express = require('express');
var router = express.Router();
var request = require('request');
var FeedParser = require('feedparser');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/craiglist', function (reqParent, resParent, next) {
    var distance = 50,
        zipcode = 53186,
        items = [],
        query = 'bikes';
    console.log('Querying Craiglist');

    var feedparser = new FeedParser();

    req = request({
        url: 'https://milwaukee.craigslist.org/search/sss',
        qs: {
            query: query,
            srcType: 'T',
            postedToday: 1,
            search_distance: distance,
            postal: zipcode,
            format: 'rss'
        }
    });

    req.on('response', function (res) {
        var stream = this;
        if (res.statusCode !== 200)
            throw new Error('Bad status code');

        stream.pipe(feedparser);
    });

    feedparser.on('error', function (error) {
        console.log(error);
    });

    feedparser.on('readable', function () {
        // This is where the action is!
        var stream = this,
            item;

        while (item = stream.read()) {
            items.push(item.title);
            console.log(item.title);
        }
    });

    feedparser.on('end', function () {
        resParent.send(items);
    });
});

module.exports = router;
