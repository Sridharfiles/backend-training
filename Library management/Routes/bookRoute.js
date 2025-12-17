const express = require('express');
const router = express.Router();

let books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald"
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee"
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell"
    }
];

router.get('/books', (req, res) => {
    res.json(books);
});

router.get('/books/:id', (req, res) => {
    const {id} = req.params;
    const book = books.find((item) => {
        return item.id == id;
    });
    res.json(book);
});

router.post('/add', (req, res) => {
    const {title, author} = req.body;
    const newBook = {
        id: books.length + 1,
        title,
        author
    };
    books.push(newBook);
    res.json(books);
});

router.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    books = books.filter(item => item.id != id);
    res.json(books);
});

router.put('/replace/:id', (req, res) => {
    const {id} = req.params;
    const {title, author} = req.body;
    const index = books.findIndex((item) => {
        return item.id == id;
    });
    books[index] = {title, author, id: Number(id)};
    res.json(books);
});

module.exports = router;
