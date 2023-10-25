// test/test-put.js

import { test } from 'node:test';
import assert from 'node:assert/strict';

const baseURL = 'http://localhost:3000';

const updatedSongData = {
    album: "update working",
    songReview: "update working"
};

// Credentials for Basic Auth
const username = 'admin';
const password = 'tim-the-goat';

// Base64 encode the username and password for the Authorization header
const base64Credentials = Buffer.from(`${username}:${password}`).toString('base64');
console.log(base64Credentials);

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${base64Credentials}`  // Include the Authorization header};
}

// Testing PUT (updating an existing song)
test('PUT update song works correctly', async () => {
    const songIdToUpdate = 1; 
    const response = await fetch(`${baseURL}/songs/${songIdToUpdate}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(updatedSongData)
    });

    const song = await response.json();

    assert.equal(response.status, 200, "Response status should be 200");
    assert.equal(song.album, updatedSongData.album, "Updated song title should match the updated data");
});

// Testing PUT (updating an existing song)
test('PUT update song works correctly with invalid ID', async () => {
    const songIdToUpdate = -1;
    const response = await fetch(`${baseURL}/songs/${songIdToUpdate}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(updatedSongData)
    });

    assert.equal(response.status, 404, "Response status should be 200");
});
