// db.js
const mongoose = require('mongoose');
//change the url by ur mongodbURL
mongoose.connect('mongodb+srv://oubaid:136891@cluster0.a6lzkwg.mongodb.net/studenty', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

module.exports = mongoose;

