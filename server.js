const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const path = require('path');

const app = express();

// bodyParser Middleware
app.use(express.json());

const db = config.get("mongoURI");

mongoose.connect(db, {useUnifiedTopology: true, useNewUrlParser:true})
        .then(() => console.log("MongoDB Database is Connected With jenkin server now..."))
        .catch(err => console.log(err));

// Use Routes
app.use('/api/items',require('./routes/api/items'));

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
        // Set static folder
        app.use(express.static('client/build'));
    
        app.get('*', (req,res) => {
            res.sendFile(path.resolve(__dirname, 'client','build','index.html'));
        });
    }

const port = process.env.PORT || 5000;

app.listen(port,() => console.log(`Server is being started At Port ${port}`));
