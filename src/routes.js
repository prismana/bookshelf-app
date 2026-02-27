import express from 'express';
import {getBooks, addBook, deleteBookById, getBookById, updateBookById} from './controller.js';

const route = express.Router();

// Tes get all books
route.post('/books', addBook);

route.get('/books', getBooks);

// Dapatkan books berdasarkan id
route.get('/books/:id', getBookById);

// Post books
route.post('/books', addBook);

// Update informasi books
route.put('/books/:id', updateBookById);

// Hapus books
route.delete('/books/:id', deleteBookById);


export default route;