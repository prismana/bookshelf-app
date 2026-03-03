import books from './books.js';
import { nanoid } from 'nanoid';

// Get all books
export const getBooks = (req, res) => {
    const formatedBooks = books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
    }));

    return res.status(200).json({
        status: 'success',
        data: { books: formatedBooks }
    });
}


// Get book by id
export const getBookById = (req, res) => {
    const { id } = req.params;

    const book = books.find((n) => n.id === id);

    if (book) {
        return res.status(200).json({
            status: 'success',
            data: { book }
        });
    }

    return res.status(404).json({
        status: 'fail',
        message: 'Buku tidak ditemukan'
    });
}


// Tambah buku baru
export const addBook = (req, res) => {
    const id = nanoid(16);
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body

    // Cek jika nama kosong
    if (!name || name.trim() === '') {
        // Harus return agar jika name benar benar kosong, fungsi tidak terus berjalan dan membuat buku dengan properti name yang kosong
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        });
    }

    // Cek jika page dibaca > total page
    if (readPage > pageCount) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        })
    }
    const finished = readPage === pageCount;
    const insertedAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();
    const book = { id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt };

    // Push book ke books
    books.push(book);

    const isSuccess = books.filter((n) => n.id === id).length > 0;

    if (isSuccess) {
        return res.status(201).json({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId : id
            }
        });
    }

    // Respon gagal
    return res.status(404).json({
        status: 'fail',
        message: 'Gagal menambahkan buku'
    });
}


// Update info buku
export const updateBookById = (req, res) => {
    const { id } = req.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body

    const index = books.findIndex((n) => n.id === id);

    // Validasi cek jika nama kosong
    if (!name || name.trim() === '') {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku'
        });
    }

    // Cek jika page dibaca > total page
    if (readPage > pageCount) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        })
    }

    const finished = readPage === pageCount;
    const updatedAt = new Date().toISOString();



    if (index !== -1) {
        // Update
        books[index] = { ...books[index], name, year, author, summary, publisher, pageCount, readPage, finished, reading, updatedAt };

        // Respon berhasil perbarui buku
        return res.status(200).json({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
    }

    return res.status(404).json({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan'
    })
}


// Hapus buku
export const deleteBookById = (req, res) => {
    const { id } = req.params;

    const index = books.findIndex((n) => n.id === id);

    if (index !== -1 ) {
        books.splice(index, 1);
        return res.status(200).json({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
    }

    return res.status(404).json({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
}