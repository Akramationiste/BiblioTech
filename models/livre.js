const mongoose = require('mongoose');

const livreSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true
    },
    auteur: {
        type: String,
        required: true
    },
    édition: {
        type: String,
        required: true
    },
    année: {
        type: Number,
        required: true
    },
    nom_cat: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "catégorie"
    }
});


module.exports = mongoose.model('livre', livreSchema);