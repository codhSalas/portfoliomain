// Remplacez "VOTRE_NOM_UTILISATEUR" par votre nom d'utilisateur GitHub
const username = "codhSalas";
const apiUrl = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;

const getProjects = async () => {
    try {
        console.log("Récupération des projets GitHub en cours...");
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const repos = await response.json();
        
        console.log(`Nombre total de projets trouvés: ${repos.length}`);
        
        // Transformer les données pour le template
        const projects = repos.slice(0, 6).map((repo, index) => {
            console.log(`\n--- Projet ${index + 1} ---`);
            console.log(`Nom: ${repo.name}`);
            console.log(`Description: ${repo.description || "Aucune description"}`);
            console.log(`URL: ${repo.html_url}`);
            console.log(`Langage principal: ${repo.language || "Non spécifié"}`);
            console.log(`Étoiles: ${repo.stargazers_count}`);
            console.log(`Forks: ${repo.forks_count}`);
            console.log(`Dernière mise à jour: ${new Date(repo.updated_at).toLocaleDateString()}`);
            
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
        console.error("Erreur lors de la récupération des projets:", error.message);
        throw error; // Relancer l'erreur pour que la route puisse la gérer
    }
};

export default getProjects;