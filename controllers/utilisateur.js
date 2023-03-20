const Utilisateur = require('../models/utilisateur');
const sendEmail = require ("../index")

async function afficherUtilisateur(req, res) {
    let utilisateur = null;
    try {
        utilisateur = await Utilisateur.findById(req.params.id);
        if (utilisateur == null) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json(utilisateur);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function afficherTousUtilisateurs(req, res) {
    let utilisateurs = null;
    try {
        utilisateurs = await Utilisateur.find();
        res.json(utilisateurs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function supprimerUtilisateur(req, res) {
    try {
        const utilisateurSupprimé = await Utilisateur.findByIdAndRemove(req.params.id); 
        if (utilisateurSupprimé) {
            res.json({ message: 'Utilisateur supprimé avec succès' }); 
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' }); 
        }
    } catch (err) {
        res.status(500).json({ message: err.message }); 
    }
}

async function modifierUtilisateur(req, res) {
    try {
        const utilisateurModifié = await Utilisateur.findByIdAndUpdate(req.params.id, req.body, { new: true });
        sendEmail()
        if (utilisateurModifié) {
            res.json(utilisateurModifié);
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message});
    }
}

module.exports = {
    afficherUtilisateur,
    afficherTousUtilisateurs,
    supprimerUtilisateur,
    modifierUtilisateur
};
