// app.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const eventsRouter = require('./events');
const db = require('./db');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

app.use('/events', eventsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
