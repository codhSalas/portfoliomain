import parameters from '../config/parameters.js';
const username = "codhSalas";
const apiUrl = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;

const getProjects = async () => {
  try {
    console.log("Récupération des projets GitHub en cours...");
    
    // Ajouter l'authentification si le token existe
    const headers = {};
    if (parameters.getGitHubToken()) {
      headers['Authorization'] = `Bearer ${parameters.getGitHubToken()}`;
      console.log("Token GitHub détecté, utilisation de l'authentification");
    } else {
      console.warn("Pas de token GitHub, limite de 60 requêtes/heure");
    }
    
    const response = await fetch(apiUrl, { headers });
    
    if (!response.ok) {
      // Afficher plus d'infos en cas d'erreur
      const errorBody = await response.text();
      console.error(`Erreur HTTP ${response.status}:`, errorBody);
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const repos = await response.json();
    console.log(`Nombre total de projets trouvés: ${repos.length}`);
    
    const projects = repos.slice(0, 6).map((repo, index) => {
        console.log("projet recuperee");
      return {
        name: repo.name,
        description: repo.description || 'Pas de description disponible.',
        language: repo.language || 'Non spécifié',
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        url: repo.html_url,
        homepage: repo.homepage,
        updatedAt: new Date(repo.updated_at).toLocaleDateString()
      };
    });
    
    return projects;
  } catch (error) {
    console.error(" Erreur lors de la récupération des projets:", error.message);
    throw error;
  }
};

export default getProjects;