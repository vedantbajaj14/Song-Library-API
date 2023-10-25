// routes/routes.js

import express from 'express';
import { createSong, getAllSongs, getSongById, getSongByTitle, 
        getSongsByAlbum, getSongsByArtist, getSongsByGenre, 
        getSongsByYear, updateSongByID, deleteSongByID } from '../modules/songs.js';
import { home } from '../views/home.js'; 
import { auth } from '../modules/middlewares.js';
import { query, param, body, validationResult } from 'express-validator';
import logger from '../logger.js';

const router = express.Router();

// Route for the home page
router.get('/', (req, res) => {
    home(res);
});

/**
 * Route to GET all songs or a specific song by various parameters.
 * Validates query parameters and returns the requested song data.
 */
router.get('/songs', 
    // Validation rules for query parameters
    [
        query('id').optional().isInt({ min: 1 }).withMessage('ID must be a valid number greater than 0'),
        query('title').optional().isString().withMessage('Title must be a string'),
        query('artist').optional().isString().withMessage('Artist must be a string'),
        query('album').optional().isString().withMessage('Album must be a string'),
        query('genre').optional().isString().withMessage('Genre must be a string'),
        query('releaseDate').optional().isInt({ min: 1900, max: 2100 }).withMessage('Release date must be a valid year'),
    ], 
    (req, res, next) => {
        logger.debug('Processing GET /songs request', { query: req.query });
        try {
            const { id, title, artist, album, genre, releaseDate } = req.query;
            if(id){
                logger.debug('Processing GET /songs request with ID', { id: id });
                const song = getSongById(parseInt(id));
                if (!song) return res.status(404).send('Song not found');
                return res.json(song);
            }
            if(title){
                const song = getSongByTitle(title);
                if (!song) return res.status(404).send('Song not found');
                return res.json(song);
            }
            if(artist){
                const songs = getSongsByArtist(artist);
                if (songs.length === 0) return res.status(404).send('Song not found');
                return res.json(songs);
            }
            if(album){
                const songs = getSongsByAlbum(album);
                if (songs.length === 0) return res.status(404).send('Song not found');
                return res.json(songs);
            }
            if(genre){
                const songs = getSongsByGenre(genre);
                if (songs.length === 0) return res.status(404).send('Song not found');
                return res.json(songs);
            }
            if(releaseDate){
                const songs = getSongsByYear(parseInt(releaseDate));
                if (songs.length === 0) return res.status(404).send('Song not found');
                return res.json(songs);
            }
            // If no specific query parameter is provided, return all songs
            res.json(getAllSongs());
            logger.debug('GET /songs request processed successfully');
        } catch (err) {
            logger.debug('GET /songs request processed successfully');
            next(err);
        }
});

/**
 * Route to POST a new song.
 * Validates the request body and creates a new song entry.
 */
router.post('/songs', 
    auth, // Authentication middleware
    // Validation rules for the request body
    [
        body('title').isString().withMessage('Title must be a string'),
        body('artist').isString().withMessage('Artist must be a string'),
        body('releaseDate').isInt({ min: 1900, max: 2023 }).withMessage('Year must be a valid year'),
        body('album').optional().isString().withMessage('Album must be a string'),
        body('genre').optional().isString().withMessage('Genre must be a string'),
        body('duration').optional().isString().withMessage('Duration must be a string'),
        body('lyrics').optional().isString().withMessage('Lyrics must be a string'),
        body('songReview').optional().isString().withMessage('Song review must be a string'),
    ], 
    (req, res, next) => {
        logger.debug('Processing POST /songs request', { body: req.body });
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            logger.debug('Validation errors in POST /songs request', { errors: errors.array() });
            return res.status(400).json({ errors: errors.array() });
        }

        try{ 
            const newSong = createSong(req.body);
            if (!newSong) return res.status(404).send('Song could not be created.');
            res.status(200).json(newSong);
            logger.debug('POST /songs request processed successfully', { newSong });
        } catch (err) {
            logger.debug('Error processing POST /songs request', { error: err.message });
            next(err);
        }
    }
);

/**
 * Route to PUT (update) an existing song by ID.
 * Validates the request body and updates the song entry.
 */
router.put('/songs/:id', 
    auth,  // Authentication middleware
    // Validation rules for the request body
    [
        body('title').optional().isString().withMessage('Title must be a string'),
        body('artist').optional().isString().withMessage('Artist must be a string'),
        body('releaseDate').optional().isInt({ min: 1900, max: 2023 }).withMessage('Year must be a valid year'),
        body('album').optional().isString().withMessage('Album must be a string'),
        body('genre').optional().isString().withMessage('Genre must be a string'),
        body('duration').optional().isString().withMessage('Duration must be a string'),
        body('lyrics').optional().isString().withMessage('Lyrics must be a string'),
        body('songReview').optional().isString().withMessage('Song review must be a string'),
    ], 
    (req, res, next) => {
        logger.debug('Processing PUT /songs request', { body: req.body });
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            logger.debug('Validation errors in PUT /songs request', { errors: errors.array() });
            return res.status(400).json({ errors: errors.array() });
        }

        try{
            const updatedSong = updateSongByID(parseInt(req.params.id), req.body);
            if (!updatedSong) return res.status(404).send('Song not found, cannot update.');
            res.status(200).json(updatedSong);
            logger.debug('PUT /songs request processed successfully', { updatedSong });
        } catch (err) {
            logger.debug('Error processing PUT /songs request', { error: err.message });
            next(err);
        }
    }
);


/**
 * Route to DELETE a song by ID.
 * Validates the song ID and deletes the song entry.
 */
router.delete('/songs/:id', 
    auth, // Authentication middleware
    // Validation rule for the 'id' parameter
    [
        param('id').isInt({ min: 1 }).withMessage('ID must be a valid number greater than 0')
    ], 
    (req, res, next) => {
        logger.debug('Processing DELETE /songs request', { body: req.body });
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            logger.debug('Validation errors in DELETE /songs request', { errors: errors.array() });
            return res.status(400).json({ errors: errors.array() });
        }

        try{
            const deleteSong = deleteSongByID(parseInt(req.params.id), req.body);
            if (!deleteSong) return res.status(404).send('Song not found, cannot delete.');
            res.status(200).send(`Song ${deleteSong.title} with id ${req.params.id} deleted!`);
            logger.debug('DELETE /songs request processed successfully', { deleteSong });
        } catch (err) {
            logger.debug('Error processing DELETE /songs request', { error: err.message });
            next(err);
        }
    }
);

export default router;