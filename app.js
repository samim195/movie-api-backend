const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use(cors());

mongoose.connect("mongodb://localhost:27017/moviedb", { useUnifiedTopology: true, useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
    console.log("Connected to moviedb successfully");
});

const movieSchema = new mongoose.Schema({
    id: Number,
    name: String,
    overview: String,
    poster_src: String,
    popularity: Number,
    voteAverage: Number,
    voteCount: Number,
    firstAirDate: String
});

const Movie = mongoose.model('Movie', movieSchema);

app.get('/addfavourties', function(req, res) {
    console.log('home page');

    // console.log(JSON.stringify(data));
    console.log(__dirname + '/index.html')

    res.sendFile(__dirname + '/index.html')


})

app.post('/addfavourites', function(req, res) {
    // console.log(req.body);
    const data = req.body;
    // console.log(data)
    var {backdrop_path, genre_ids, original_language, first_air_date, name, 
    vote_count, vote_average, original_name, original_country, overview, 
    id, poster_path, popularity, media_type, poster_src} = data 

    movieName = name
    const newMovie = new Movie({
        id: id,
        name: name,
        overview: overview,
        poster_src: poster_src,
        popularity: popularity,
        voteAverage: vote_average,
        voteCount: vote_count,
        firstAirDate: first_air_date
    });

    // newMovie.save(function(err, newMovie) {
    //     if(err) return console.error(err);
    //     console.log("Successfully Saved The Record To The Database")
    // });

    Movie.findOne({name: movieName}, function (err, dbResult){
        console.log(dbResult)
        if (err) {
            console.log(err)
        } else if (dbResult) {
            // console.log(dbResult.name)
            // console.log(movieName)
            console.log("Record already exists in the database");
        } else if (!dbResult) {
            newMovie.save(function(err, newMovie) {
                if(err)  console.error(err);
                console.log("Successfully Saved The Record To The Database")
            });
        }

    })

  });
  

app.listen('3001', function() {
    console.log("app started on port 3001");
});