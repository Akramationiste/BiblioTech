const Categorie = require('../models/categorie');

// functions : catégories

async function ajouterCategorie(req, res) {
  let categorie = new Categorie({
    nom_cat: req.body.nom_cat,
    nbr_livres: req.body.nbr_livres,
  });
  try {
    const nouvelleCategorie = await categorie.save();
    res.status(201).json();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


async function afficherCategorie(req, res) {
  try {
    const categorie = await Categorie.findById(req.params.id);
    if (!categorie) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }
    res.json(categorie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


async function afficherToutesCat(req, res) {
  try {
    const categories = await Categorie.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


async function supprimerCategorie(req, res) {
  try {
    const categorieSupprimee = await Categorie.findByIdAndRemove(req.params.id);
    if (categorieSupprimee) {
      res.json({ message: 'Catégorie supprimée avec succès' });
    } else {
      res.status(404).json({ message: 'Catégorie non trouvée' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


async function modifierCategorie(req, res) {
  try {
    const categorieModifiee = await Categorie.findByIdAndUpdate(req.params.id, {
      nom_cat: req.body.nom_cat,
      nbr_livres: req.body.nbr_livres
    }, { new: true });
    res.json(categorieModifiee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}


module.exports = {
  ajouterCategorie,
  afficherCategorie,
  afficherToutesCat,
  supprimerCategorie,
  modifierCategorie
};
