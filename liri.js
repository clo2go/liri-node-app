var fs = require('fs');
var keys = require('./keys.js');
var spotify = require('spotify');
var request = require('request');
var Twitter = require('twitter');

var userInput = process.argv[2];
var userInput2 = process.argv[3];

var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});

// Pulls latest 20 tweets
function twitter() {
  console.log("Loading...");
  client.get('statuses/user_timeline', {count: 20}, function(error, tweets, response) {
    if (error) {
      console.log("Oh no! An error has occured: " + error);
    } else {
        console.log("Latest 20 tweets: " + "\n" );
        for (var i = 0; i < tweets.length; i++) {
          console.log("Date: " + tweets[i].created_at);
          console.log("Tweet #" + i + ": " + tweets[i].text);
          console.log("");
        }
      }
  });
}

// Pulls Spotify song information based on song title
function songs(songTitle) {
  songTitle = "seasick yet still docked";
  if (userInput2 !== undefined) {
    songTitle = userInput2;
  }
  console.log("Loading...");
  spotify.search({ type: 'track', query: songTitle, count: 1 }, function(error, data) {
    if (error) {
      console.log("Oh no! An error has occured: " + error);
    } else {
        console.log("----------------------------------------------------------------");
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Spotify Link: " + data.tracks.items[0].external_urls.spotify);
        console.log("Album Name: " + data.tracks.items[0].album.name);
        console.log("----------------------------------------------------------------");
      }
  });
}

// Pulls movie information based on movie title
function movies(movieTitle) {
  movieTitle = "Idiocracy";
  if (userInput2 !== undefined) {
    movieTitle = userInput2;
  }
  console.log("Loading...");
  request('http://www.omdbapi.com/?t=' + movieTitle + "&tomatoes=true", function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var movieInfo = JSON.parse(body);
      console.log("----------------------------------------------------------------");
      console.log("Title: " + movieInfo.Title);
      console.log("Year: " + movieInfo.Year);
      console.log("IMDB Rating: " + movieInfo.imdbRating);
      console.log("Country: " + movieInfo.Country);
      console.log("Language: " + movieInfo.Language);
      console.log("Plot: " + movieInfo.Plot);
      console.log("Actors: " + movieInfo.Actors);
      console.log("Rotten Tomatoes Rating: " + movieInfo.tomatoUserRating);
      console.log("Rotten Tomatoes URL: " + movieInfo.tomatoURL);
      console.log("----------------------------------------------------------------");
    } else {
        console.log("Oh no! An error has occured: " + error);
    }
  });
}

// Takes the text inside of random.txt and uses it to call the first command with the second part as it's parameter
function random() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      console.log("Oh no! An error has occured: " + error);
    } else {
        var textData = data.trim().split(',');
        userInput = textData[0];
        userInput2 = textData[1];
        switch(userInput) {
          case "my-tweets":
            twitter();
            break;
          case 'spotify-this-song':
            songs(userInput2);
            break;
          case 'movie-this':
            movies(userInput2);
            break;
          }
        }
  });
}

// switch case to run functions based on user input
switch(userInput) {
    case "my-tweets":
      twitter();
      break;
    case "spotify-this-song":
      songs(userInput2);
      break;
    case "movie-this":
      movies(userInput2);
      break;
    case "do-what-it-says":
      random();
      break;
}
