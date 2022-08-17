const mongoose = require('mongoose');

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/social_network';

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = mongoose.connection;