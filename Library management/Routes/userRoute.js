const express = require('express');
const router = express.Router();

let users = [
    {
        id: 1,
        name: "sridhar",
        email: "sridhar@example.com"
    },
    {
        id: 2,
        name: "selva",
        email: "selva@example.com"
    }
];

router.get('/users', (req, res) => {
    res.json(users);
});

router.get('/users/:id', (req, res) => {
    const {id} = req.params;
    const user = users.find((item) => {
        return item.id == id;
    });
    res.json(user);
});

router.post('/add', (req, res) => {
    const {name, email} = req.body;
    const newUser = {
        id: users.length + 1,
        name,
        email
    };
    users.push(newUser);
    res.json(users);
});

router.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    users = users.filter(item => item.id != id);
    res.json(users);
});

router.put('/replace/:id', (req, res) => {
    const {id} = req.params;
    const {name, email} = req.body;
    const index = users.findIndex((item) => {
        return item.id == id;
    });
    users[index] = {name, email, id: Number(id)};
    res.json(users);
});

module.exports = router;