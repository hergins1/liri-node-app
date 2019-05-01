require("dotenv").config();
const fs = require("fs");
const axios = require("axios");
const keys = require("./keys.js");
const moment = require("moment");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

let command = process.argv[2];
let searchTerm = process.argv.slice(3).join(" ");

function concertThis() {
    const queryUrl = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp";
    axios
        .get(queryUrl)
        .then(function (response) {
            const returnData = response.data[0];
            console.log("Event Time & Date: " + moment(returnData.datetime).format('MMMM Do YYYY, h:mm:ss a'));
            console.log("Venue Name: " + returnData.venue.name);
            console.log("Venue City: " + returnData.venue.city);
        })

};

function movieThis() {
    const movieUrl = "http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy";

    axios
        .get(movieUrl)
        .then(function (response) {
            console.log("Movie Title: " + response.data.Title);
            console.log("Movie Release Year: " + response.data.Year);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1]);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Country Released" + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        })
};

function spotifyThis() {
    if (!searchTerm) {
        searchTerm = "The Sign";
    }
        spotify
            .search({
                type: "track", query: searchTerm
            })
            .then(function (response) {
                console.log("Song Artist: " + response.tracks.items[0].artists[0].name);
                console.log("Album Name: " + response.tracks.items[0].album.name);
                console.log("Song Name: " + response.tracks.items[0].name);
                console.log("Song Preview: " + response.tracks.items[0].preview_url);
            })
};

function runCommand(){

switch (command) {
    case "concert-this":
        concertThis()
        break;
    case "spotify-this-song":
        spotifyThis()
        break;
    case "movie-this":
        movieThis()
        break;
    case "do-what-it-says":
        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }
            const dataArr = data.split(",");
            console.log(dataArr[1]);
            command = dataArr[0];
            searchTerm = dataArr[1];
            runCommand();
        })
        break;
    default:
        console.log("Does not compute!");
};
}
runCommand();