const Commentaire = require('../models/commentaire');
const Reponse = require('../models/reponse');




async function ajouterReponse(user_id, livre_id, comment_id, reponse) {
  try {
    const commentaireExiste = await Commentaire.exists({ _id: comment_id, livre_id, user_id });
    if (!commentaireExiste) {
      throw new Error('Commentaire invalide');
    }

    const nouvelleReponse = new Reponse({ comment_id, reponse });
    await nouvelleReponse.save();

    return nouvelleReponse;
  } catch (err) {
    console.error(err);
    throw new Error('Impossible d\'ajouter la réponse');
  }
}




async function afficherReponse(req, res){
    let reponse
    try{
        reponse = await Reponse.findById(req.params.id)
        if (reponse == null) {
            return res.status(404).json({ message: 'Réponse non trouvé' });
        }
        res.json(reponse);
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
};



async function supprimerReponse(req, res){
    let reponseSupprimee 
    try {
        reponseSupprimee = await Reponse.findByIdAndRemove(req.params.id); 
        if (reponseSupprimee) {
            res.json({ message: 'reponse supprimée avec succès' }); 
        } else {
            res.status(404).json({ message: 'réponse non trouvée' }); 
        }
    } catch (err) {
        res.status(500).json({ message: err.message }); 
    };
}

async function modifierReponse(req, res) {
    try {
      const reponseModifiee = await Reponse.findByIdAndUpdate(req.params.id, req.body);
      res.json(reponseModifiee);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };


module.exports = {
    afficherReponse,
    ajouterReponse,
    supprimerReponse,
    modifierReponse
};