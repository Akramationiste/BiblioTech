const mongoose = require('mongoose');

const  catégorieSchema = new mongoose.Schema({
    nom_cat: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('catégorie', catégorieSchema);