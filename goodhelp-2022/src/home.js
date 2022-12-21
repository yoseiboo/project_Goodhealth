const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const dbConnection = require('./database');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.urlencoded({extended:false}));

//ให้Joinหาไฟล์ในviewsที่เป็นhtml    
app.set('views', path.join(__dirname,'views'));
app.set('view engine','html');

//set key ให้
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge:  3600 * 1000 // 1hr
}));


const ifgetHome = (req,res,next) => {
    if(req.session.isLoggedIn){
        return res.render ('/');
    }
    next();
}
app.get('/',ifgetHome,(req,res, next)=>{
    const userID = req.body.id
    dbConnection.execute("SELECT `name` FROM `users` WHERE `id`=?",[req.session.userID])
    if(req,res,rows[0]){
        res.render('Home')

    } else{ (req,res,rows[id] = true)
        res.render('Home')
        return res.status(200).redirect('/:id')
    }next();
})



app.use('/', (req,res) => {
    res.status(404).send('<h1>404 Page Not Found!</h1>');
});



app.listen(3000, () => console.log("Server is Running..."));