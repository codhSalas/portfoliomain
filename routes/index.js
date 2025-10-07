import express from 'express';
import NodeCache from 'node-cache';
import projects from '../services/main.js';
import jsonData from '../info.json' with {type:'json'};
import getProjects from '../services/main.js';

const cache = new NodeCache({ stdTTL: 600 });
const router = express.Router();

// Extraire les données du JSON
const data = jsonData.data;

/* GET home page with projects */
router.get('/', async function(req, res, next) {
    try {
        const cacheKey = 'index-page';
        const cachedPage = cache.get(cacheKey);
        
        if (cachedPage) {
            console.log("Page servie depuis le cache");
            return res.send(cachedPage);
        }
        
        // Attendre la récupération des projets
        const projectsList = await getProjects();

        
        console.log("Génération de la page...");
        if (!(projectsList.length === 0)) {
            res.render('index', { 
                title: 'Portfolio - Salas OUKIL',
                projects: projectsList,
                profil: data.profil,
                alternance: data.alternance,
                competences: data.competences,
                competences_transversales: data.competences_transversales,
                experience_professionnelle: data.experience_professionnelle,
                formation: data.formation,
                engagement_associatif: data.engagement_associatif,
                centres_d_interet: data.centres_d_interet,
                contact: data.contact,
                error: null
            }, (err, html) => {
                if (err) {
                    return next(err);
                }
                
                console.log("Page mise en cache");
                cache.set(cacheKey, html);
                res.send(html);
            });
        }else{
            res.render('index', { 
                title: 'Portfolio - Salas OUKIL',
                projects: [],
                profil: data.profil,
                alternance: data.alternance,
                competences: data.competences,
                competences_transversales: data.competences_transversales,
                experience_professionnelle: data.experience_professionnelle,
                formation: data.formation,
                engagement_associatif: data.engagement_associatif,
                centres_d_interet: data.centres_d_interet,
                contact: data.contact,
                error: 'Erreur lors du chargement des projets GitHub'
            }, (err, html) => {
                if (err) {
                    return next(err);
                }
                
                console.log("Page mise en cache");
                cache.set(cacheKey, html);
                res.send(html);
            });
        }
        
    } catch (error) {
        console.error('Erreur lors de la récupération des projets:', error);
        
        // En cas d'erreur, rendre la page sans projets
        res.render('index', { 
            title: 'Portfolio - Salas OUKIL',
            projects: [],
            profil: data.profil,
            alternance: data.alternance,
            competences: data.competences,
            competences_transversales: data.competences_transversales,
            experience_professionnelle: data.experience_professionnelle,
            formation: data.formation,
            engagement_associatif: data.engagement_associatif,
            centres_d_interet: data.centres_d_interet,
            contact: data.contact,
            error: 'Erreur lors du chargement des projets GitHub'
        }, (err, html) => {
            if (err) {
                return next(err);
            }
            res.send(html);
        });
    }
});

export default router;