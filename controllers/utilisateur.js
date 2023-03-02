const livre = require('../models/utilisateur');



// functions : utilisateurs

async function ajouterUtilisateur(req, res){
    let utilisateur = new utilisateur({
        nom_cat: req.body.nom_cat,
    });
    try {
      const nouvelUtilisateur = await utilisateur.save(); 
      res.status(201).json(nouvelUtilisateur); 
    } catch (err) {
      res.status(400).json({ message: err.message }); 
    };
};


async function afficherUtilisateur(req, res){
    let utilisateur
    try{
        utilisateur = await utilisateur.findById(req.params.id)
        if (utilisateur == null) {
            return res.status(404).json({ message: err.message});
        }
    } catch (err) {
        return res.status(500).json({ message: err.message})
    }

};


async function afficherTousUtilisateurs(req, res){
    let utilisateurs
    try {
        const utilisateurs = await utilisateur.find();
        res.json(utilisateurs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

};

async function supprimerUtilisateur(req, res){
    let utilisateurSupprimé 
    try {
        utilisateurSupprimé = await category.findByIdAndRemove(req.params.id); 
      if (utilisateurSupprimé) {
        res.json({ message: 'utilisateur supprimée avec succès' }); 
      } else {
        res.status(404).json({ message: 'utilisateur non trouvée' }); 
      }
    } catch (err) {
      res.status(500).json({ message: err.message }); 
    };
}
    async function modifierUtilisateur(req, res){
        try {
            const utilisateurModifié = await Book.findByIdAndUpdate(req.params.id, req.body);
            res.json(utilisateurModifié);
        } catch (err) {
            res.status(400).json({ message: err.message});
        }; 
    };



module.exports = {
    ajouterUtilisateur,
    afficherUtilisateur,
    afficherTousUtilisateurs,
    supprimerUtilisateur,
    modifierUtilisateur
    };





//     const Book = require('../models/book');
// const Category = require('../models/category');

// // functions

// async function createCategory(req, res){
//     let category = new Category({
//         name: req.body.name,
//         num_books: req.body.num_books,
//     });
//     try {
//         const newCategory = await category.save();
//         res.status(201).json(newCategory);
//     }  catch (err) {
//         res.status(400).json({ message: err.message})
//     }
// };

// async function updatedCategory(req, res){
//     try {
//         const categoryUpdated = await Category.findByIdAndUpdate(req.params.id, req.body);
//         res.json(categoryUpdated);
//     } catch (err) {
//         res.status(400).json({ message: err.message});
//     }; 
// };

// async function deletedCategory(req, res){
//     try {
//         const categoryDeleted = await Category.findByIdAndRemove(req.params.id); 
//       if (categoryDeleted) {
//         res.json({ message: 'Category deleted with success' }); 
//       } else {
//         res.status(404).json({ message: 'Category deleted'}); 
//       }
//     } catch (err) {
//       res.status(500).json({ message: err.message }); 
//     };
// };

// async function getAllCategories (req, res) {
//     try {
//         await Category.find({}).then(result => {
//                 res.send(result)
//             })
//     }

//     catch (err) {
//         console.log(err)
//     }
// };

// async function getCategory (req, res) {
//     try {
//         const category = await Category.findById(req.params.id);
//         res.send(category);
//     }
//     catch (err) {
//         console.log(err);
//     }
// };



// async function  addBook (req, res) {
//     const category = req.body.category
//     try {
//         const new_book = new Book({
//             title: req.body.title,
//             author: req.body.author,
//             isbn: req.body.isbn,
//             category: req.body.category,
//             rate: req.body.rate,
//             copies: req.body.copies,
//             nbr_borrowing: req.body.nbr_borrowing,
//         });

//         const categoryUpdated = await Category.findById(req.params.id);
//         categoryUpdated.num_books += 1;
//         await categoryUpdated.save();
//         await addBook.save();
//         res.send(new_book);
//     }
//     catch (err) {
//         console.log(err);
//     }
// };

// async function updatedBook(req, res){
//     try {
//         const bookUpdated = await Book.findByIdAndUpdate(req.params.id, req.body);
//         res.json(bookUpdated);
//     } catch (err) {
//         res.status(400).json({ message: err.message});
//     }; 
// };

// async function deletedBook(req, res){
//     try {
//         const bookDeleted = await Book.findByIdAndRemove(req.params.id); 
//       if (bookDeleted) {
//         res.json({ message: 'Book deleted with success' }); 
//       } else {
//         res.status(404).json({ message: 'Book deleted'}); 
//       }
//     } catch (err) {
//       res.status(500).json({ message: err.message }); 
//     };
// };





// module.exports = {
//     createCategory,
//     updatedCategory,
//     deletedCategory,
//     getAllCategories,
//     getCategory,
//     addBook,
//     updatedBook,
//     deletedBook
// };