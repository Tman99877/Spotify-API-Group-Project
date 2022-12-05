var express = require("express");
var app = express();
const queryString = require("node:querystring");
const axios = require("axios");

app.use('/static',express.static('public'));
app.set("view engine","ejs");

const REDIRECT_URI_DECODED = "https%3A%2F%2Fsenioerproject.onrender.com";
const BASE64_AUTHORIZATION = "NzU0OWQ4N2NmODQxNGZiZGJmNzk1NWIxODU2ZjAyMzk6YzdlNWZmMWU3ODcyNGM0NjlkZDI3MWM3YzY4ZDY0NTE=";

app.listen(3000,function(){
    console.log('App listening on port 3000');
  })

app.get("/", (req, res) => {
    res.render('frontpage.ejs');
});

app.get("/index", async (req, res) => {
    console.log("spotify response code is " + req.query.code);
    res.render("index.ejs");
    // console.log(REDIRECT_URI_DECODED);

    const spotifyResponse = await axios.post(
        "https://accounts.spotify.com/api/token",
        queryString.stringify({
          grant_type: "authorization_code",
          code: req.query.code,
          redirect_uri: REDIRECT_URI_DECODED,
        }),
        {
          headers: {
            Authorization: "Basic " + BASE64_AUTHORIZATION,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    
    console.log(spotifyResponse.data);
  });