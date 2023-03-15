const express = require("express");
const router = express.Router();
const control1 = require('../controllers/livre');
const control2 = require('../controllers/categorie');
const control4 = require('../controllers/commentaire');
const control5 = require('../controllers/reponse');
const control6 = require('../controllers/emprunt');


//afficher tous les livres
router.get('/livres', control1.afficherTousLivres);


//afficher un livre
router.get('/livres/:id', control1.afficherLivre);


//afficher un livre par filtre
router.get('/livres/', control1.afficherLivreFiltre);



/////////////////////////////////////////////////////////////////



//afficher tous les catégories
router.get('/categories', control2.afficherToutesCat);


//afficher une catégorie
router.get('/cateories/:id', control2.afficherCategorie);



/////////////////////////////////////////////////////////////////



//afficher un commentaire
router.get('/commentaires/:id', control4.afficherCommentaire);


//ajouter un commentaire
router.post('/commentaires', control4.ajouterCommentaire);


//supprimer un commentaire
router.delete('/commentaires/:id', control4.supprimerCommentaire);


//modifier un commentaire
router.patch('/commentaires/:id', control4.modifierCommentaire);




/////////////////////////////////////////////////////////////////



//afficher une réponse
router.get('/reponses', control5.afficherReponse);


//ajouter une reponse
router.post('/reponses', control5.ajouterReponse);


//supprimer une reponse
router.delete('/reponses/:id', control5.supprimerReponse);


//modifier une reponse
router.patch('/reponses/:id', control5.modifierReponse);



/////////////////////////////////////////////////////////////////


//afficher une réponse
router.get('/emprunt/:id', control6.obtenirHistorique);



module.exports = router;