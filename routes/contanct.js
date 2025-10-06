import express from 'express';
import nodemailer from 'nodemailer';
import parameters from '../config/parameters.js';
const router = express.Router();
const trasporteur = nodemailer.createTransport({
    service: 'gmail',
    auth : {
        user : parameters.getGmailUser(),
        pass : parameters.getPassword()
    }
})

router.post('/', function(req, res, next) {
    const {subject , message ,name , email} = req.body;
    if (!subject || !message || !name || !email) {
        return res.status(400).send('Tous les champs sont requis');
    }
    
    const mailOptions = {
        from : parameters.getGmailUser(),
        to : parameters.getGmailUser(),
        subject : subject,
        text : message + "\n" + name + "\n" + email
    }
    
    trasporteur.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).render('error' , {error : error})
        } else {
            console.log('Email sent: ' + info.response);
            res.status.redirect('/')
        }
    });

});

export default router;