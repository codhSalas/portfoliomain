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
      
    }else{
      this.host = process.env.DEV_HOST;
      this.port = process.env.DEV_PORT;
      this.dataBaseUrl = process.env.DEV_DATA_BASE_URL
      this.gmailUser = process.env.DEV_EMAIL;
      this.password = process.env.DEV_PSWD;
      this.gitHubToken = process.env.DEV_GITHUB_TOKEN;
    }

    
  };
  

  getHost = () => this.host;
  getPort = () => this.port;
  getDataBaseUrl = () => this.dataBaseUrl;
  getGmailUser = () => this.gmailUser;
  getPassword = () => this.password;
  getGitHubToken = () => this.gitHubToken;
}

const parameters = new Parameters();
export default parameters;
