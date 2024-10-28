require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const publicRoutes = require('./routes/public')
const protectedRoutes = require('./routes/protected')

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(( req, res, next ) => {
    console.log(req.path, req.method)
    next();
})

app.use('/api', publicRoutes);
app.use('/api/protected', protectedRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch(err => {
        console.log(err)
    })