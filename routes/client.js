const express = require("express");
const router = express.Router();
const control1 = require('../controllers/livre');
const control2 = require('../controllers/catégorie');


//afficher tous les livres
router.get('/livres', control1.afficherTousLivres);


//afficher un livre
router.get('/livres/:id', control1.afficherLivre);



/////////////////////////////////////////////////////////////////



//afficher tous les catégories
router.get('/catégories', control2.afficherToutesCat);


//afficher une catégorie
router.get('/catégories/:id', control2.afficherCatégorie);




module.exports = router;