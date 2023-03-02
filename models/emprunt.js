const mongoose = require('mongoose');

const empruntSchema = new mongoose.Schema({
    nom_utilisateur: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "utilisateur"
    },
    titre_livre: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "livre"
    }
});


module.exports = mongoose.model('emprunt', empruntSchema);