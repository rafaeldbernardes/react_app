const mongoose = require('mongoose').set('debug', true);
mongoose.Promise = global.Promise

module.exports = mongoose.connect('mongodb://localhost/react-app')