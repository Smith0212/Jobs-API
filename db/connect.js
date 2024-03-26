const mongoose = require('mongoose');

// Set strictQuery option globally
mongoose.set('strictQuery', true);

const connectDB = (url) => {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports = connectDB;
