const express = require("express");
const router = express.Router();
const control1 = require('../controllers/livre');
const control2 = require('../controllers/categorie');
const control3 = require('../controllers/utilisateur');
const control6 = require('../controllers/emprunt');
const auth = require('../middlewhares/authm')





//afficher tous les utilisateurs
router.get('/utilisateurs', control3.afficherTousUtilisateurs);

//afficher un utilisateur
router.get('/utilisateurs/:id', control3.afficherUtilisateur);

//modifier un utilisateur
router.patch('/utilisateurs/:id', control3.modifierUtilisateur)

//supprimer un utilisateur
router.delete('/utilisateurs/:id', control3.supprimerUtilisateur);




////////////////////////////////////////////////////////////////////////////




//afficher tous les livres
router.get('/livres', control1.afficherTousLivres);


//afficher un livre
router.get('/livres/:id', control1.afficherLivre);


//ajouter un livre
router.post('/livres', control1.ajouterLivre);


//supprimer un livre
router.delete('/livres/:id', control1.supprimerLivre);




//////////////////////////////////////////////////////////////////////////////




//afficher tous les catégories
router.get('/categories', control2.afficherToutesCat);


//afficher une catégorie
router.get('/categories/:id', control2.afficherCategorie);


//ajouter une catégorie
router.post('/categories', control2.ajouterCategorie);


//supprimer une catégorie
router.delete('/categories/:id', control2.supprimerCategorie);


//modifier une catégorie
router.patch('/categories/:id', control2.modifierCategorie);



//////////////////////////////////////////////////////////////////////////////




//ajouter un emprunt
router.post('/emprunts', control6.ajouterEmprunt);

//renouvler un emprunt
router.post('/renouveler_emprunts/:id', control6.renouvelerEmprunt);






////////////////////////////////////////////////////////////////////////////////

//les statistiques////

router.get('/statistiques', control6.afficherStats);





module.exports = router;