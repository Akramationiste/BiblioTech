const Livre = require('../models/livre');
const Categorie = require('../models/categorie');







async function ajouterLivre(req, res) {
  const { titre, auteur, edition, annee, note, cat_id } = req.body;

  try {
    const livre = new Livre({
      titre,
      auteur,
      edition,
      annee,
      note,
      cat_id,
    });

    const categorie = await Categorie.findByIdAndUpdate(
      cat_id,
      { $inc: { nbr_livres: 1 } },
      { new: true }
    );

    await livre.save();

    res.status(201).json({ livre, categorie });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}




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






async function afficherLivreFiltre(req, res) {
  try {
    let filters = {};
    if (req.query.note) {
      filters.note = req.query.note;
    }
    if (req.query.nbr_emprunt) {
      filters.nbr_emprunt = req.query.nbr_emprunt;
    }
    if (req.query.auteur) {
      filters.auteur = req.query.auteur;
    }
    if (req.query.cat_id) {
      filters.cat_id = req.query.cat_id;
    }
    const livres = await Livre.find(filters).populate('cat_id');
    res.status(200).json(livres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}




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
    afficherLivreFiltre,
    afficherLivre,
    afficherTousLivres,
    supprimerLivre
};
