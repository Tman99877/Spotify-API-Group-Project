var express = require('express');
var app = express();

spotartist = '	https://api.spotify.com/v1/artists/{id}'
authrozationtoken = 'BQBgNwMXjjYRIrisaa6b8fq4Mxk36-QK_xlh5x359_I0hQwUkazaL_n_SmW2_HWUo74W6TAKA4x29m--9Fumu9XhjZPaIMLzy9WNcob7P-GHTXqC5H0gbM7yycRCQbxjmMsddj0BzXkd7GztDlBzPNd3sup4yDsCw_AJnm9m'

app.use('/static',express.static('public'));
app.set("view engine","ejs");

app.get('/', function(req,res){
    
    res.render('index.ejs');
})



app.listen(3000,function(){
    console.log('App listening on port 3000');
  })
  