import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

class Parameters {
  constructor() {
    this.loadEnv();
  }

  loadEnv = () => {
    const mainEnvPath = path.resolve(process.cwd(), '.env');

    // if (!fs.existsSync(mainEnvPath)) {
    //   throw new Error('[ENV] Fichier .env introuvable ! Ce fichier est obligatoire.');
    // }

    const mainResult = dotenv.config({ path: mainEnvPath });
    // if (mainResult.error) {
    //   throw new Error(`[ENV] Erreur lors du chargement du fichier .env : ${mainResult.error.message}`);
    // }

    // console.log('[ENV] Fichier .env lu');

    const curEnv = process.env.ENV;
    if (!curEnv) {
      throw new Error('[ENV] Le paramètre ENV est manquant dans le fichier .env');
    }
    if (curEnv == "PROD"){
      this.host = process.env.PROD_HOST;
      this.port = process.env.PROD_PORT;
      this.dataBaseUrl = process.env.PROD_DATA_BASE_URL
      this.gmailUser = process.env.PROD_EMAIL;
      this.password = process.env.PROD_PSWD;
      this.gitHubToken = process.env.PROD_GITHUB_KEY;
      this.brevoApiKey = process.env.PROD_BREVO_API_KEY;

      this.emailjs_service=process.env.PROD_EMAIL_JS_SERVICE 
      this.emailjs_template=process.env.PROD_EMAIL_JS_TEMPLATE
      this.emailjs_key=process.env.PROD_EMAIL_JS_KEY
      this.emailjs_key_public=process.env.PROD_EMAIL_JS_KEY_PUBLIC
      this.resend_email=process.env.PROD_RESEND_EMAIL
      
    }else{
      this.host = process.env.DEV_HOST;
      this.port = process.env.DEV_PORT;
      this.dataBaseUrl = process.env.DEV_DATA_BASE_URL
      this.gmailUser = process.env.DEV_EMAIL;
      this.password = process.env.DEV_PSWD;
      this.gitHubToken = process.env.DEV_GITHUB_TOKEN;
      this.brevoApiKey = process.env.DEV_BREVO_API_KEY;
      this.emailjs_service=process.env.DEV_EMAIL_JS_SERVICE ;
      this.emailjs_template=process.env.DEV_EMAIL_JS_TEMPLATE;
      this.emailjs_key=process.env.DEV_EMAIL_JS_KEY;
      this.emailjs_key_public=process.env.DEV_EMAIL_JS_KEY_PUBLIC;
      this.resend_email=process.env.DEV_RESEND_EMAIL;
    }

    
  };
  

  getHost = () => this.host;
  getPort = () => this.port;
  getDataBaseUrl = () => this.dataBaseUrl;
  getGmailUser = () => this.gmailUser;
  getPassword = () => this.password;
  getGitHubToken = () => this.gitHubToken;
  getBrevoApiKey = () => this.brevoApiKey;
  getEmailjsService = () => this.emailjs_service;
  getEmailjsTemplate = () => this.emailjs_template;
  getEmailjsKey = () => this.emailjs_key;
  getEmailjsKeyPublic = () => this.emailjs_key_public;
  getResendEmail = () => this.resend_email;

}

const parameters = new Parameters();
export default parameters;
