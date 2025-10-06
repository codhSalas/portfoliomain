import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

class Parameters {
  constructor() {
    this.loadEnv();
    this.host = this.setHost();
    this.port = this.setPort();
    this.dataBaseUrl = this.setDataBaseUrl();
  }

  loadEnv = () => {
    const mainEnvPath = path.resolve(process.cwd(), '.env');

    if (!fs.existsSync(mainEnvPath)) {
      throw new Error('[ENV] Fichier .env introuvable ! Ce fichier est obligatoire.');
    }

    const mainResult = dotenv.config({ path: mainEnvPath });
    if (mainResult.error) {
      throw new Error(`[ENV] Erreur lors du chargement du fichier .env : ${mainResult.error.message}`);
    }

    console.log('[ENV] Fichier .env lu');

    const curEnv = process.env.ENV;
    if (!curEnv) {
      throw new Error('[ENV] Le paramètre ENV est manquant dans le fichier .env');
    }

    const envFile = `.env.${curEnv}`;
    const envPath = path.resolve(process.cwd(), envFile);

    if (!fs.existsSync(envPath)) {
      throw new Error(`[ENV] Fichier ${envFile} introuvable !`);
    }

    const envResult = dotenv.config({ path: envPath, override: true });
    if (envResult.error) {
      throw new Error(`[ENV] Erreur lors du chargement du fichier ${envFile} : ${envResult.error.message}`);
    }

    console.log(`[ENV] Fichier ${envFile} chargé`);
  };

  setHost = () => process.env.HOST;
  setPort = () => process.env.PORT;
  setDataBaseUrl = () => process.env.DATA_BASE_URL;

  getHost = () => this.host;
  getPort = () => this.port;
  getDataBaseUrl = () => this.dataBaseUrl;
}

const parameters = new Parameters();
export default parameters;
