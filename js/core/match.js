// FICHIER: js/core/match.js
// SIMULATION DE MATCH AVANCÉE

const MatchSimulator = {
    // État du match
    isLive: false,
    scoreHome: 0,
    scoreAway: 0,
    currentMinute: 0,
    events: [],
    homeTeam: null,
    awayTeam: null,
    homeSquad: [],
    awaySquad: [],
    interval: null,
    
    // Types d'événements
    eventTypes: {
        GOAL: "goal",
        MISS: "miss",
        SAVE: "save",
        FOUL: "foul",
        YELLOW: "yellow",
        RED: "red",
        INJURY: "injury",
        CORNER: "corner",
        OFFSIDE: "offside",
        SPECIAL: "special"
    },
    
    // Phrases d'action (style anime)
    actionPhrases: {
        goal: [
            "⚡ RAIZEN SHOT ! BUT INCROYABLE ! ⚡",
            "🔥 SPÉCIAL MOVE ! LE GARDIEN NE PEUT RIEN FAIRE ! 🔥",
            "💥 EXPLOSION DE CHAKRA ! LE BALLON EST DÉCHIRÉ ! 💥",
            "🌀 TECHNIQUE SECRÈTE ! BUT MAGNIFIQUE ! 🌀",
            "💀 HOKAGE STYLE ! QUEL BUT ! 💀"
        ],
        special: [
            "✨ BAN-KAI ! ATTAQUE LÉGENDAIRE ! ✨",
            "🌈 INFINITY VOID ! LE TEMPS S'ARRÊTE ! 🌈",
            "🦊 NINE TAILS MODE ! PUISSANCE TOTALE ! 🦊",
            "💎 GEAR 5 ! LIBÉRATION TOTALE ! 💎",
            "⚔️ SANTORYU OGI ! NEUF LAMES ! ⚔️"
        ],
        save: [
            "🧤 SHINRA TENSEI ! LE GARDIEN REPOUSSE TOUT ! 🧤",
            "🛡️ INDESTRUCTIBLE ! SAVE XXL ! 🛡️",
            "✨ INFINITY SAVE ! LE BALLON EST ABSORBÉ ! ✨"
        ],
        miss: [
            "😫 SUR LA LUNE ! QUEL GÂCHIS ! 😫",
            "💨 TROP DE PUISSANCE ! HORS CADRE ! 💨",
            "😭 LE POTEK ! IMPOSSIBLE ! 😭"
        ]
    },
    
    // Lancer un match
    startMatch(homeClub, awayClub, homeSquad, awaySquad) {
        this.isLive = true;
        this.scoreHome = 0;
        this.scoreAway = 0;
        this.currentMinute = 0;
        this.events = [];
        this.homeTeam = homeClub;
        this.awayTeam = awayClub;
        this.homeSquad = [...homeSquad];
        this.awaySquad = [...awaySquad];
        
        this.showLiveUI();
        this.simulateMatch();
    },
    
    // Afficher l'interface live
    showLiveUI() {
        const liveMatch = document.getElementById("live-match");
        const liveHome = document.getElementById("live-home");
        const liveAway = document.getElementById("live-away");
        const liveScore = document.getElementById("live-score");
        const liveMinute = document.getElementById("live-minute");
        
        if (liveMatch) liveMatch.style.display = "block";
        if (liveHome) liveHome.textContent = this.homeTeam.nom;
        if (liveAway) liveAway.textContent = this.awayTeam.nom;
        if (liveScore) liveScore.textContent = "0 - 0";
        if (liveMinute) liveMinute.textContent = "0'";
        
        const liveEvents = document.getElementById("live-events");
        if (liveEvents) liveEvents.innerHTML = "";
    },
    
    // Simuler le match
    async simulateMatch() {
        const formationHome = Game.formations.find(f => f.nom === Game.formation);
        const homeStyle = formationHome ? formationHome.style : "equilibre";
        
        for (let minute = 1; minute <= 90; minute++) {
            await new Promise(r => setTimeout(r, 250));
            
            this.currentMinute = minute;
            this.updateUI();
            
            // Calcul des chances selon le style
            let actionChance = 0.35; // Chance de base d'avoir une action
            let goalChance = 0.12;    // Chance de base de but
            
            // Ajustements selon le style de jeu
            if (homeStyle === "offensif") {
                actionChance += 0.05;
                goalChance += 0.03;
            } else if (homeStyle === "defensif") {
                actionChance -= 0.03;
                goalChance -= 0.02;
            } else if (homeStyle === "ultra offensif") {
                actionChance += 0.1;
                goalChance += 0.06;
            }
            
            // Fatigue influence
            const homeFatigue = this.homeSquad.filter(p => p.titulaire).reduce((a,p) => a + p.fatigue, 0) / 11;
            const awayFatigue = this.awaySquad.filter(p => p.titulaire).reduce((a,p) => a + p.fatigue, 0) / 11;
            
            // Force des équipes
            const homeForce = this.homeSquad.filter(p => p.titulaire && !p.blesse).reduce((a,p) => a + p.force, 0) / 11;
            const awayForce = this.awaySquad.filter(p => p.titulaire && !p.blesse).reduce((a,p) => a + p.force, 0) / 11;
            
            const forceRatio = (homeForce / (awayForce + 1)) * (1 - homeFatigue / 200);
            
            // Action ?
            if (Math.random() < actionChance) {
                const isHomeAction = Math.random() < (0.4 + forceRatio * 0.2);
                const actionType = this.determineActionType(isHomeAction, forceRatio, homeStyle);
                
                if (actionType === this.eventTypes.GOAL) {
                    if (isHomeAction) {
                        this.scoreHome++;
                        this.addGoalEvent(true, minute);
                    } else {
                        this.scoreAway++;
                        this.addGoalEvent(false, minute);
                    }
                } else if (actionType === this.eventTypes.SPECIAL) {
                    this.addSpecialEvent(isHomeAction, minute);
                } else {
                    this.addNormalEvent(isHomeAction, actionType, minute);
                }
                
                this.updateScore();
            }
        }
        
        // Fin du match
        this.endMatch();
    },
    
    // Déterminer le type d'action
    determineActionType(isHome, forceRatio, style) {
        const effectiveForce = isHome ? forceRatio : 1 / (forceRatio + 0.1);
        
        // Chances de but
        let goalProb = 0.12 + effectiveForce * 0.08;
        if (style === "offensif") goalProb += 0.04;
        if (style === "ultra offensif") goalProb += 0.07;
        if (style === "defensif") goalProb -= 0.03;
        
        // Special move (joueurs 85+)
        const hasSpecial = isHome ? 
            this.homeSquad.some(p => p.titulaire && p.special && p.force >= 85) :
            this.awaySquad.some(p => p.titulaire && p.special && p.force >= 85);
        
        if (hasSpecial && Math.random() < 0.15) {
            return this.eventTypes.SPECIAL;
        }
        
        if (Math.random() < goalProb) {
            return this.eventTypes.GOAL;
        }
        
        if (Math.random() < 0.15) {
            return this.eventTypes.SAVE;
        }
        
        if (Math.random() < 0.1) {
            return this.eventTypes.MISS;
        }
        
        if (Math.random() < 0.08) {
            return this.eventTypes.YELLOW;
        }
        
        return this.eventTypes.CORNER;
    },
    
    // Ajouter un événement de but
    addGoalEvent(isHome, minute) {
        const scorer = isHome ?
            this.homeSquad.filter(p => p.titulaire && p.poste === "A")[0] ||
            this.homeSquad.find(p => p.titulaire) :
            this.awaySquad.filter(p => p.titulaire && p.poste === "A")[0] ||
            this.awaySquad.find(p => p.titulaire);
        
        if (scorer) {
            scorer.buts++;
            
            // Augmenter la force du joueur après un but (momentum)
            scorer.force = Math.min(99, scorer.force + 1);
            
            const message = `⚽ ${minute}' - BUT DE ${scorer.nom} !!! ${this.getRandomPhrase("goal")} ⚽`;
            this.addEvent(message, "goal", minute);
            
            // Effet explosion
            Game.createGoalExplosion();
        }
    },
    
    // Ajouter un événement spécial
    addSpecialEvent(isHome, minute) {
        const player = isHome ?
            this.homeSquad.find(p => p.titulaire && p.special) :
            this.awaySquad.find(p => p.titulaire && p.special);
        
        if (player) {
            const message = `✨ ${minute}' - ${player.nom} utilise ${player.special} ! ${this.getRandomPhrase("special")} ✨`;
            this.addEvent(message, "special", minute);
            
            // Une chance de but après special
            if (Math.random() < 0.3) {
                setTimeout(() => {
                    if (isHome) {
                        this.scoreHome++;
                        this.addEvent(`⚽ ${minute}+1 - BUT SUR SPECIAL MOVE ! ⚽`, "goal", minute + 1);
                    } else {
                        this.scoreAway++;
                        this.addEvent(`⚽ ${minute}+1 - BUT SUR SPECIAL MOVE ! ⚽`, "goal", minute + 1);
                    }
                    this.updateScore();
                }, 100);
            }
        }
    },
    
    // Ajouter un événement normal
    addNormalEvent(isHome, type, minute) {
        let message = "";
        let logType = "info";
        
        switch(type) {
            case this.eventTypes.SAVE:
                message = `🧤 ${minute}' - ${this.getRandomPhrase("save")} 🧤`;
                logType = "info";
                break;
            case this.eventTypes.MISS:
                message = `😫 ${minute}' - ${this.getRandomPhrase("miss")} 😫`;
                logType = "danger";
                break;
            case this.eventTypes.YELLOW:
                message = `🟨 ${minute}' - Carton jaune ! 🟨`;
                logType = "warning";
                break;
            case this.eventTypes.RED:
                message = `🟥 ${minute}' - CARTON ROUGE ! 🟥`;
                logType = "danger";
                break;
            case this.eventTypes.CORNER:
                message = `🎯 ${minute}' - Corner bien tiré ! 🎯`;
                logType = "info";
                break;
            default:
                message = `⚡ ${minute}' - Action dangereuse ! ⚡`;
        }
        
        this.addEvent(message, logType, minute);
    },
    
    // Ajouter un événement à l'UI
    addEvent(message, type, minute) {
        this.events.push({ minute, message, type });
        
        const liveEvent = document.getElementById("live-event");
        const liveEvents = document.getElementById("live-events");
        
        if (liveEvent) {
            liveEvent.innerHTML = message;
            liveEvent.style.animation = "none";
            setTimeout(() => liveEvent.style.animation = "flash 0.3s", 10);
        }
        
        if (liveEvents) {
            const eventDiv = document.createElement("div");
            eventDiv.className = `live-event-${type}`;
            eventDiv.innerHTML = message;
            eventDiv.style.fontSize = "0.8em";
            eventDiv.style.padding = "3px";
            eventDiv.style.borderBottom = "1px solid rgba(255,107,107,0.2)";
            liveEvents.prepend(eventDiv);
            
            // Limiter le nombre d'événements
            while (liveEvents.children.length > 15) {
                liveEvents.removeChild(liveEvents.lastChild);
            }
        }
        
        // Log dans la console de jeu
        UI.addLog(message, type === "goal" ? "goal" : (type === "danger" ? "danger" : "info"));
    },
    
    // Mettre à jour l'UI
    updateUI() {
        const liveMinute = document.getElementById("live-minute");
        if (liveMinute) liveMinute.textContent = `${this.currentMinute}'`;
        
        this.updateScore();
    },
    
    updateScore() {
        const liveScore = document.getElementById("live-score");
        if (liveScore) liveScore.textContent = `${this.scoreHome} - ${this.scoreAway}`;
    },
    
    // Fin du match
    endMatch() {
        this.isLive = false;
        
        const liveEvent = document.getElementById("live-event");
        const liveMinute = document.getElementById("live-minute");
        
        if (this.scoreHome > this.scoreAway) {
            if (liveEvent) liveEvent.innerHTML = "🏆 VICTOIRE ! MATCH TERMINÉ 🏆";
            UI.addLog(`🏆 Victoire ${this.scoreHome}-${this.scoreAway} ! +500 000 €`, "success");
        } else if (this.scoreHome < this.scoreAway) {
            if (liveEvent) liveEvent.innerHTML = "💔 DÉFAITE... MATCH TERMINÉ 💔";
            UI.addLog(`💔 Défaite ${this.scoreHome}-${this.scoreAway}`, "danger");
        } else {
            if (liveEvent) liveEvent.innerHTML = "🤝 MATCH NUL 🤝";
            UI.addLog(`🤝 Match nul ${this.scoreHome}-${this.scoreAway}`, "info");
        }
        
        if (liveMinute) liveMinute.textContent = "FT";
        
        // Mettre à jour les statistiques après 3 secondes
        setTimeout(() => {
            const liveMatch = document.getElementById("live-match");
            if (liveMatch) liveMatch.style.display = "none";
            Game.inMatch = false;
            Game.playing = false;
        }, 3000);
    },
    
    // Phrases aléatoires
    getRandomPhrase(type) {
        const phrases = this.actionPhrases[type] || this.actionPhrases.miss;
        return phrases[Math.floor(Math.random() * phrases.length)];
    }
};
