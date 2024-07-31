const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "tracks_database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.1 HW2" });
});

// YOUR ENDPOINTS GO HERE

//1
const fetchAllTracks = async () => {
  let query = 'SELECT * FROM tracks';
  let response = await db.all(query, []);
  return { tracks: response }  
}
app.get('/tracks', async (req, res) => {
  let results = await fetchAllTracks();
  res.status(200).json(results);
});
//tracks

//2
async function fetchTracksByArtist(artist) {
  let query = 'select * from tracks where artist = ?';
  let response = await db.all(query, [artist]);
  return { tracks: response };
}
app.get('/tracks/artist/:artist', async (req, res) => {
  let artist = req.params.artist;
  let results = await fetchTracksByArtist(artist);
  res.status(200).json(results);
});
//tracks/artist/Arijit%20Singh

//3
async function fetchTracksByGenre(genre) {
  let query = 'select * from tracks where genre = ?';
  let response = await db.all(query, [genre]);
  return { tracks: response };
}
app.get('/tracks/genre/:genre', async (req, res) => {
  let genre = req.params.genre;
  let results = await fetchTracksByGenre(genre);
  res.status(200).json(results);
});
//tracks/genre/Romantic

//4
async function fetchTracksByReleaseYear(year) {
  let query = 'select * from tracks where release_year = ?';
  let response = await db.all(query, [year]);
  return { tracks: response };
}
app.get('/tracks/release_Year/:year', async (req, res) => {
  let year = req.params.year;
  let results = await fetchTracksByReleaseYear(year);
  res.status(200).json(results);
});
//tracks/release_year/2019

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});