// // test/test-delete.js

// import { test } from 'node:test';
// import assert from 'node:assert/strict';

// const baseURL = 'http://localhost:3000';

// // Credentials for Basic Auth
// const username = 'admin';
// const password = 'tim-the-goat';

// // Base64 encode the username and password for the Authorization header
// const base64Credentials = Buffer.from(`${username}:${password}`).toString('base64');

// const headers = {
//     'Content-Type': 'application/json',
//     'Authorization': `Basic ${base64Credentials}`  // Include the Authorization header};
// }

// // Testing DELETE (deleting a song)
// test('DELETE song works correctly', async () => {
//     const id = 1697967104488;
//     const response = await fetch(`${baseURL}/songs/${id}`, {
//         method: 'DELETE',
//         headers: headers
//     });

//     const msg = await response.text();

//     assert.equal(response.status, 200, "Response status should be 200");
//     assert.equal(msg, `Song testing with id ${id} deleted!`, "Returned song title should match the posted data");
// });

// // Testing DELETE (deleting a song)
// test('DELETE song works correctly with invalid id', async () => {
//     const id = -1;
//     const response = await fetch(`${baseURL}/songs/${id}`, {
//         method: 'DELETE',
//         headers: headers
//     });

//     const msg = await response.json();

//     assert.equal(response.status, 400, "Response status should be 200");
//     assert.equal(msg.errors[0].msg, `ID must be a valid number greater than 0`, "Returned song title should match the posted data");
// });