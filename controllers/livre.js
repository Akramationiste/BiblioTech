const Livre = require('../models/livre');



// functions : livres

async function ajouterLivre(req, res){
    let livre = new Livre({
        titre: req.body.titre,
        auteur: req.body.auteur,
        édition: req.body.édition,
        année: req.body.année,
        nom_cat: req.body.catégorie,
    });
    try {
      const nouveauLivre = await livre.save(); 
      res.status(201).json(nouveauLivre); 
    } catch (err) {
      res.status(400).json({ message: err.message }); 
    };

};


async function afficherLivre(req, res){
    let livre
    try{
        livre = await Livre.findById(req.params.id)
        if (livre == null) {
            return res.status(404).json({ message: err.message});
        }
    } catch (err) {
        return res.status(500).json({ message: err.message})
    }

};


async function afficherTousLivres(req, res){
    let livres
    try {
        const livres = await livre.find();
        res.json(livres);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

};

async function supprimerLivre(req, res){
    let livreSupprimé 
    try {
        livreSupprimé = await livre.findByIdAndRemove(req.params.id); 
      if (livreSupprimé) {
        res.json({ message: 'livre supprimé avec succès' }); 
      } else {
        res.status(404).json({ message: 'livre non trouvé' }); 
      }
    } catch (err) {
      res.status(500).json({ message: err.message }); 
    };
}



module.exports = {
    ajouterLivre,
    afficherLivre,
    afficherTousLivres,
    supprimerLivre
       };