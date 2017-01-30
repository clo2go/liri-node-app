var Twitter = require('twitter');
var fs = require('fs');
var request = require('request');
var spotify = require('spotify');
var keys = require('./keys.js')



var getMyTweets = function() {
	var clo2gokeys = new Twitter(keys.twitterKeys);

	var  clo2gotweets= {screen_name: 'clo2go'};
	clo2gokeys.get('statuses/user_timeline', clo2gotweets, function(error, tweets, response) {
		if (!error) {
			// console.log(tweet);  // Tweet body.
  	// 		console.log(response);  // Raw response object.
			for (var i = 0; i < 20; i++) {
				console.log(tweets[i].created_at);
				console.log('');
				console.log(tweets[i].text);
			}
		}
	});
}


var doThis = function(caseData, functionData){
	switch(caseData) {
	    case 'my-tweets':
	        getMyTweets();
	        break;
	    case 'spotify-this-song':
	        getMeSpotify(functionData);
	        break;
	    case 'movie-this':
	    	getMeMovie(functionData);
	    	break;
	    case 'do-what-it-says':
	    	doWhatItSays();
	    	break;
	    default:
	        console.log('LIRI doesn\'t know that');
	}
}



var heyliri = function(argOne, argTwo){
	doThis(argOne, argTwo);
};

heyliri(process.argv[2], process.argv[3]);


