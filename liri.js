require("dotenv").config();
const fs = require("fs");
const axios = require("axios");
const keys = require("./keys.js");
const moment = require("moment");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

const command = process.argv[2];
const searchTerm = process.argv.slice(3).join(" ");


switch (command) {
    case "concert-this":
        const queryUrl = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp";
        axios
            .get(queryUrl)
            .then(function (response) {
                const returnData = response.data[0];
                console.log(moment(returnData.datetime).format('MMMM Do YYYY, h:mm:ss a'));
                console.log(returnData.venue.name);
                console.log(returnData.venue.city);
            })
        break;
    case "spotify-this-song":
        if (!searchTerm) {
            searchTerm = "The Sign";
        }
        if (searchTerm){
            spotify
                .search({
                    type: "track", query: searchTerm
                })
                .then(function (response) {
                    console.log(response.tracks.items[0].artists[0].name);
                    console.log(response.tracks.items[0].album.name);
                    console.log(response.tracks.items[0].name);
                    console.log(response.tracks.items[0].preview_url);
                })
            }
        break;
    case "movie-this":
        const movieUrl = "http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy";
        
        axios
        .get(movieUrl)
        .then( function(response){
            console.log(response.data.Title);
            console.log(response.data.Year);
            console.log(response.data.Ratings[1]);
            console.log(response.data.imdbRating);
            console.log(response.data.Country);
            console.log(response.data.Language);
            console.log(response.data.Plot);
            console.log(response.data.Actors);
        })
        break;
    case "do-what-it-says":
        fs.readFile("random.txt", "utf8", function(error, data){
            if(error){
                return console.log(error);
            }
            
            const dataArr = data.split(",");
            console.log(dataArr.join(" "))
        })
        break;
    default:
        console.log("Does not compute!");
}