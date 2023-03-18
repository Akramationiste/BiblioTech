const Livre = require('../models/livre');
const Emprunt = require('../models/emprunt');
const Utilisateur = require("../models/utilisateur");







///////////// CREER EMPRUNT ////////////////////

async function ajouterEmprunt(req, res) {
  try {
    const livre = await Livre.findById(req.body.livre_id);

    if (!livre) {
      return res.status(404).json({ message: "Livre introuvable" });
    }

    if (livre.nbr_emprunt >= livre.stock) {
      return res.status(400).json({ message: "Ce livre n'est plus disponible" });
    }

    const lastEmprunts = await Emprunt.find({
      user_id: req.body.user_id,
      date_emprunt: { $gte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000) },
      date_retour: null
    });

    if (lastEmprunts.length >= 3) {
      return res.status(400).json({ message: "Vous avez atteint votre limite d'emprunts" });
    }

    const emprunt = new Emprunt({
      user_id: req.body.user_id,
      livre_id: req.body.livre_id,
      date_emprunt: req.body.date_emprunt || new Date(),
      jours: req.body.jours || 14
    });

    await emprunt.save();
    livre.nbr_emprunt += 1;
    await livre.save();

    res.status(201).json({ message: "Emprunt ajouté avec succès", emprunt });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

  




///////// RENOUVELLEMENT ////////////////////////////



async function renouvelerEmprunt(empruntId) {
  try {
    const emprunt = await Emprunt.findById(empruntId);

    if (!emprunt) {
      throw new Error('Emprunt non trouvé');
    }

    if (emprunt.date_retour <= Date.now()) {
      throw new Error('Emprunt en retard, pénalité de suspension de 10 jours appliquée');
    }

    const joursSupplementaires = 7;
    const dateRetour = new Date(emprunt.date_retour.getTime() + (joursSupplementaires * 24 * 60 * 60 * 1000));

    emprunt.date_retour = dateRetour;
    const empruntModifie = await emprunt.save();

    return { message: 'Prêt renouvelé avec succès', emprunt: empruntModifie };
  } catch (err) {
    console.error(err);
    throw new Error(`Erreur lors du renouvellement du prêt : ${err.message}`);
  }
}


  
///////////  HISTORIQUE   ///////////////////


async function voirHistorique(req, res) {
  try {
    const emprunt = await Emprunt.find({ IdUser: req.params.id });
    res.json(emprunt);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

  



////////////// STATISTIQUES ///////////////////


async function afficherStats() {
  try {
    const totalEmprunts = await Emprunt.countDocuments();
    const totalLivres = await Livre.countDocuments();
    const totalLecteurs = await Utilisateur.countDocuments({ role: "client" });
    const livresPlusEmpruntes = await Emprunt.aggregate([
      { $group: { _id: "$livre_id", count: { $sum: 1 } } },
      { $lookup: { from: "livres", localField: "_id", foreignField: "_id", as: "livre" } },
      { $unwind: "$livre" },
      { $project: { titre: "$livre.titre", auteur: "$livre.auteur", count: 1 } },
      { $sort: { count: -1 } },
      { $limit: 3 }
    ]);

    return { totalEmprunts, totalLivres, totalLecteurs, livresPlusEmpruntes };
  } catch (err) {
    throw new Error(`Erreur lors de la récupération des statistiques : ${err.message}`);
  }
}






  module.exports = {
    ajouterEmprunt,
    voirHistorique,
    renouvelerEmprunt,
    afficherStats
};