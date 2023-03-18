const mongoose = require('mongoose');

const UtilisateurSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    age: {
        type:Number,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    adresse: {
      type: String,
      required: true
    },
    nom_user: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["employe", "client"],
        required: true
    }
});


module.exports = mongoose.model('utilisateur', UtilisateurSchema);