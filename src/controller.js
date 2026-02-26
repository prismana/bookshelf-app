import books from './books.js';

const getBooks = (req, res) => {
    res.json({
        status:'sucess',
        data: { books }
    });
}

export default getBooks;