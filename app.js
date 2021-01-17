const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use(cors());

app.get('/addfavourties', function(req, res) {
    console.log('home page');

    // console.log(JSON.stringify(data));
    console.log(__dirname + '/index.html')

    res.sendFile(__dirname + '/index.html')


})

app.post('/addfavourites', function(req, res) {
    console.log(req.body);
  });
  

app.listen('3001', function() {
    console.log("app started on port 3001");
})