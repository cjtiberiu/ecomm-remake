const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();


// App
const app = express();
const port = process.env.PORT || 8000;


// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: '5mb' }));


// Database
mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MONGO DB connection established'))
.catch(error => console.log(`MONGO DB ERROR`, error));


// Routes
fs.readdirSync('./routes').map(route => app.use('/api', require('./routes/' + route)));


app.use(express.static(path.join(__dirname, '/client/build')))
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})


// App init
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

