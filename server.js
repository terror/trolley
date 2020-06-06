const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const items = require('./routes/api/items');
const path = require('path');
const app = express();
require('dotenv').config();
const key = process.env.mongoURI;

// BP Middleware
app.use(bodyParser.json());

// DB Config
const db = `${key}`;

// Connect to Mongo DB
mongoose
    .connect(db)
    .then(() => console.log('Mongo DB Connected...'))
    .catch((err) => console.log(err));

// Use Routes
app.use('/api/items', items);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// heroku deployment
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
