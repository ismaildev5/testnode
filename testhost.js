const fetch = require('node-fetch');
const fs = require('fs');
const config = require('./config.js');

const logFile = 'output.log';

// Fonction pour écrire des messages dans le fichier log
function logMessage(message) {
    const timestamp = new Date().toISOString();
    fs.appendFileSync(logFile, `[${timestamp}] ${message}\n`);
}

// Fonction pour envoyer des données à l'API WordPress
async function sendPostToWordPress() {
    const postData = {
        title: 'railwaysssss',
        content: 'Contenu de test pour l\'envoi à WordPress.',
        status: 'publish' // Statut du post (peut être 'draft' ou 'publish')
    };

    try {
        const response = await fetch(`${config.WP_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(`${config.WP_USER}:${config.APP_PASSWORD}`).toString('base64'),
            },
            body: JSON.stringify(postData),
        });

        if (response.ok) {
            const data = await response.json();
            logMessage(`Post créé avec succès : ${data.id}`);
        } else {
            logMessage(`Erreur lors de la création du post : ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        logMessage(`Erreur : ${error.message}`);
    }
}

// Appeler la fonction pour envoyer le post
sendPostToWordPress();
