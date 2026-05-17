// FICHIER: js/ui/screens.js
// INTERFACE UTILISATEUR - TOUS LES ÉCRANS

const UI = {
    currentScreen: "squad",
    
    // Initialiser les événements UI
    init() {
        // Navigation
        document.querySelectorAll(".nav-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const screen = btn.getAttribute("data-screen");
                if (screen) this.show(screen);
            });
        });
        
        // Bouton jour suivant
        const nextBtn = document.getElementById("btn-next-day");
        if (nextBtn) {
            nextBtn.addEventListener("click", () => Game.nextDay());
        }
        
        this.refreshAll();
    },
    
    // Afficher un écran
    show(screenName) {
        this.currentScreen = screenName;
        
        // Cacher tous les écrans
        document.querySelectorAll(".screen").forEach(screen => {
            screen.classList.remove("active");
        });
        
        // Afficher l'écran demandé
        const targetScreen = document.getElementById(`screen-${screenName}`);
        if (targetScreen) {
            targetScreen.classList.add("active");
        }
        
        // Mettre à jour le bouton actif
        document.querySelectorAll(".nav-btn").forEach(btn => {
            if (btn.getAttribute("data-screen") === screenName) {
                btn.style.background = "rgba(255,107,107,0.2)";
                btn.style.color = "#ff6b6b";
            } else {
                btn.style.background = "";
                btn.style.color = "";
            }
        });
        
        // Rafraîchir le contenu
        this.refreshScreen();
    },
    
    // Rafraîchir l'écran actuel
    refreshScreen() {
        switch(this.currentScreen) {
            case "squad":
                this.renderSquad();
                break;
            case "transferlist":
                this.renderTransferList();
                break;
            case "tactics":
                this.renderTactics();
                break;
            case "training":
                this.renderTraining();
                break;
            case "market":
                this.renderMarket();
                break;
            case "league":
                this.renderLeague();
                break;
            case "results":
                this.renderResults();
                break;
            case "stats":
                this.renderStats();
                break;
        }
    },
    
    // Rafraîchir tout
    refreshAll() {
        // Header
        this.updateHeader();
        
        // Écran actuel
        this.refreshScreen();
        
        // Log auto-scroll
        const logDiv = document.getElementById("log");
        if (logDiv) {
            logDiv.scrollTop = 0;
        }
    },
    
    // Mettre à jour le header
    updateHeader() {
        const clubInfo = document.getElementById("club-info");
        const budgetInfo = document.getElementById("budget-info");
        const dateInfo = document.getElementById("date-info");
        
        if (clubInfo && Game.currentClub) {
            clubInfo.innerHTML = `🏆 ${Game.currentClub.nom} | D${Game.currentClub.div}`;
        }
        
        if (budgetInfo) {
            budgetInfo.innerHTML = `💰 ${Game.budget.toLocaleString("fr-FR")} €`;
        }
        
        if (dateInfo) {
            dateInfo.innerHTML = `📅 ${Game.date.toLocaleDateString("fr-FR")}`;
        }
    },
    
    // Rendre l'effectif
    renderSquad() {
        const container = document.getElementById("player-list");
        const countSpan = document.getElementById("squad-count");
        
        if (!container) return;
        
        if (!Game.squad.length) {
            container.innerHTML = '<div class="empty-message">Aucun joueur dans l\'effectif</div>';
            return;
        }
        
        // Séparer titulaires et remplaçants
        const titulaires = Game.squad.filter(p => p.titulaire);
        const remplacants = Game.squad.filter(p => !p.titulaire);
        
        if (countSpan) {
            countSpan.innerHTML = `${titulaires.length}/11 TIT | ${Game.squad.length}/30 MAX`;
        }
        
        let html = "";
        
        // Titulaires
        html += `<div style="margin-bottom: 20px;"><h3 style="color: #4ecdc4;">⚡ TITULAIRES ⚡</h3><div class="grid">`;
        titulaires.forEach(p => {
            html += this.playerCard(p, true);
        });
        html += `</div></div>`;
        
        // Remplaçants
        html += `<div><h3 style="color: #ff6b6b;">🔄 REMPLAÇANTS 🔄</h3><div class="grid">`;
        remplacants.forEach(p => {
            html += this.playerCard(p, false);
        });
        html += `</div></div>`;
        
        container.innerHTML = html;
    },
    
    // Carte joueur
    playerCard(player, isTitulaire) {
        const posteIcons = { G: "🧤", D: "🛡️", M: "⚡", A: "⚔️" };
        const specialBadge = player.special ? `<div class="special-move">✨ ${player.special} ✨</div>` : "";
        const fatigueColor = player.fatigue > 70 ? "#ff6b6b" : (player.fatigue > 40 ? "#f9ca24" : "#4ecdc4");
        
        return `
            <div class="pcard ${isTitulaire ? 'titulaire' : ''}" data-strong="${player.force >= 85}">
                <div class="tag tag-${player.poste}">${posteIcons[player.poste]} ${player.poste}</div>
                <div class="pname">${player.nom}</div>
                <div class="player-stats">
                    <div class="stat-row">
                        <span>💪 Force</span>
                        <div class="force-bar"><div class="force-fill" style="width: ${player.force}%"></div></div>
                        <span>${player.force}</span>
                    </div>
                    <div class="stat-row">
                        <span>😫 Fatigue</span>
                        <div class="force-bar"><div class="force-fill" style="width: ${player.fatigue}%; background: ${fatigueColor}"></div></div>
                        <span>${player.fatigue}%</span>
                    </div>
                    <div class="stat-row">
                        <span>⚽ Buts</span>
                        <span>${player.buts || 0}</span>
                        <span>🎯 Passes</span>
                        <span>${player.passes || 0}</span>
                    </div>
                </div>
                ${specialBadge}
                ${player.blesse > 0 ? `<div class="injury-badge">🤕 Blessé : ${player.blesse} jours</div>` : ""}
                <div class="player-actions">
                    <button class="btn-small" onclick="Game.trainPlayer(${player.id})">💪 Entraîner (500K)</button>
                    <button class="btn-small" onclick="Game.addToTransferList(${player.id})">📋 Vendre</button>
                </div>
            </div>
        `;
    },
    
    // Rendre la liste de transfert
    renderTransferList() {
        const container = document.getElementById("transferlist-list");
        if (!container) return;
        
        if (!Game.transferList.length) {
            container.innerHTML = '<div class="empty-message">📋 Aucun joueur en vente</div>';
            return;
        }
        
        container.innerHTML = `<div class="grid">${Game.transferList.map(p => `
            <div class="pcard">
                <div class="tag tag-${p.poste}">${p.poste}</div>
                <div class="pname">${p.nom}</div>
                <div class="price">💰 ${p.prixVente.toLocaleString("fr-FR")} €</div>
                <div class="player-actions">
                    <button class="btn-small" onclick="Game.sellPlayer(${p.id})">✅ VENDRE MAINTENANT</button>
                    <button class="btn-small" onclick="Game.removeFromTransferList(${p.id})">❌ Retirer</button>
                </div>
            </div>
        `).join('')}</div>`;
    },
    
    // Rendre les tactiques
    renderTactics() {
        const container = document.getElementById("formation-select");
        const pitchContainer = document.getElementById("pitch");
        
        if (!container) return;
        
        // Boutons de formation
        container.innerHTML = `
            <div style="margin-bottom: 20px;">
                <h3 style="margin-bottom: 10px;">🎯 STYLE DÉFENSIF ⛔</h3>
                <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px;">
                    ${Game.formations.filter(f => f.style === "defensif").map(f => `
                        <button class="form-btn ${Game.formation === f.nom ? 'active' : ''}" onclick="Game.setFormation('${f.nom}')">
                            ${f.nom}<br><small>⛔</small>
                        </button>
                    `).join('')}
                </div>
                
                <h3 style="margin-bottom: 10px;">⚖️ STYLE ÉQUILIBRÉ ⚖️</h3>
                <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px;">
                    ${Game.formations.filter(f => f.style === "equilibre").map(f => `
                        <button class="form-btn ${Game.formation === f.nom ? 'active' : ''}" onclick="Game.setFormation('${f.nom}')">
                            ${f.nom}<br><small>⚖️</small>
                        </button>
                    `).join('')}
                </div>
                
                <h3 style="margin-bottom: 10px;">⚡ STYLE OFFENSIF ⚡</h3>
                <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px;">
                    ${Game.formations.filter(f => f.style === "offensif" || f.style === "ultra offensif").map(f => `
                        <button class="form-btn ${Game.formation === f.nom ? 'active' : ''}" onclick="Game.setFormation('${f.nom}')">
                            ${f.nom}<br><small>${f.style === "ultra offensif" ? "💀" : "⚡"}</small>
                        </button>
                    `).join('')}
                </div>
                
                <h3 style="margin-bottom: 10px;">🌀 STYLE SPÉCIAL 🌀</h3>
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    ${Game.formations.filter(f => f.style === "special").map(f => `
                        <button class="form-btn ${Game.formation === f.nom ? 'active' : ''}" onclick="Game.setFormation('${f.nom}')">
                            ${f.nom}<br><small>🌀</small>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Terrain
        const formation = Game.formations.find(f => f.nom === Game.formation);
        if (formation && pitchContainer) {
            const titulaires = Game.squad.filter(p => p.titulaire && !p.blesse);
            const gardiens = titulaires.filter(p => p.poste === "G");
            const defenseurs = titulaires.filter(p => p.poste === "D");
            const milieux = titulaires.filter(p => p.poste === "M");
            const attaquants = titulaires.filter(p => p.poste === "A");
            
            pitchContainer.innerHTML = `
                <div class="formation-name">${Game.formation} - ${Game.getStyleName(formation.style)}</div>
                <div class="pitch-row">${gardiens.map(p => `<div class="pitch-slot"><div class="ps-name">${p.nom.split(" ")[0]}</div><div class="ps-force">${p.force}</div></div>`).join('')}</div>
                <div class="pitch-row">${defenseurs.slice(0, formation.def).map(p => `<div class="pitch-slot"><div class="ps-name">${p.nom.split(" ")[0]}</div><div class="ps-force">${p.force}</div></div>`).join('')}</div>
                <div class="pitch-row">${milieux.slice(0, formation.mil).map(p => `<div class="pitch-slot"><div class="ps-name">${p.nom.split(" ")[0]}</div><div class="ps-force">${p.force}</div></div>`).join('')}</div>
                <div class="pitch-row">${attaquants.slice(0, formation.att).map(p => `<div class="pitch-slot"><div class="ps-name">${p.nom.split(" ")[0]}</div><div class="ps-force">${p.force}</div></div>`).join('')}</div>
            `;
        }
    },
    
    // Rendre l'entraînement
    renderTraining() {
        const container = document.getElementById("training-list");
        if (!container) return;
        
        const avgForce = Math.round(Game.squad.reduce((a,p) => a + p.force, 0) / Game.squad.length);
        const avgFatigue = Math.round(Game.squad.reduce((a,p) => a + p.fatigue, 0) / Game.squad.length);
        const injured = Game.squad.filter(p => p.blesse > 0).length;
        
        container.innerHTML = `
            <div class="stats-row" style="margin-bottom: 20px;">
                <div class="stat-box"><div class="stat-box-val">${avgForce}</div><div class="stat-box-label">FORCE MOYENNE</div></div>
                <div class="stat-box"><div class="stat-box-val">${avgFatigue}%</div><div class="stat-box-label">FATIGUE MOYENNE</div></div>
                <div class="stat-box"><div class="stat-box-val">${injured}</div><div class="stat-box-label">BLESSÉS</div></div>
            </div>
            <div class="grid">${Game.squad.map(p => this.playerCard(p, p.titulaire)).join('')}</div>
        `;
    },
    
    // Rendre le marché
    renderMarket() {
        const container = document.getElementById("market-list");
        if (!container) return;
        
        if (!Game.marketPlayers.length) {
            container.innerHTML = '<div class="empty-message">💸 Aucun joueur disponible sur le marché</div>';
            return;
        }
        
        container.innerHTML = `<div class="grid">${Game.marketPlayers.slice(0, 30).map(p => `
            <div class="pcard">
                <div class="tag tag-${p.poste}">${p.poste}</div>
                <div class="pname">${p.nom}</div>
                <div class="stat-row"><span>💪 Force</span><span>${p.force}</span></div>
                <div class="price">💰 ${p.prix.toLocaleString("fr-FR")} €</div>
                <div class="price">📋 Salaire: ${p.salaire.toLocaleString("fr-FR")} €/sem</div>
                <button class="btn-small" onclick="Game.buyPlayer(${JSON.stringify(p).replace(/"/g, '&quot;')})">✅ RECRUTER</button>
            </div>
        `).join('')}</div>`;
    },
    
    // Rendre le classement
    renderLeague() {
        const container = document.getElementById("league-table");
        if (!container) return;
        
        const leagueClubs = ALL_CLUBS.filter(c => c.pays === "Konoha" && c.div === 1);
        const sorted = [...leagueClubs].sort((a,b) => b.pts - a.pts);
        
        container.innerHTML = `
            <thead>
                <tr><th>#</th><th>Club</th><th>J</th><th>V</th><th>N</th><th>D</th><th>BP</th><th>BC</th><th>Diff</th><th>Pts</th></tr>
            </thead>
            <tbody>
                ${sorted.map((club, i) => `
                    <tr class="${club.id === Game.currentClubId ? 'my-row' : ''}">
                        <td>${i+1}</td>
                        <td>${club.nom}</td>
                        <td>${club.j}</td>
                        <td>${club.g}</td>
                        <td>${club.n}</td>
                        <td>${club.p}</td>
                        <td>${club.bp}</td>
                        <td>${club.bc}</td>
                        <td>${club.bp - club.bc}</td>
                        <td><strong>${club.pts}</strong></td>
                    </tr>
                `).join('')}
            </tbody>
        `;
    },
    
    // Rendre les résultats
    renderResults() {
        const container = document.getElementById("results-list");
        if (!container) return;
        
        if (!Game.results.length) {
            container.innerHTML = '<div class="empty-message">🏁 Aucun match joué pour le moment</div>';
            return;
        }
        
        container.innerHTML = `
            <div class="tbl-wrap">
                <table>
                    <thead><tr><th>Date</th><th>Domicile</th><th>Score</th><th>Extérieur</th><th>Résultat</th></tr></thead>
                    <tbody>
                        ${Game.results.map(r => `
                            <tr>
                                <td>${r.date}</td>
                                <td>${r.home}</td>
                                <td><strong>${r.scoreH} - ${r.scoreA}</strong></td>
                                <td>${r.away}</td>
                                <td class="${r.result === 'Victoire' ? 'victory' : (r.result === 'Défaite' ? 'defeat' : 'draw')}">${r.result}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },
    
    // Rendre les statistiques
    renderStats() {
        const container = document.getElementById("stats-content");
        if (!container) return;
        
        const topScorers = [...Game.squad].sort((a,b) => (b.buts || 0) - (a.buts || 0)).slice(0, 10);
        const topPassers = [...Game.squad].sort((a,b) => (b.passes || 0) - (a.passes || 0)).slice(0, 5);
        
        container.innerHTML = `
            <div class="stats-row">
                <div class="stat-box"><div class="stat-box-val">${Game.season.v}</div><div class="stat-box-label">Victoires</div></div>
                <div class="stat-box"><div class="stat-box-val">${Game.season.n}</div><div class="stat-box-label">Nuls</div></div>
                <div class="stat-box"><div class="stat-box-val">${Game.season.d}</div><div class="stat-box-label">Défaites</div></div>
                <div class="stat-box"><div class="stat-box-val">${Game.season.bp}</div><div class="stat-box-label">Buts marqués</div></div>
                <div class="stat-box"><div class="stat-box-val">${Game.season.bc}</div><div class="stat-box-label">Buts encaissés</div></div>
            </div>
            
            <h3 style="margin: 20px 0 10px;">⚽ MEILLEURS BUTEURS ⚽</h3>
            <div class="tbl-wrap">
                <table>
                    <thead><tr><th>#</th><th>Joueur</th><th>Poste</th><th>Buts</th><th>Matchs</th></tr></thead>
                    <tbody>
                        ${topScorers.map((p, i) => `
                            <tr>
                                <td>${i+1}</td>
                                <td>${p.nom}</td>
                                <td>${p.poste}</td>
                                <td><strong style="color: #ff6b6b;">${p.buts || 0}</strong></td>
                                <td>${p.matchs || 0}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            
            <h3 style="margin: 20px 0 10px;">🎯 MEILLEURS PASSEURS 🎯</h3>
            <div class="tbl-wrap">
                <table>
                    <thead><tr><th>#</th><th>Joueur</th><th>Poste</th><th>Passes</th></tr></thead>
                    <tbody>
                        ${topPassers.map((p, i) => `
                            <tr>
                                <td>${i+1}</td>
                                <td>${p.nom}</td>
                                <td>${p.poste}</td>
                                <td><strong style="color: #4ecdc4;">${p.passes || 0}</strong></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },
    
    // Ajouter un message dans le log
    addLog(message, type = "info") {
        const logDiv = document.getElementById("log");
        if (!logDiv) return;
        
        const colors = {
            goal: "#ff6b6b",
            success: "#4ecdc4",
            danger: "#ff6b6b",
            warning: "#f9ca24",
            info: "#888"
        };
        
        const logEntry = document.createElement("div");
        logEntry.style.color = colors[type] || colors.info;
        logEntry.style.padding = "3px 0";
        logEntry.style.borderBottom = "1px solid rgba(255,107,107,0.1)";
        logEntry.innerHTML = `> ${message}`;
        
        logDiv.prepend(logEntry);
        
        // Limiter à 50 messages
        while (logDiv.children.length > 50) {
            logDiv.removeChild(logDiv.lastChild);
        }
    },
    
    // Afficher une notification
    showToast(message, isError = false) {
        const toast = document.getElementById("toast");
        if (!toast) return;
        
        toast.textContent = message;
        toast.style.background = isError ? "linear-gradient(135deg, #ff4757, #ff6b6b)" : "linear-gradient(135deg, #ff6b6b, #ff8e53)";
        toast.classList.add("show");
        
        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }
};
