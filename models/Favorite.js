const mongoose = require('mongoose');
const { Schema } = mongoose;

// User Schema
const favoriteSchema = new Schema({
    businessId:{
        type: String,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    businessType:{
        type: String,
    },
    name: {
        type: String
    }
})git add .

const Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorite;