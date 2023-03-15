const Commentaire = require('../models/commentaire');
const Livre = require('../models/livre');
const Utilisateur = require('../models/utilisateur');


async function ajouterCommentaire(user_id, livre_id, comment) {
  const commentaire = new Commentaire({user_id, livre_id, comment});
  await commentaire.save();

  // Supprimer le commentaire si le livre commenté est supprimé

  Livre.findById(livre_id, (err, livre) => {
    if (err) throw err;
    if (!livre) {
      Commentaire.deleteOne({ _id: commentaire._id }, (err) => {
        if (err) throw err;
        console.log(`Commentaire avec l'id ${commentaire._id} supprimé car le livre associé est introuvable`);
      });
    }
  });

  // Supprimer le commentaire si l'utilisateur est supprimé

  Utilisateur.findById(user_id, (err, utilisateur) => {
    if (err) throw err;
    if (!utilisateur) {
      Commentaire.deleteOne({ _id: commentaire._id }, (err) => {
        if (err) throw err;
        console.log(`Commentaire avec l'id ${commentaire._id} supprimé car l'utilisateur associé est introuvable`);
      });
    }
  });
}



////////////afficher un commentaire/////////////////:
async function afficherCommentaire(req, res){
    let commentaire
    try{
        commentaire = await Commentaire.findById(req.params.id)
        if (commentaire == null) {
            return res.status(404).json({ message: 'Commentaire non trouvé' });
        }
        res.json(commentaire);
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
};


async function supprimerCommentaire(req, res){
    let commentaireSupprime 
    try {
        commentaireSupprime = await Commentaire.findByIdAndRemove(req.params.id); 
        if (commentaireSupprime) {
            res.json({ message: 'commentaire supprimé avec succès' }); 
        } else {
            res.status(404).json({ message: 'commentaire non trouvé' }); 
        }
    } catch (err) {
        res.status(500).json({ message: err.message }); 
    };
}



async function modifierCommentaire(req, res) {
    try {
      const commentaireModifie = await Commentaire.findByIdAndUpdate(req.params.id, req.body);
      res.json(commentaireModifie);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };


module.exports = {
    afficherCommentaire,
    ajouterCommentaire,
    supprimerCommentaire,
    modifierCommentaire
};