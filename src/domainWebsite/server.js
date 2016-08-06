const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

var port = process.env.DOMAIN_SERVER_PORT || 8000;
app.listen(port, function(){
  console.log('CORS-enabled web server listening on port '+ port);
});
