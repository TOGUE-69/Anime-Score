// FICHIER: js/save.js
// SYSTÈME DE SAUVEGARDE AUTOMATIQUE

const Save = {
    // Clé de stockage
    SAVE_KEY: "FootAnime_Save",
    
    // Sauvegarder la partie
    save() {
        try {
            const saveData = {
                // Club
                currentClub: Game.currentClub,
                currentClubId: Game.currentClubId,
                budget: Game.budget,
                formation: Game.formation,
                
                // Effectif
                squad: Game.squad.map(p => ({
                    ...p,
                    // Ne pas sauvegarder les références circulaires
                    special: p.special,
                    nom: p.nom,
                    poste: p.poste,
                    force: p.force,
                    age: p.age,
                    fatigue: p.fatigue,
                    blesse: p.blesse,
                    buts: p.buts,
                    passes: p.passes,
                    matchs: p.matchs,
                    titulaire: p.titulaire,
                    valeur: p.valeur,
                    salaire: p.salaire,
                    id: p.id
                })),
                
                // Transferts
                transferList: Game.transferList,
                
                // Résultats et stats
                results: Game.results,
                matchsPlayed: Game.matchsPlayed,
                form: Game.form,
                season: Game.season,
                
                // Date
                date: Game.date.toISOString(),
                
                // Version
                version: "1.0.0",
                saveDate: new Date().toISOString()
            };
            
            // Compression des données pour économiser de l'espace
            const jsonString = JSON.stringify(saveData);
            
            // Vérifier la taille (localStorage limite ~5-10MB)
            if (jsonString.length > 4500000) {
                console.warn("Sauvegarde volumineuse:", jsonString.length, "caractères");
                // Option: supprimer les logs anciens si trop gros
                if (saveData.results.length > 50) {
                    saveData.results = saveData.results.slice(0, 50);
                }
                // Ré-encodage
                const compressed = JSON.stringify(saveData);
                localStorage.setItem(this.SAVE_KEY, compressed);
            } else {
                localStorage.setItem(this.SAVE_KEY, jsonString);
            }
            
            // Indicateur visuel de sauvegarde
            this.showSaveIndicator();
            
            return true;
        } catch (error) {
            console.error("Erreur lors de la sauvegarde:", error);
            UI.showToast("⚠️ Erreur de sauvegarde !", true);
            return false;
        }
    },
    
    // Charger la sauvegarde
    load() {
        try {
            const saved = localStorage.getItem(this.SAVE_KEY);
            if (!saved) return null;
            
            const data = JSON.parse(saved);
            
            // Vérifier la version
            if (data.version !== "1.0.0") {
                console.warn("Version de sauvegarde différente:", data.version);
            }
            
            // Restaurer la date
            if (data.date) {
                Game.date = new Date(data.date);
            }
            
            // Restaurer l'effectif en conservant les méthodes
            if (data.squad) {
                Game.squad = data.squad;
            }
            
            // Restaurer le reste
            Game.currentClub = data.currentClub;
            Game.currentClubId = data.currentClubId;
            Game.budget = data.budget;
            Game.formation = data.formation;
            Game.transferList = data.transferList || [];
            Game.results = data.results || [];
            Game.matchsPlayed = data.matchsPlayed || 0;
            Game.form = data.form || [];
            Game.season = data.season || { v: 0, n: 0, d: 0, bp: 0, bc: 0, primes: 0 };
            
            // Regénérer le marché si nécessaire
            if (!Game.marketPlayers || Game.marketPlayers.length === 0) {
                Game.marketPlayers = generateMarket(Game.squad);
            }
            
            // Régénérer les clubs si nécessaire
            if (!Game.currentClub && data.currentClubId) {
                Game.currentClub = ALL_CLUBS.find(c => c.id === data.currentClubId);
            }
            
            UI.addLog("💾 Sauvegarde chargée avec succès !", "success");
            
            return true;
        } catch (error) {
            console.error("Erreur lors du chargement:", error);
            UI.showToast("⚠️ Erreur de chargement ! Nouvelle partie créée.", true);
            return null;
        }
    },
    
    // Supprimer la sauvegarde
    delete() {
        if (confirm("Supprimer définitivement la sauvegarde ?")) {
            localStorage.removeItem(this.SAVE_KEY);
            UI.showToast("🗑️ Sauvegarde supprimée");
            setTimeout(() => location.reload(), 1500);
        }
    },
    
    // Sauvegarde automatique périodique
    startAutoSave(intervalSeconds = 60) {
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
        }
        
        this.autoSaveInterval = setInterval(() => {
            if (Game.currentClub && !Game.playing && !Game.inMatch) {
                this.save();
                console.log("Auto-save effectué");
            }
        }, intervalSeconds * 1000);
    },
    
    // Indicateur visuel de sauvegarde
    showSaveIndicator() {
        let indicator = document.getElementById("save-indicator");
        if (!indicator) {
            indicator = document.createElement("div");
            indicator.id = "save-indicator";
            indicator.style.cssText = `
                position: fixed;
                bottom: 10px;
                left: 10px;
                background: #4ecdc4;
                color: #000;
                padding: 4px 10px;
                border-radius: 20px;
                font-size: 0.7em;
                font-weight: bold;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s;
                pointer-events: none;
            `;
            indicator.textContent = "💾 SAUVEGARDE";
            document.body.appendChild(indicator);
        }
        
        indicator.style.opacity = "1";
        setTimeout(() => {
            indicator.style.opacity = "0";
        }, 1500);
    },
    
    // Exporter la sauvegarde (fichier JSON)
    exportSave() {
        const saved = localStorage.getItem(this.SAVE_KEY);
        if (!saved) {
            UI.showToast("Aucune sauvegarde à exporter", true);
            return;
        }
        
        const blob = new Blob([saved], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `footanime_save_${new Date().toISOString().slice(0, 19)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        UI.showToast("📤 Sauvegarde exportée !");
    },
    
    // Importer une sauvegarde
    importSave(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                localStorage.setItem(this.SAVE_KEY, JSON.stringify(data));
                UI.showToast("📥 Sauvegarde importée ! Redémarrage...");
                setTimeout(() => location.reload(), 1500);
            } catch (error) {
                UI.showToast("❌ Fichier invalide !", true);
            }
        };
        reader.readAsText(file);
    }
};

// Sauvegarde automatique toutes les 30 secondes
setInterval(() => {
    if (Game.currentClub && !Game.playing && !Game.inMatch) {
        Save.save();
    }
}, 30000);

// Sauvegarde avant de quitter la page
window.addEventListener("beforeunload", () => {
    if (Game.currentClub) {
        Save.save();
    }
});
