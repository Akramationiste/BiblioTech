
const nodemailer = require ('nodemailer');
const utilisateur = require('../models/utilisateur');

////////////////////   SEND MAIL    ///////////////////////////////////////////


exports.sendEmail = (utilisateur) => {
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
        
              user: 'muchamucha92@gmail.com',
              pass: 'cheevxaljturbdbq'
            }
        })         
           const mail_configs = {
            from: 'muchamucha92@gmail.com',
            to: utilisateur.email,
            subject: 'enregistrement avec succès !',
            text: 'Merci à vous.'
          }
          transporter.sendMail(mail_configs , function(error, info){
            if(error){
                console.log(error)
                reject({message:"erreur trouvé !!"})
            }
            return resolve ({message:"email envoyé avec succès"})
          })
    })
}