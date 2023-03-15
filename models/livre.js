const mongoose = require('mongoose');

const LivreSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true
    },
    auteur: {
        type: String,
        required: true
    },
    edition: {
        type: String,
        required: true
    },
    annee: {
        type: Number,
        required: true
    },
    note: {
        type: Number,
        required: true
    },
    cat_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "categorie",
        required : true
    },
    nbr_emprunt:{
      type:Number,
      default:0
    }
});


module.exports = mongoose.model('livre', LivreSchema);