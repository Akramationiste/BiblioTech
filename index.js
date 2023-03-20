const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = require("./routes/auth");
const authRouter = require('./routes/auth');
const apiRouter = require('./routes/api');
const authMiddleware = require('./middlewhares/authm');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use('/api', authMiddleware);
app.use('/api', apiRouter);
app.use("/auth", router);
app.use('/api', authMiddleware, apiRouter);


// register auth routes
app.use('/auth', authRouter);

// connect to mongodb
mongoose.connect('mongodb+srv://Fabrikademy:Fabrikademy@fabrikademy.utr52c0.mongodb.net/?retryWrites=true&w=majority');
app.listen(3000, () => console.log('Server started'));


mongoose.connection.once('open', function(){
    console.log('Connection has been made, abda takhdam...');
}).on('error', function(error){
    console.log('Connection error:', error);
});



app.get("/" , (req, res)=>{
    sendEmail()
    .then(response => res.send (response.message))
    .catch(error => res.status(500).send(error.message))
})






app.use(express.json());


// const apiRouter = require('./routes/api');