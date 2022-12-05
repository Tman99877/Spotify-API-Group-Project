var express = require('express');
var app = express();
var axios = require('axios');
var qs = require('qs');

spotartist = '	https://api.spotify.com/v1/artists/{id}'
authrozationtoken = 'BQBgNwMXjjYRIrisaa6b8fq4Mxk36-QK_xlh5x359_I0hQwUkazaL_n_SmW2_HWUo74W6TAKA4x29m--9Fumu9XhjZPaIMLzy9WNcob7P-GHTXqC5H0gbM7yycRCQbxjmMsddj0BzXkd7GztDlBzPNd3sup4yDsCw_AJnm9m'

app.use('/static',express.static('public'));
app.set("view engine","ejs");

app.get('/', function(req,res){
    
    res.render('index.ejs');
})


//////
var client_id = '8ad5b4e5c3c94d42a0329b08a51e2e46';
var client_secret = '9cfe45d3ee68403f9092ba4ba6f79399';
const auth_token = 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'));

var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')),
        'accept-encoding': '*'
      },
      form: {
        grant_type: 'client_credentials'
      },
      json: true
    };

const getAuth = async () => {
    try{
      //make post request to SPOTIFY API for access token, sending relavent info
      const token_url = 'https://accounts.spotify.com/api/token';
      const data = qs.stringify({'grant_type':'client_credentials'});
  
      const response = await axios.post(token_url, authOptions, {
        headers: { 
          'Authorization': `Basic ${auth_token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          
        }
      })
      //return access token
      //console.log(response.data.access_token);  
      return response.data.access_token;
       
    }catch(error){
      //on fail, log the error in console
      console.log(error);
    }

    
    
}

const search_song = async (name) => {
    //request token using getAuth() function
    const access_token = await getAuth();
    //console.log(access_token);
  
    const api_url = `https://api.spotify.com/v1/search?q=${name}&type=track&access_token=${access_token}`;
    //console.log(api_url);
    try{
      const response = await axios.get(api_url, {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      });
      console.log(response.data);
      return response.data;
    }catch(error){
      console.log("PPPPP");
    }  
};



app.listen(3000,function(){
    console.log('App listening on port 3000');
  })
  
  getAuth()