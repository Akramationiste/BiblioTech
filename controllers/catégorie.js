const Catégorie = require('../models/catégorie');




// functions : catégories

async function ajouterCatégorie(req, res){
    let catégorie = new Catégorie({
        nom_cat: req.body.nom_cat,
    });
    try {
      const nouvelleCatégorie = await catégorie.save(); 
      res.status(201).json(nouvelleCatégorie); 
    } catch (err) {
      res.status(400).json({ message: err.message }); 
    };
};


async function afficherCatégorie(req, res){
    let catégorie
    try{
        catégorie = await catégorie.findById(req.params.id)
        if (catégorie == null) {
            return res.status(404).json({ message: err.message});
        }
    } catch (err) {
        return res.status(500).json({ message: err.message})
    }

};


async function afficherToutesCat(req, res){
    let catégories
    try {
        const catégories = await catégorie.find();
        res.json(catégories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

};

async function supprimerCatégorie(req, res){
    let catégorieSupprimée 
    try {
        catégorieSupprimée = await Catégorie.findByIdAndRemove(req.params.id); 
      if (catégorieSupprimée) {
        res.json({ message: 'catégorie supprimée avec succès' }); 
      } else {
        res.status(404).json({ message: 'catégorie non trouvée' }); 
      }
    } catch (err) {
      res.status(500).json({ message: err.message }); 
    };
}
    async function modifierCatégorie(req, res){
        try {
            const catégorieModifiée = await Catégorie.findByIdAndUpdate(req.params.id, req.body);
            res.json(catégorieModifiée);
        } catch (err) {
            res.status(400).json({ message: err.message});
        }; 
    };


    module.exports = {
        ajouterCatégorie,
        afficherCatégorie,
        afficherToutesCat,
        supprimerCatégorie,
        modifierCatégorie
           };