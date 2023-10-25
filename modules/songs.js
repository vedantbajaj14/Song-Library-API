// modules/songs.js
import fs from 'fs';
import logger from '../logger.js';

let songsData = [];

// Load the songs data from the JSON file
try { 
    songsData = JSON.parse(fs.readFileSync('./modules/songs-data.json', 'utf8')).songs;
} catch (err){
    console.error(err);
    console.log("Error loading songs data");
}

/**
 * Writes the current songs data back to the JSON file.
 */
function writeToFile(){
    try {
        fs.writeFileSync('./modules/songs-data.json', JSON.stringify({ "songs": songsData }, null, 4));
    } catch (err){
        console.error(err);
        console.log("Error writing to file");
    }
}

/**
 * Retrieves all songs from the data.
 * @returns {Array} Array of all songs.
 */
function getAllSongs(){
    return songsData;
}

/**
 * Retrieves a song by its ID.
 * @param {number} id - The ID of the song.
 * @returns {Object} The song object if found, otherwise undefined.
 */
function getSongById(id){
    return songsData.find(song => song.songID === id);
}

/**
 * Retrieves a song by its title.
 * @param {string} title - The title of the song.
 * @returns {Object} The song object if found, otherwise undefined.
 */
function getSongByTitle(title){
    return songsData.find(song => song.title === title);
}

/**
 * Retrieves all songs matching a specific artist.
 * @param {string} artist - The artist's name.
 * @returns {Array} Array of songs that match the artist.
 */
function getSongsByArtist(artist){
    return songsData.filter(song => song.artist === artist);
}

/**
 * Retrieves all songs from a specific album.
 * @param {string} album - The album name.
 * @returns {Array} Array of songs that match the album.
 */
function getSongsByAlbum(album){
    return songsData.filter(song => song.album === album);
}

/**
 * Retrieves all songs matching a specific genre.
 * @param {string} genre - The genre of the song.
 * @returns {Array} Array of songs that match the genre.
 */
function getSongsByGenre(genre){
    return songsData.filter(song => song.genre === genre);
}

/**
 * Retrieves all songs released in a specific year.
 * @param {number} year - The year of release.
 * @returns {Array} Array of songs released in that year.
 */
function getSongsByYear(year){
    return songsData.filter(song => song.releaseDate === year);
}

/**
 * Creates a new song entry.
 * @param {Object} body - The song data.
 * @returns {Object} The newly created song object.
 */
function createSong(body){
    logger.debug('Attempting to create a new song with body: ', body);
    const newSong = {
        "songID": uid(),
        "title": body.title || "Unknown Title",
        "artist": body.artist || "Unknown Artist",
        "duration": body.duration || 0,
        "genre": body.genre || "Unknown Genre",
        "album": body.album || "Unknown Album",
        "releaseDate": body.releaseDate || 0,
        "songReview": body.songReview || "Not reviewed yet.",
        "lyrics": body.lyrics || "No lyrics available."
    };
    songsData.push(newSong);
    writeToFile();
    logger.debug(`New song created with ID: ${newSong.songID}`);
    return newSong;
}

/**
 * Updates a song by its ID.
 * @param {number} id - The ID of the song to update.
 * @param {Object} updates - The song data to update.
 * @returns {Object} The updated song object, or null if no song was found.
 */
function updateSongByID(id, updates){
    logger.debug(`Attempting to update song with ID: ${id}`);
    const songIndex = songsData.findIndex(song => song.songID === id);
    if (songIndex === -1){
        logger.debug(`No song found with ID: ${id}`);
        return null;
    }
    const updatedSong = { ...songsData[songIndex], ...updates };
    console.log(updatedSong);
    songsData[songIndex] = updatedSong;
    writeToFile();
    logger.debug(`Song updated with ID: ${id}`, updatedSong);
    return updatedSong;
}

/**
 * Deletes a song by its ID.
 * @param {number} id - The ID of the song to delete.
 * @returns {Object} The deleted song object, or null if no song was found.
 */
function deleteSongByID(id){
    logger.debug(`Attempting to delete song with ID: ${id}`);
    const songIndex = songsData.findIndex(song => song.songID === id);
    if (songIndex === -1){
        logger.debug(`No song found with ID: ${id}`);
        return null;
    }
    const deletedSong = songsData[songIndex];
    songsData.splice(songIndex, 1);
    writeToFile();
    logger.debug(`Song deleted with ID: ${id}`);
    return deletedSong;
}

/**
 * Generates a unique ID.
 * @returns {number} A unique ID.
 */
function uid(){
   return Date.now() + Math.floor(Math.random() * 1000000);
}

export {
    getAllSongs,
    getSongById,
    getSongByTitle,
    getSongsByArtist,
    getSongsByAlbum,
    getSongsByGenre,
    getSongsByYear,
    createSong,
    updateSongByID,
    deleteSongByID
}