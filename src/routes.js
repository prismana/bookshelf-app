import express from 'express';
import getBooks from './controller.js';

const route = express.Router();

// Tes
route.get('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'Hello Bookshelf App'
    })
})

// tes get books
route.get('/books', getBooks);


export default route;