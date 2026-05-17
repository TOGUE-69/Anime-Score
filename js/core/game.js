// FICHIER: js/core/game.js
// MOTEUR PRINCIPAL DU JEU

const Game = {
    // État du jeu
    currentClub: null,
    currentClubId: null,
    date: new Date(2026, 6, 1),
    budget: 0,
    formation: "4-3-3",
    formationStyle: "equilibre",
    playing: false,
    inMatch: false,
    squad: [],
    transferList: [],
    marketPlayers: [],
    results: [],
    matchsPlayed: 0,
    form: [],
    season: { v: 0, n: 0, d: 0, bp: 0, bc: 0, primes: 0 },
    
    // Formations avec style de jeu
    formations: [
        // DÉFENSIVES (⛔)
        { nom: "5-4-1", def: 5, mil: 4, att: 1, style: "defensif", bonus: { attaque: -10, defense: 15 } },
        { nom: "5-3-2", def: 5, mil: 3, att: 2, style: "defensif", bonus: { attaque: -5, defense: 12 } },
        { nom: "4-5-1", def: 4, mil: 5, att: 1, style: "defensif", bonus: { attaque: -8, defense: 10 } },
        { nom: "3-5-2 (déf)", def: 3, mil: 5, att: 2, style: "defensif", bonus: { attaque: -3, defense: 8 } },
        
        // ÉQUILIBRÉES (⚖️)
        { nom: "4-4-2", def: 4, mil: 4, att: 2, style: "equilibre", bonus: { attaque: 0, defense: 0 } },
        { nom: "4-3-3", def: 4, mil: 3, att: 3, style: "equilibre", bonus: { attaque: 2, defense: 0 } },
        { nom: "3-4-3 (équi)", def: 3, mil: 4, att: 3, style: "equilibre", bonus: { attaque: 5, defense: -3 } },
        { nom: "4-2-3-1", def: 4, mil: 5, att: 1, style: "equilibre", bonus: { attaque: 3, defense: 2 } },
        { nom: "4-1-4-1", def: 4, mil: 5, att: 1, style: "equilibre", bonus: { attaque: 0, defense: 5 } },
        
        // OFFENSIVES (⚡)
        { nom: "4-3-3 (off)", def: 4, mil: 3, att: 3, style: "offensif", bonus: { attaque: 10, defense: -8 } },
        { nom: "3-4-3", def: 3, mil: 4, att: 3, style: "offensif", bonus: { attaque: 12, defense: -10 } },
        { nom: "4-2-4", def: 4, mil: 2, att: 4, style: "offensif", bonus: { attaque: 15, defense: -12 } },
        { nom: "3-3-4", def: 3, mil: 3, att: 4, style: "offensif", bonus: { attaque: 18, defense: -15 } },
        { nom: "2-4-4", def: 2, mil: 4, att: 4, style: "ultra offensif", bonus: { attaque: 25, defense: -20 } },
        
        // SPÉCIALES (🌀)
        { nom: "4-4-2 diamant", def: 4, mil: 4, att: 2, style: "special", special: "milieu en losange" },
        { nom: "3-4-1-2", def: 3, mil: 4, att: 2, style: "special", special: "playmaker central" },
        { nom: "4-3-2-1", def: 4, mil: 5, att: 1, style: "special", special: "trio magique" },
        { nom: "5-2-1-2", def: 5, mil: 3, att: 2, style: "special", special: "catenaccio" }
    ],
    
    // Initialisation
    init() {
        const saved = Save.load();
        if (saved) {
            Object.assign(this, saved);
            UI.refreshAll();
            this.showGameScreen();
        } else {
            this.showCareerScreen();
        }
    },
    
    // Affiche l'écran de carrière
    showCareerScreen() {
        document.getElementById("loading-screen").style.display = "none";
        document.getElementById("career-screen").style.display = "flex";
        document.getElementById("game-screen").style.display = "none";
        this.generateJobOffers();
    },
    
    // Affiche l'écran de jeu
    showGameScreen() {
        document.getElementById("loading-screen").style.display = "none";
        document.getElementById("career-screen").style.display = "none";
        document.getElementById("game-screen").style.display = "flex";
        UI.refreshAll();
    },
    
    // Génère 3 offres aléatoires (1 par style)
    generateJobOffers() {
        // Récupérer des clubs de différents styles (D1, D2, D3)
        const topClubs = ALL_CLUBS.filter(c => c.div === 1 && c.force >= 85);
        const mediumClubs = ALL_CLUBS.filter(c => c.div === 2 && c.force >= 70 && c.force < 85);
        const lowClubs = ALL_CLUBS.filter(c => c.div === 3 && c.force < 70);
        
        const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);
        
        const offers = [
            shuffle([...topClubs])[0],
            shuffle([...mediumClubs])[0],
            shuffle([...lowClubs])[0]
        ].filter(c => c);
        
        const container = document.getElementById("job-offers");
        if (!container) return;
        
        container.innerHTML = "";
        
        const styles = ["🔥 TOP CLUB", "⚖️ CLUB MOYEN", "🌱 PETIT CLUB"];
        
        offers.forEach((club, index) => {
            const card = document.createElement("div");
            card.className = "job-card";
            card.innerHTML = `
                <div class="job-style">${styles[index]}</div>
                <div class="job-club">${club.nom}</div>
                <div class="job-div">Division ${club.div}</div>
                <div class="job-budget">💰 ${club.budget.toLocaleString("fr-FR")} €</div>
                <div class="job-force">📊 Force: ${club.force}</div>
                <button class="btn-small" onclick="Game.selectClub(${club.id})">⚡ RELEVER LE DÉFI ⚡</button>
            `;
            container.appendChild(card);
        });
    },
    
    // Sélectionne un club
    selectClub(clubId) {
        const club = ALL_CLUBS.find(c => c.id === clubId);
        if (!club) return;
        
        this.currentClub = club;
        this.currentClubId = club.id;
        this.budget = club.budget;
        this.squad = generateFullSquad(club.force, club.budget);
        this.marketPlayers = generateMarket(this.squad);
        this.transferList = [];
        this.results = [];
        this.matchsPlayed = 0;
        this.form = [];
        this.season = { v: 0, n: 0, d: 0, bp: 0, bc: 0, primes: 0 };
        this.date = new Date(2026, 6, 1);
        
        Save.save();
        this.showGameScreen();
        UI.addLog(`📢 Bienvenue à ${club.nom} ! Ta mission commence maintenant !`);
    },
    
    // Changer de formation
    setFormation(formationNom) {
        const formation = this.formations.find(f => f.nom === formationNom);
        if (!formation) return;
        
        this.formation = formationNom;
        this.formationStyle = formation.style;
        
        // Appliquer automatiquement les meilleurs joueurs selon la formation
        this.autoSetBestLineup();
        
        UI.addLog(`⚙️ Formation changée : ${formationNom} (${this.getStyleName(formation.style)})`, "info");
        UI.showToast(`Formation: ${formationNom} - ${this.getStyleName(formation.style)}`);
        UI.refreshAll();
    },
    
    getStyleName(style) {
        const styles = {
            "defensif": "⛔ DÉFENSIF - Solide derrière",
            "equilibre": "⚖️ ÉQUILIBRÉ - Maîtrise du milieu",
            "offensif": "⚡ OFFENSIF - Tous devant !",
            "ultra offensif": "💀 ULTRA OFFENSIF - Attaque à outrance",
            "special": "🌀 SPÉCIALE - Tactique unique"
        };
        return styles[style] || "⚖️ ÉQUILIBRÉ";
    },
    
    // Auto-composition selon la formation
    autoSetBestLineup() {
        if (!this.squad.length) return;
        
        // Réinitialiser tous les titulaires
        this.squad.forEach(p => p.titulaire = false);
        
        const formation = this.formations.find(f => f.nom === this.formation);
        if (!formation) return;
        
        // Séparer les joueurs par poste et trier par force
        const gardiens = this.squad.filter(p => p.poste === "G" && !p.blesse).sort((a,b) => b.force - a.force);
        const defenseurs = this.squad.filter(p => p.poste === "D" && !p.blesse).sort((a,b) => b.force - a.force);
        const milieux = this.squad.filter(p => p.poste === "M" && !p.blesse).sort((a,b) => b.force - a.force);
        const attaquants = this.squad.filter(p => p.poste === "A" && !p.blesse).sort((a,b) => b.force - a.force);
        
        // 1 gardien
        if (gardiens[0]) gardiens[0].titulaire = true;
        
        // Défenseurs
        for (let i = 0; i < Math.min(formation.def, defenseurs.length); i++) {
            if (defenseurs[i]) defenseurs[i].titulaire = true;
        }
        
        // Milieux
        for (let i = 0; i < Math.min(formation.mil, milieux.length); i++) {
            if (milieux[i]) milieux[i].titulaire = true;
        }
        
        // Attaquants
        for (let i = 0; i < Math.min(formation.att, attaquants.length); i++) {
            if (attaquants[i]) attaquants[i].titulaire = true;
        }
        
        UI.addLog(`📋 Composition optimisée pour ${this.formation}`, "info");
    },
    
    // Avancer d'un jour
    nextDay() {
        if (this.playing || this.inMatch) {
            UI.showToast("Un match est en cours !", true);
            return;
        }
        
        this.date.setDate(this.date.getDate() + 1);
        const dayOfWeek = this.date.getDay();
        
        // Récupération fatigue
        this.squad.forEach(p => {
            if (p.fatigue > 0) p.fatigue = Math.max(0, p.fatigue - 8);
            if (p.blesse > 0) {
                p.blesse--;
                if (p.blesse === 0) UI.addLog(`🏥 ${p.nom} est guéri et peut rejouer !`, "success");
            }
        });
        
        // Match le samedi (jour 6)
        if (dayOfWeek === 6 && !this.inMatch) {
            this.startMatch();
        }
        
        // Mise à jour de l'interface
        UI.refreshAll();
        Save.save();
    },
    
    // Démarrer un match
    async startMatch() {
        this.inMatch = true;
        this.playing = true;
        this.matchsPlayed++;
        
        // Sélection d'un adversaire aléatoire (autre club de la même division)
        const opponents = ALL_CLUBS.filter(c => c.id !== this.currentClubId && c.div === this.currentClub.div);
        const opponent = opponents[Math.floor(Math.random() * opponents.length)];
        
        // Interface live
        const liveMatch = document.getElementById("live-match");
        const liveHome = document.getElementById("live-home");
        const liveAway = document.getElementById("live-away");
        const liveScore = document.getElementById("live-score");
        const liveMinute = document.getElementById("live-minute");
        const liveEvent = document.getElementById("live-event");
        const liveEvents = document.getElementById("live-events");
        
        if (liveHome) liveHome.textContent = this.currentClub.nom;
        if (liveAway) liveAway.textContent = opponent.nom;
        if (liveEvents) liveEvents.innerHTML = "";
        if (liveMatch) liveMatch.style.display = "block";
        
        let scoreH = 0;
        let scoreA = 0;
        
        // Simulation
        for (let minute = 1; minute <= 90; minute += 5) {
            await new Promise(r => setTimeout(r, 200));
            
            // Calcul des chances
            const forceH = this.squad.filter(p => p.titulaire && !p.blesse).reduce((a,p) => a + p.force, 0) / 11;
            const forceA = opponent.force;
            
            const formationBonus = this.formations.find(f => f.nom === this.formation)?.bonus || { attaque: 0, defense: 0 };
            const attackChance = (forceH / forceA) * 0.3 + 0.3 + (formationBonus.attaque / 100);
            const defenseChance = (forceA / forceH) * 0.3 + 0.3 + (formationBonus.defense / 100);
            
            if (Math.random() < attackChance && scoreH < 10) {
                scoreH++;
                const buteur = this.squad.filter(p => p.titulaire && p.poste === "A")[0] 
                    || this.squad.find(p => p.titulaire);
                if (buteur) {
                    buteur.buts++;
                    if (liveEvent) {
                        liveEvent.innerHTML = `⚽⚽⚽ BUT !!! ${buteur.nom} (${minute}') ⚽⚽⚽`;
                        liveEvent.style.animation = "none";
                        setTimeout(() => liveEvent.style.animation = "flash 0.5s", 10);
                    }
                    UI.addLog(`⚽ BUT ! ${buteur.nom} (${minute}')`, "goal");
                    this.createGoalExplosion();
                }
            } else if (Math.random() < defenseChance && scoreA < 10) {
                scoreA++;
                if (liveEvent) {
                    liveEvent.innerHTML = `💀 BUT encaissé ! ${opponent.nom} (${minute}') 💀`;
                    liveEvent.style.animation = "none";
                    setTimeout(() => liveEvent.style.animation = "flash 0.5s", 10);
                }
                UI.addLog(`😭 ${opponent.nom} marque (${minute}')`, "danger");
            } else if (Math.random() < 0.05) {
                if (liveEvent) liveEvent.innerHTML = `🟨 Carton jaune (${minute}')`;
            }
            
            if (liveScore) liveScore.textContent = `${scoreH} - ${scoreA}`;
            if (liveMinute) liveMinute.textContent = `${minute}'`;
        }
        
        // Fin du match
        if (liveEvent) liveEvent.innerHTML = scoreH > scoreA ? "🏆 VICTOIRE ! 🏆" : (scoreH < scoreA ? "💔 DÉFAITE" : "🤝 MATCH NUL");
        
        // Mise à jour des statistiques
        if (scoreH > scoreA) {
            this.season.v++;
            this.budget += 500000;
            this.form.unshift("V");
            UI.addLog(`🏆 Victoire ${scoreH}-${scoreA} ! +500 000 €`, "success");
        } else if (scoreH < scoreA) {
            this.season.d++;
            this.form.unshift("D");
            UI.addLog(`💔 Défaite ${scoreH}-${scoreA}`, "danger");
        } else {
            this.season.n++;
            this.form.unshift("N");
            UI.addLog(`🤝 Match nul ${scoreH}-${scoreA}`, "info");
        }
        
        this.season.bp += scoreH;
        this.season.bc += scoreA;
        
        // Fatigue
        this.squad.filter(p => p.titulaire).forEach(p => {
            p.fatigue = Math.min(100, p.fatigue + 25);
            p.matchs++;
        });
        
        // Blessure aléatoire
        if (Math.random() < 0.1) {
            const blessable = this.squad.filter(p => p.titulaire && !p.blesse);
            if (blessable.length) {
                const blesse = blessable[Math.floor(Math.random() * blessable.length)];
                const duree = Math.floor(Math.random() * 14) + 3;
                blesse.blesse = duree;
                UI.addLog(`🤕 ${blesse.nom} blessé (${duree} jours)`, "danger");
            }
        }
        
        // Résultat
        this.results.unshift({
            date: this.date.toLocaleDateString("fr-FR"),
            home: this.currentClub.nom,
            away: opponent.nom,
            scoreH: scoreH,
            scoreA: scoreA,
            result: scoreH > scoreA ? "Victoire" : (scoreH < scoreA ? "Défaite" : "Nul")
        });
        
        if (this.form.length > 5) this.form = this.form.slice(0, 5);
        
        setTimeout(() => {
            if (liveMatch) liveMatch.style.display = "none";
            this.inMatch = false;
            this.playing = false;
            UI.refreshAll();
            Save.save();
        }, 4000);
    },
    
    createGoalExplosion() {
        const explosion = document.createElement("div");
        explosion.className = "goal-explosion";
        document.body.appendChild(explosion);
        setTimeout(() => explosion.remove(), 500);
    },
    
    // Vendre un joueur
    sellPlayer(playerId) {
        const index = this.squad.findIndex(p => p.id === playerId);
        if (index === -1) return;
        
        const player = this.squad[index];
        const price = Math.floor(player.valeur * 0.8);
        this.budget += price;
        this.squad.splice(index, 1);
        
        UI.addLog(`💰 ${player.nom} vendu pour ${price.toLocaleString("fr-FR")} €`, "success");
        UI.showToast(`${player.nom} vendu ! +${price.toLocaleString("fr-FR")} €`);
        UI.refreshAll();
        Save.save();
    },
    
    // Ajouter à la liste de transfert
    addToTransferList(playerId) {
        const player = this.squad.find(p => p.id === playerId);
        if (!player) return;
        
        if (this.transferList.some(p => p.id === playerId)) {
            UI.showToast("Déjà sur la liste !", true);
            return;
        }
        
        this.transferList.push({ ...player, prixVente: Math.floor(player.valeur * 0.85) });
        UI.addLog(`📋 ${player.nom} ajouté à la liste de transfert`, "info");
        UI.showToast(`${player.nom} mis en vente`);
        UI.refreshAll();
        Save.save();
    },
    
    // Retirer de la liste
    removeFromTransferList(playerId) {
        const index = this.transferList.findIndex(p => p.id === playerId);
        if (index !== -1) {
            this.transferList.splice(index, 1);
            UI.showToast("Joueur retiré de la liste");
            UI.refreshAll();
            Save.save();
        }
    },
    
    // Acheter un joueur
    buyPlayer(player) {
        if (this.squad.length >= 30) {
            UI.showToast("Effectif complet (30 joueurs max) !", true);
            return;
        }
        
        if (this.budget < player.prix) {
            UI.showToast(`Budget insuffisant ! Besoin de ${(player.prix - this.budget).toLocaleString("fr-FR")} €`, true);
            return;
        }
        
        this.budget -= player.prix;
        const newPlayer = { ...player, titulaire: false, fatigue: 0, blesse: 0, buts: 0, passes: 0, matchs: 0 };
        delete newPlayer.prix;
        this.squad.push(newPlayer);
        
        // Retirer du marché
        const marketIndex = this.marketPlayers.findIndex(p => p.id === player.id);
        if (marketIndex !== -1) this.marketPlayers.splice(marketIndex, 1);
        
        UI.addLog(`✨ ${player.nom} rejoint ${this.currentClub.nom} ! ✨`, "success");
        UI.showToast(`${player.nom} a signé !`);
        UI.refreshAll();
        Save.save();
    },
    
    // Entraîner un joueur
    trainPlayer(playerId) {
        const player = this.squad.find(p => p.id === playerId);
        if (!player) return;
        
        if (this.budget < 500000) {
            UI.showToast("500 000 € requis pour l'entraînement", true);
            return;
        }
        
        if (player.fatigue > 60) {
            UI.showToast(`${player.nom} est trop fatigué !`, true);
            return;
        }
        
        this.budget -= 500000;
        player.force = Math.min(99, player.force + Math.floor(Math.random() * 3) + 1);
        player.fatigue = Math.min(100, player.fatigue + 15);
        
        UI.addLog(`💪 ${player.nom} s'entraîne ! Force +${player.force}`, "success");
        UI.showToast(`${player.nom} progresse ! Force: ${player.force}`);
        UI.refreshAll();
        Save.save();
    }
};
