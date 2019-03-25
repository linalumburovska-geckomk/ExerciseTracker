const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    description: String,
    duration: String,
    date: Date,
    fromToDate: String,
    limitOptions: Number
});


const ModelClass = mongoose.model('userSchema', userSchema);

module.exports = ModelClass;