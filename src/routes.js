import express from 'express';
import { getBooks, addBook, deleteBookById, getBookById, updateBookById } from './controller.js';

const route = express.Router();

// Dapatkan semua book
route.get('/books', getBooks);

// Dapatkan book berdasarkan id
route.get('/books/:id', getBookById);

// Tes get all books
route.post('/books', addBook);

// Post book
route.post('/books', addBook);

// Update informasi book
route.put('/books/:id', updateBookById);

// Hapus book
route.delete('/books/:id', deleteBookById);


export default route;