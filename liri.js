require("dotenv").config();

const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);
const fs = require("fs");
const axios = require("axios");
const nodeArgs = process.argv;
const userInput = "";
nodeArgs.splice(0, 2);

for (const i = 0; i < nodeArgs.length; i++){
    if (i > 0 && i < nodeArgs.length){
        userInput = userInput + "+" + nodeArgs[i];
    }
    else{
        userInput += nodeArgs[i]
    }
}


