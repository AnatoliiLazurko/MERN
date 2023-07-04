const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const { PORT, MONGO_URL } = process.env;

const UserRouter = require('./routes/user-router');

mongoose.connect(MONGO_URL)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err))


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.use('/api', UserRouter);

app.listen(PORT, () => {
    console.log('Server is running');
});
