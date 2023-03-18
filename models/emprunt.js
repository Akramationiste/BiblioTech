const mongoose = require('mongoose');

const EmpruntSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "utilisateur",
        required : true
    },
    livre_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "livre",
        required : true
    },
    date_emprunt: {
        type : Date,
        required : true
    },
    date_retour: {
        type : Date,

    },
    jours: {
        type : Number,
        required : true
    }
});


module.exports = mongoose.model('emprunt', EmpruntSchema);