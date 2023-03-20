
// const expressAsyncHandler = require("express-async-handler")

const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied' });
  }

  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = auth;


// //Proteger employe
// exports.protectEmploye = expressAsyncHandler(async (req, res, next) => {
//   try {
//     const authHeader = req.headers["authorization"]
//     const token = authHeader && authHeader.split(" ")[1]
//     if (!token) {
//       res.status(400)
//       throw new Error("aucun token!")
//     }
//     const user = jwt.verify(token, process.env.JWT_SECRET)
//     const { role, _id } = user
//     const isEmploye = role === "employe"
    
//     if (!isEmploye) {
//       res.status(404)
//       throw new Error("tu n'es pas autorisé")
//     }
//     req.utilisateur = { _id, role }
//     next()
//   } catch (error) {
//     res.status(400)
//     throw new Error(error)
//   }
// })


