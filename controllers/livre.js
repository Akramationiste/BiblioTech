const Livre = require('../models/livre');
const Categorie = require('../models/categorie');
const categorie = require('../models/categorie');

// functions : livres

// async function ajouterLivre(req, res){
//     let livre = new Livre({
//         titre: req.body.titre,
//         auteur: req.body.auteur,
//         edition: req.body.edition,
//         annee: req.body.annee,
//         nom_cat: req.body.nom_cat,
//         nbr_emprunt: req.body.nbr_emprunt
//     });
//     try {
//         const nouveauLivre = await livre.save(); 
//         res.status(201).json(nouveauLivre); 
        
//         const categorieModifiee = await Categorie.findOneAndUpdate(
//             { nom_cat: req.body.nom_cat },
//             { $inc: { nbr_livres: 1 } }
//         );
//     } catch (err) {
//         res.status(400).json({ message: err.message }); 
//     };
// };



async function  ajouterLivre (req, res) {
  const categorie = req.body.categorie
  try {
      const nv_livre = new Livre({
        titre: req.body.titre,
        auteur: req.body.auteur,
        edition: req.body.edition,
        annee: req.body.annee,
        nom_cat: req.body.nom_cat,
        nbr_emprunt: req.body.nbr_emprunt
      });

      const categorieModifiee = await Categorie.findOne({
          name: categorie,
          $inc: {nbr_livres: 1}
      });
      await categorieModifiee.save();
      await nv_livre.save()
      res.send(nbr_livres);
  }
  catch (err) {
      console.log(err);
  }
};



async function afficherLivre(req, res){
    let livre
    try{
        livre = await Livre.findById(req.params.id)
        if (livre == null) {
            return res.status(404).json({ message: 'Livre non trouvé' });
        }
        res.json(livre);
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
};

async function afficherTousLivres(req, res){
    try {
        const livres = await Livre.find();
        res.json(livres);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

async function supprimerLivre(req, res){
    let livreSupprime 
    try {
        livreSupprime = await Livre.findByIdAndRemove(req.params.id); 
        if (livreSupprime) {
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
