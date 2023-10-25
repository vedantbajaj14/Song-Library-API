// test/test-post.js

import { test } from 'node:test';
import assert from 'node:assert/strict';

const baseURL = 'http://localhost:3000';

// Sample song data for testing
const newSongData = {
    "title": "testing",
    "artist": "testing",
    "releaseDate": 2000,
    "songReview": "Goated Song",
    "lyrics": "working",
    "genre": "working",
    "album": "working",
    "duration": "2:35"
};

// Credentials for Basic Auth
const username = 'admin';
const password = 'tim-the-goat';

// Base64 encode the username and password for the Authorization header
const base64Credentials = Buffer.from(`${username}:${password}`).toString('base64');
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${base64Credentials}`  // Include the Authorization header};
}

// Testing POST (adding a new song)
test('POST new song works correctly', async () => {
    const response = await fetch(`${baseURL}/songs`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(newSongData)
    });

    const song = await response.json();

    assert.equal(response.status, 200, "Response status should be 200");
    assert.equal(song.title, newSongData.title, "Returned song title should match the posted data");
    assert.equal(song.artist, newSongData.artist, "Returned song artist should match the posted data");
    assert.equal(song.releaseDate, newSongData.releaseDate, "Returned song releaseDate should match the posted data");
    assert.equal(song.songReview, newSongData.songReview, "Returned song songReview should match the posted data");
    assert.equal(song.lyrics, newSongData.lyrics, "Returned lyrics title should match the posted data");
    assert.equal(song.genre, newSongData.genre, "Returned genre title should match the posted data");
    assert.equal(song.album, newSongData.album, "Returned song album should match the posted data");
    assert.equal(song.duration, newSongData.duration, "Returned song duration should match the posted data");
});