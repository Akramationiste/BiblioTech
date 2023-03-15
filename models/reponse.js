const mongoose = require('mongoose');

const ReponseSchema = new mongoose.Schema({

    comment_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "commentaire",
        required : true
    },
    reponse: {
        type: String,
        required : true
    }
});


module.exports = mongoose.model('reponse', ReponseSchema);