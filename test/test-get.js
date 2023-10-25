// // test/test-get.js

// import { test } from 'node:test';
// import assert from 'node:assert/strict';

// const baseURL = 'http://localhost:3000';

// // Testing GET all songs
// test('GET all songs works correctly', async () => {
//     const response = await fetch(`${baseURL}/songs`);
//     const songs = await response.json();

//     assert.equal(response.status, 200, "Response status should be 200");
//     assert.ok(Array.isArray(songs), "Response should be an array");
//     assert.ok(songs.length > 0, "Response array should not be empty");
// });

// // Testing GET song by ID
// test('GET song by ID works correctly', async () => {
//     const songId = 1;  
//     const response = await fetch(`${baseURL}/songs?id=${songId}`);
//     const song = await response.json();

//     assert.equal(response.status, 200, "Response status should be 200");
//     assert.equal(song.songID, songId, `Song ID should be ${songId}`);
// });

// // Testing GET song by non-existent ID
// test('GET song by non-existent ID returns 404', async () => {
//     const invalidId = 9999; // ID that doesn't exist
//     const response = await fetch(`${baseURL}/songs?id=${invalidId}`);

//     assert.equal(response.status, 404, "Response status should be 404");
// });

// // Testing GET songs by title
// test('GET songs by title works correctly', async () => {
//     const title = 'one dance';  
//     const response = await fetch(`${baseURL}/songs?title=${encodeURIComponent(title)}`);
//     const songs = await response.json();

//     assert.equal(response.status, 200, "Response status should be 200");
//     assert.ok(songs.title, title, `At least one song should have the title "${title}"`);
// });

// // Testing GET songs by invalid title
// test('GET songs by invalid title returns 404', async () => {
//     const title = 123; // Invalid title (non-string)
//     const response = await fetch(`${baseURL}/songs?title=${encodeURIComponent(title)}`);

//     assert.equal(response.status, 404, "Response status should be 404");
// });

// // Testing GET songs by artist
// test('GET songs by artist works correctly', async () => {
//     const artist = 'drake';  // Use a real artist name from your database
//     const response = await fetch(`${baseURL}/songs?artist=${encodeURIComponent(artist)}`);
//     const songs = await response.json();

//     assert.equal(response.status, 200, "Response status should be 200");
//     assert.ok(songs.every(song => song.artist === artist), `All songs should be by ${artist}`);
// });

// // Testing GET songs by invalid artist
// test('GET songs by invalid artist returns 404', async () => {
//     const artist = 0; // Invalid artist (non-string)
//     const response = await fetch(`${baseURL}/songs?artist=${artist}`);

//     assert.equal(response.status, 404, "Response status should be 404");
// });

// // Testing GET songs by genre
// test('GET songs by genre works correctly', async () => {
//     const genre = 'rock';  
//     const response = await fetch(`${baseURL}/songs?genre=${encodeURIComponent(genre)}`);
//     const songs = await response.json();

//     assert.equal(response.status, 200, "Response status should be 200");
//     assert.ok(songs.every(song => song.genre === genre), `All songs should be of genre ${genre}`);
// });

// // Testing GET songs by invalid genre
// test('GET songs by invalid genre returns 404', async () => {
//     const genre = 123; // Invalid genre (non-string)
//     const response = await fetch(`${baseURL}/songs?genre=${encodeURIComponent(genre)}`);

//     assert.equal(response.status, 404, "Response status should be 404");
// });

// // Testing GET songs by album
// test('GET songs by album works correctly', async () => {
//     const album = 'views';
//     const response = await fetch(`${baseURL}/songs?album=${encodeURIComponent(album)}`);
//     const songs = await response.json();

//     assert.equal(response.status, 200, "Response status should be 200");
//     assert.ok(songs.every(song => song.album === album), `All songs should be from album ${album}`);
// });

// // Testing GET songs by invalid album
// test('GET songs by invalid album returns 404', async () => {
//     const album = 123; // Invalid album (non-string)
//     const response = await fetch(`${baseURL}/songs?album=${encodeURIComponent(album)}`);

//     assert.equal(response.status, 404, "Response status should be 400");
// });

// // Testing GET songs by release date
// test('GET songs by release date works correctly', async () => {
//     const releaseDate = 2015;
//     const response = await fetch(`${baseURL}/songs?releaseDate=${encodeURIComponent(releaseDate)}`);
//     const songs = await response.json();

//     assert.equal(response.status, 200, "Response status should be 200");
//     assert.ok(songs.every(song => song.releaseDate === releaseDate), `All songs should be released in ${releaseDate}`);
// });

// // Testing GET songs by invalid release date
// test('GET songs by invalid release date returns 404', async () => {
//     const releaseDate = 'invalid-date'; // Invalid release date
//     const response = await fetch(`${baseURL}/songs?releaseDate=${encodeURIComponent(releaseDate)}`);

//     assert.equal(response.status, 404, "Response status should be 400");
// });
