import express from 'express';
import sendMsg from '../services/email.js';

const router = express.Router();

router.post('/', async function(req, res, next) {
  const { subject, message, name, email } = req.body;
  
  if (!subject || !message || !name || !email) {
    console.log('Validation échouée: champs manquants');
    return res.redirect('/');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.log('Format email invalide:', email);
    return res.redirect('/');
  }
  try{
    await sendMsg(email , name,subject,message)
    return res.redirect('/');
  }catch(err){
    console.log(err)
    return res.redirect('/');
  }
  
});

export default router;