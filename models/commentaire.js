const mongoose = require('mongoose');

const CommentaireSchema = new mongoose.Schema({
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
    comment: {
        type: String,
        required : true
    }
});


module.exports = mongoose.model('commentaire', CommentaireSchema);