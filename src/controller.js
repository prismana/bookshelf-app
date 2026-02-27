import books from './books.js';
import { nanoid } from 'nanoid';

export const getBooks = (req, res) => {
    res.json({
        status:'sucess',
        data: { books }
    });
}

export const getBookById = (req, res) => {

}


// Post new books
export const addBook = (req, res) => {
    const id = nanoid(16);
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body
    const finished = readPage === pageCount;
    const insertedAt = new Date().toISOString();
    const updatatedAt = new Date().toISOString();
    const book = { id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatatedAt };

    // Push book ke books
    books.push(book);

    const isSuccess = books.filter((n) => n.id === id).length > 0;

    if (isSuccess) {
        res.status(201).json({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                "BookId" : id,
            }
        })
    }

    // Respon gagal jika nama kosong
    if (name === '') {
        res.status(400).json({
            status: 'fail',
            message: 'Gagal menambahkan buku'
        });
    }

}

// Update info buku
export const updateBookById = (req, res) => {
    const { id } = req.params;
}


// Hapus buku
export const deleteBookById = (req, res) => {
    const { id } = req.body;

    const index = books.findIndex((n) => n.id === id);

    if (index === -1 ) {
        books.splice(index, 1);
        res.status(200).json({
            status: 'success',
            message: 'Buku berhasil dihapus',
        })
    }

    res.status(404).json({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    })
}