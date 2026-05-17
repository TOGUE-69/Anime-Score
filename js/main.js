// FICHIER: js/main.js
// POINT D'ENTRÉE PRINCIPAL

// Attendre que le DOM soit chargé
document.addEventListener("DOMContentLoaded", () => {
    console.log("⚡ FOOTANIME - Chargement en cours...");
    
    // Simuler un temps de chargement (pour l'effet visuel)
    setTimeout(() => {
        initGame();
    }, 1500);
});

// Initialisation du jeu
function initGame() {
    // Vérifier que toutes les données sont chargées
    if (typeof ALL_CLUBS === "undefined") {
        console.error("Erreur: clubs.js non chargé");
        showError("Erreur de chargement des clubs");
        return;
    }
    
    if (typeof generateFullSquad === "undefined" || typeof generateMarket === "undefined") {
        console.error("Erreur: players.js non chargé");
        showError("Erreur de chargement des joueurs");
        return;
    }
    
    if (typeof Game === "undefined") {
        console.error("Erreur: game.js non chargé");
        showError("Erreur de chargement du moteur de jeu");
        return;
    }
    
    if (typeof UI === "undefined") {
        console.error("Erreur: screens.js non chargé");
        showError("Erreur de chargement de l'interface");
        return;
    }
    
    // Initialiser le jeu
    Game.init();
    
    // Initialiser l'interface
    UI.init();
    
    // Démarrer la sauvegarde auto
    if (typeof Save !== "undefined") {
        Save.startAutoSave(30);
    }
    
    // Ajouter des particules d'anime en fond (effet visuel)
    createAnimeParticles();
    
    console.log("⚡ FOOTANIME - Prêt !");
}

// Afficher une erreur
function showError(message) {
    const loadingScreen = document.getElementById("loading-screen");
    if (loadingScreen) {
        loadingScreen.innerHTML = `
            <div style="text-align: center; color: #ff6b6b;">
                <div style="font-size: 3em; margin-bottom: 20px;">💀</div>
                <div style="font-size: 1.5em;">${message}</div>
                <div style="margin-top: 20px; font-size: 0.9em;">Vérifie que tous les fichiers sont bien chargés</div>
                <button onclick="location.reload()" style="margin-top: 30px; padding: 10px 20px; background: #ff6b6b; border: none; border-radius: 10px; color: white; cursor: pointer;">⟳ RECHARGER</button>
            </div>
        `;
    }
}

// Créer des particules animées en fond (style anime)
function createAnimeParticles() {
    const particlesContainer = document.createElement("div");
    particlesContainer.style.position = "fixed";
    particlesContainer.style.top = "0";
    particlesContainer.style.left = "0";
    particlesContainer.style.width = "100%";
    particlesContainer.style.height = "100%";
    particlesContainer.style.pointerEvents = "none";
    particlesContainer.style.zIndex = "-1";
    particlesContainer.style.overflow = "hidden";
    document.body.appendChild(particlesContainer);
    
    // Créer des particules flottantes
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
    
    // Ajouter des particules périodiquement
    setInterval(() => {
        if (document.getElementById("game-screen")?.style.display === "flex") {
            createParticle(particlesContainer);
        }
    }, 3000);
}

function createParticle(container) {
    const particle = document.createElement("div");
    const size = Math.random() * 4 + 2;
    const colors = ["#ff6b6b", "#4ecdc4", "#f9ca24", "#ff8e53"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.position = "absolute";
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = color;
    particle.style.borderRadius = "50%";
    particle.style.opacity = Math.random() * 0.3 + 0.1;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animation = `floatParticle ${Math.random() * 10 + 10}s linear infinite`;
    particle.style.pointerEvents = "none";
    
    container.appendChild(particle);
    
    // Supprimer après animation
    setTimeout(() => {
        if (particle && particle.remove) particle.remove();
    }, 20000);
}

// Ajouter l'animation CSS pour les particules
const style = document.createElement("style");
style.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
        }
        50% {
            transform: translateY(-100px) translateX(50px);
            opacity: 0.1;
        }
        100% {
            transform: translateY(-200px) translateX(100px);
            opacity: 0;
        }
    }
    
    .victory {
        color: #4ecdc4;
        font-weight: bold;
    }
    
    .defeat {
        color: #ff6b6b;
    }
    
    .draw {
        color: #f9ca24;
    }
    
    .empty-message {
        text-align: center;
        padding: 40px;
        color: #888;
        font-style: italic;
    }
    
    .injury-badge {
        background: rgba(255, 107, 107, 0.2);
        border: 1px solid #ff6b6b;
        border-radius: 5px;
        padding: 3px 6px;
        font-size: 0.65em;
        margin-top: 8px;
        text-align: center;
        color: #ff6b6b;
    }
    
    .player-stats {
        margin: 8px 0;
    }
    
    .stat-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.7em;
        margin: 4px 0;
    }
    
    .force-bar {
        flex: 1;
        height: 4px;
        background: #333;
        border-radius: 2px;
        margin: 0 8px;
        overflow: hidden;
    }
    
    .force-fill {
        height: 100%;
        background: linear-gradient(90deg, #4ecdc4, #ff6b6b);
        border-radius: 2px;
        transition: width 0.3s;
    }
    
    .player-actions {
        display: flex;
        gap: 5px;
        margin-top: 8px;
    }
    
    .player-actions .btn-small {
        flex: 1;
        font-size: 0.65em;
        padding: 4px;
    }
    
    .formation-name {
        text-align: center;
        font-size: 0.9em;
        color: #ff6b6b;
        margin-bottom: 15px;
        font-weight: bold;
    }
    
    .live-event-goal {
        color: #ff6b6b;
        font-weight: bold;
        animation: pulse 0.5s;
    }
    
    .live-event-danger {
        color: #ff6b6b;
    }
    
    .live-event-warning {
        color: #f9ca24;
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
    }
    
    .job-style {
        font-size: 0.7em;
        color: #ff6b6b;
        margin-bottom: 8px;
        letter-spacing: 2px;
    }
    
    .price {
        color: #f9ca24;
        font-weight: bold;
        margin: 5px 0;
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
        .player-actions {
            flex-direction: column;
        }
        
        .stat-row {
            font-size: 0.6em;
        }
        
        .pitch-slot {
            width: 45px;
            height: 45px;
        }
        
        .pitch-slot .ps-name {
            font-size: 0.6em;
        }
        
        .job-card {
            width: 200px;
            padding: 15px;
        }
    }
`;

document.head.appendChild(style);

// Exporter les fonctions globales pour les appels HTML
window.Game = Game;
window.UI = UI;
window.Save = Save;

console.log("⚡ FOOTANIME - Tous les modules sont chargés !");
