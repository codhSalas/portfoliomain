// import emailjs from '@emailjs/nodejs'; // ⚠️ Changez le package
// import parameters from '../config/parameters.js';

// const sendMsg = async (email, name, subject, msg) => {
//   try {
//     const SERVICE_ID = parameters.getEmailjsService();
//     const TEMPLATE_ID = parameters.getEmailjsTemplate();
//     const PUBLIC_KEY = parameters.getEmailjsKeyPublic();
//     const PRIVATE_KEY = parameters.getEmailjsKey();

//     const response = await emailjs.send(
//       SERVICE_ID,
//       TEMPLATE_ID,
//       {
//         from_name: name,
//         from_email: email,
//         subject: subject,
//         message: msg
//       },
//       {
//         publicKey: PUBLIC_KEY,
//         privateKey: PRIVATE_KEY,
//       }
//     );

//     console.log('Email envoyé avec succès !', response.status, response.text);
//     return { success: true, response };

//   } catch (err) {
//     console.error('Erreur lors de l\'envoi de l\'email :', err);
//     return { success: false, error: err.message };
//   }
// };

// export default sendMsg; 
import { Resend } from 'resend';
import parameters from '../config/parameters.js';


const resend = new Resend(parameters.getResendEmail());

const sendMsg = async (email, name, subject, msg) => {
  try {
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: parameters.getGmailUser(),
      subject: `${subject} - De: ${name}`,
      text: `De: ${name} <${email}>\n\n${msg}`,
    });

    console.log('Email envoyé:', data.id);
    return { success: true, data };

  } catch (error) {
    console.error('Erreur:', error);
    return { success: false, error: error.message };
  }
};

export default sendMsg;