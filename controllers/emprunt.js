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
      if (livre.nbr_emprunt >= 1) {
        const lastEmprunts = await Emprunt.find({
          user_id: req.body.user_id,
          date_retour: null,
        });
        if (lastEmprunts.length >= 3) {
          return res
            .status(400)
            .json({ message: "Vous avez atteint votre limite d'emprunts" });
        }
      }
      const emprunt = new Emprunt({
        user_id: req.body.user_id,
        livre_id: req.body.livre_id,
        date_emprunt: req.body.date_emprunt,
        date_retour: req.body.date_retour,
        jours: req.body.jours,
      });
      await emprunt.save();
      livre.nbr_emprunt += 1;
      await livre.save();
      res.status(201).json(emprunt);
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
      await emprunt.save();
  
      return { message: 'Prêt renouvelé avec succès' };
    } catch (err) {
      throw new Error(`Erreur lors du renouvellement du prêt : ${err.message}`);
    }
  }


  
///////////  HISTORIQUE   ///////////////////


async function obtenirHistorique(userId) {
  try {
    // Vérifier si l'utilisateur existe
    const utilisateur = await Utilisateur.findById(userId);
    if (!utilisateur) {
      throw new Error(`Utilisateur avec l'ID ${userId} non trouvé`);
    }

    // Récupérer tous les emprunts de l'utilisateur
    const emprunts = await Emprunt.find({ user_id: userId }).populate('livre_id');
    const empruntsInfo = [];

    // Pour chaque emprunt, récupérer les informations du livre emprunté
    for (const emprunt of emprunts) {
      const livre = emprunt.livre_id;
      const livreInfo = {
        titre: livre.titre,
        auteur: livre.auteur,
        date_emprunt: emprunt.date_emprunt,
        date_retour: emprunt.date_retour,
        jours: emprunt.jours
      };
      empruntsInfo.push(livreInfo);
    }

    return {
      utilisateur: {
        nom: utilisateur.nom,
        age: utilisateur.age,
        email: utilisateur.email,
        adresse: utilisateur.adresse
      },
      emprunts: empruntsInfo
    };
  } catch (error) {
    console.error(error.message);
    throw new Error('Impossible de récupérer l historique de prêts');
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
      { $limit: 10 }
    ]);

    return { totalEmprunts, totalLivres, totalLecteurs, livresPlusEmpruntes };
  } catch (err) {
    throw new Error(`Erreur lors de la récupération des statistiques : ${err.message}`);
  }
}






  module.exports = {
    ajouterEmprunt,
    obtenirHistorique,
    renouvelerEmprunt,
    afficherStats
};