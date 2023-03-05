const express = require("express");
const router = express.Router();
const control1 = require('../controllers/livre');
const control2 = require('../controllers/categorie');
const control3 = require('../controllers/utilisateur');




//afficher tous les utilisateurs
router.get('/utilisateurs', control3.afficherTousUtilisateurs);

//afficher un utilisateur
router.get('/utilisateurs/:id', control3.afficherUtilisateur);

//modifier un utilisateur
router.patch('/utilisateurs', control3.modifierUtilisateur)

//supprimer un utilisateur
router.delete('/utilisateurs', control3.supprimerUtilisateur);




////////////////////////////////////////////////////////////////////////////




//afficher tous les livres
router.get('/livres', control1.afficherTousLivres);


//afficher un livre
router.get('/livres/:id', control1.afficherLivre);


//ajouter un livre
router.post('/livres', control1.ajouterLivre);


//supprimer un livre
router.delete('/livres', control1.supprimerLivre);




//////////////////////////////////////////////////////////////////////////////




//afficher tous les catégories
router.get('/catégories', control2.afficherToutesCat);


//afficher une catégorie
router.get('/catégories/:id', control2.afficherCatégorie);


//ajouter une catégorie
router.post('/catégories', control2.ajouterCatégorie);


//supprimer une catégorie
router.delete('/catégories', control2.supprimerCatégorie);


//modifier une catégorie
router.patch('/catégories', control2.modifierCatégorie);





module.exports = router;