import '../stylesheets/style.css'

const username = "codhSalas";
const apiUrl = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;
const getProject = (apiUrl) =>{
  console.log("Récupération des projets GitHub en cours...");

  fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    return response.json();
  })
  .then(repos => {
    console.log(`Nombre total de projets trouvés: ${repos.length}`);
    
    // Afficher chaque projet dans la console
    repos.forEach((repo, index) => {
      console.log(`\n--- Projet ${index + 1} ---`);
      console.log(`Nom: ${repo.name}`);
      console.log(`Description: ${repo.description || "Aucune description"}`);
      console.log(`URL: ${repo.html_url}`);
      console.log(`Langage principal: ${repo.language || "Non spécifié"}`);
      console.log(`Étoiles: ${repo.stargazers_count}`);
      console.log(`Forks: ${repo.forks_count}`);
      console.log(`Dernière mise à jour: ${new Date(repo.updated_at).toLocaleDateString()}`);
    });
  })
  .catch(error => {
    console.error("Erreur lors de la récupération des projets:", error.message);
  });
}
getProject(apiUrl);
// Faire la requête à l'API GitHub
