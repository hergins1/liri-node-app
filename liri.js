require("dotenv").config();
const fs = require("fs");
const axios = require("axios");
const keys = require("./keys.js");
const moment = require("moment");
// const spotify = new Spotify(keys.spotify);

const command = process.argv[2];
const searchTerm = process.argv.slice(3).join(" ");


switch (command){
    case "concert-this" :
        const queryUrl = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp";
            axios
               .get(queryUrl)
                    .then(function(response){
                       const returnData = response.data[0];
                       console.log(moment(returnData.datetime).format('MMMM Do YYYY, h:mm:ss a'));
                        console.log(returnData.venue.name);
                        console.log(returnData.venue.city);                        
                    })
    break;
    case "spotify-this-song":
    break;
    case "movie-this":
    break;
    case "do-what-it-says":
    break;
    default:
        console.log("Does not compute!");
}

