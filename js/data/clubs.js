// FICHIER: js/data/clubs.js
// LES 324 CLUBS DU MONDE ANIME

const ALL_CLUBS = [
    // ========== KONOHA (Naruto) ==========
    // Division 1
    { id: 1, nom: "Rasengan FC 🍥", pays: "Konoha", division: 1, force: 88, budget: 52000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 2, nom: "Akatsuki United ☁️", pays: "Konoha", division: 1, force: 90, budget: 58000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 3, nom: "Sage Mode FC 🐸", pays: "Konoha", division: 1, force: 86, budget: 45000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 4, nom: "Sharingan City 👁️", pays: "Konoha", division: 1, force: 89, budget: 54000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 5, nom: "Hokage United 👑", pays: "Konoha", division: 1, force: 92, budget: 65000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 6, nom: "Konoha 11 FC 🍃", pays: "Konoha", division: 1, force: 85, budget: 42000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 7, nom: "Jiraiya's SC 🐸", pays: "Konoha", division: 1, force: 87, budget: 48000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 8, nom: "Madara United 🎭", pays: "Konoha", division: 1, force: 93, budget: 70000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 9, nom: "Nine Tails United 🦊", pays: "Konoha", division: 1, force: 91, budget: 62000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 10, nom: "Team 7 FC ⚡", pays: "Konoha", division: 1, force: 86, budget: 46000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 11, nom: "Hidden Leaf SC 🍃", pays: "Konoha", division: 1, force: 84, budget: 40000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 12, nom: "Otsutsuki FC 🌙", pays: "Konoha", division: 1, force: 94, budget: 75000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    // Division 2
    { id: 13, nom: "Byakugan SC 👁️", pays: "Konoha", division: 2, force: 78, budget: 18000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 14, nom: "Anbu Black Ops 🎭", pays: "Konoha", division: 2, force: 80, budget: 20000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 15, nom: "Sand Village FC 🏜️", pays: "Konoha", division: 2, force: 77, budget: 16000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 16, nom: "Karma United 🌀", pays: "Konoha", division: 2, force: 79, budget: 19000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 17, nom: "Kara SC ⚙️", pays: "Konoha", division: 2, force: 81, budget: 22000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 18, nom: "Boruto Academy 📖", pays: "Konoha", division: 2, force: 76, budget: 15000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 19, nom: "Mitsuki FC 🐍", pays: "Konoha", division: 2, force: 78, budget: 17000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 20, nom: "Sarada United 👓", pays: "Konoha", division: 2, force: 77, budget: 16500000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 21, nom: "Orochimaru FC 🐍", pays: "Konoha", division: 2, force: 82, budget: 25000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 22, nom: "Kabuto SC 🦂", pays: "Konoha", division: 2, force: 75, budget: 14000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 23, nom: "Pain's Akatsuki 🌧️", pays: "Konoha", division: 2, force: 83, budget: 28000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 24, nom: "Tobi United 🍥", pays: "Konoha", division: 2, force: 79, budget: 18500000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    // Division 3
    { id: 25, nom: "Rock Lee FC 🍃", pays: "Konoha", division: 3, force: 70, budget: 8000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 26, nom: "Might Guy SC 🔥", pays: "Konoha", division: 3, force: 72, budget: 9000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 27, nom: "Neji United 👁️", pays: "Konoha", division: 3, force: 71, budget: 8500000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 28, nom: "Shikamaru FC 🧠", pays: "Konoha", division: 3, force: 69, budget: 7500000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 29, nom: "Choji SC 🍖", pays: "Konoha", division: 3, force: 68, budget: 7000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 30, nom: "Ino FC 🌸", pays: "Konoha", division: 3, force: 67, budget: 6800000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 31, nom: "Hinata United 🤍", pays: "Konoha", division: 3, force: 69, budget: 7800000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 32, nom: "Temari FC 🌪️", pays: "Konoha", division: 3, force: 70, budget: 8200000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 33, nom: "Kankuro SC 🎭", pays: "Konoha", division: 3, force: 68, budget: 7200000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 34, nom: "Gaara United 🏜️", pays: "Konoha", division: 3, force: 73, budget: 9500000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 35, nom: "Killer Bee FC 🐙", pays: "Konoha", division: 3, force: 74, budget: 10000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 36, nom: "Raikage SC ⚡", pays: "Konoha", division: 3, force: 75, budget: 11000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },

    // ========== ELDIA (Attack on Titan) ==========
    // Division 1
    { id: 37, nom: "Scout Regiment FC 🧱", pays: "Eldia", division: 1, force: 89, budget: 55000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 38, nom: "Survey Corps United ⚔️", pays: "Eldia", division: 1, force: 91, budget: 60000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 39, nom: "Wall Maria SC 🧱", pays: "Eldia", division: 1, force: 85, budget: 43000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 40, nom: "Wall Rose FC 🌹", pays: "Eldia", division: 1, force: 84, budget: 41000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 41, nom: "Wall Sina United 👑", pays: "Eldia", division: 1, force: 86, budget: 46000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 42, nom: "Beast Titan FC 🦍", pays: "Eldia", division: 1, force: 92, budget: 68000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 43, nom: "Armored Titan SC 🛡️", pays: "Eldia", division: 1, force: 90, budget: 62000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 44, nom: "Colossal Titan United 🔥", pays: "Eldia", division: 1, force: 93, budget: 72000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 45, nom: "Female Titan FC ❄️", pays: "Eldia", division: 1, force: 88, budget: 53000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 46, nom: "Jaw Titan SC 🦷", pays: "Eldia", division: 1, force: 87, budget: 50000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 47, nom: "Cart Titan United 🐎", pays: "Eldia", division: 1, force: 85, budget: 44000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 48, nom: "Founding Titan FC 👑", pays: "Eldia", division: 1, force: 95, budget: 80000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    // Division 2
    { id: 49, nom: "Levi Squad FC ⚔️", pays: "Eldia", division: 2, force: 83, budget: 28000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 50, nom: "Hange SC 🔬", pays: "Eldia", division: 2, force: 80, budget: 22000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 51, nom: "Erwin United 📜", pays: "Eldia", division: 2, force: 82, budget: 25000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 52, nom: "Armin FC 📖", pays: "Eldia", division: 2, force: 79, budget: 20000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 53, nom: "Mikasa SC 🧣", pays: "Eldia", division: 2, force: 84, budget: 30000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 54, nom: "Eren United 🔥", pays: "Eldia", division: 2, force: 85, budget: 32000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 55, nom: "Liberio FC ⛓️", pays: "Eldia", division: 2, force: 78, budget: 19000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 56, nom: "Marley United 🦅", pays: "Eldia", division: 2, force: 81, budget: 24000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 57, nom: "Warrior Unit SC 🛡️", pays: "Eldia", division: 2, force: 82, budget: 26000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 58, nom: "Paradis FC 🏝️", pays: "Eldia", division: 2, force: 77, budget: 18000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 59, nom: "Shiganshina United 🚪", pays: "Eldia", division: 2, force: 79, budget: 21000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 60, nom: "Trost SC 🏰", pays: "Eldia", division: 2, force: 76, budget: 17000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    // Division 3
    { id: 61, nom: "Jean FC 🐴", pays: "Eldia", division: 3, force: 71, budget: 8800000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 62, nom: "Connie SC 😄", pays: "Eldia", division: 3, force: 69, budget: 7800000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 63, nom: "Sasha United 🍞", pays: "Eldia", division: 3, force: 70, budget: 8200000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 64, nom: "Historia FC 👑", pays: "Eldia", division: 3, force: 72, budget: 9200000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 65, nom: "Ymir SC ❄️", pays: "Eldia", division: 3, force: 73, budget: 9600000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 66, nom: "Reiner United 🛡️", pays: "Eldia", division: 3, force: 74, budget: 10000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 67, nom: "Bertholdt FC 🔥", pays: "Eldia", division: 3, force: 75, budget: 10500000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 68, nom: "Annie SC ❄️", pays: "Eldia", division: 3, force: 76, budget: 11000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 69, nom: "Porco United 🦷", pays: "Eldia", division: 3, force: 71, budget: 9000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 70, nom: "Pieck FC 🐎", pays: "Eldia", division: 3, force: 72, budget: 9300000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 71, nom: "Zeke SC 🦍", pays: "Eldia", division: 3, force: 77, budget: 12000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 72, nom: "Falco United 🦅", pays: "Eldia", division: 3, force: 70, budget: 8500000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },

    // ========== SOUL SOCIETY (Bleach) ==========
    // Division 1
    { id: 73, nom: "Gotei 13 FC ⚔️", pays: "Soul Society", division: 1, force: 91, budget: 64000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 74, nom: "Espada United 💀", pays: "Soul Society", division: 1, force: 90, budget: 60000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 75, nom: "Bankai FC 🗡️", pays: "Soul Society", division: 1, force: 89, budget: 56000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 76, nom: "Hollow SC 🎭", pays: "Soul Society", division: 1, force: 87, budget: 50000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 77, nom: "Soul Reapers ⚰️", pays: "Soul Society", division: 1, force: 88, budget: 54000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 78, nom: "Arrancar United 💀", pays: "Soul Society", division: 1, force: 86, budget: 48000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 79, nom: "Vasto Lorde FC 👑", pays: "Soul Society", division: 1, force: 92, budget: 66000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 80, nom: "Yamamoto SC 🔥", pays: "Soul Society", division: 1, force: 94, budget: 78000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 81, nom: "Aizen United 🕶️", pays: "Soul Society", division: 1, force: 95, budget: 82000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 82, nom: "Ichigo FC 🗡️", pays: "Soul Society", division: 1, force: 93, budget: 70000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 83, nom: "Rukia SC ❄️", pays: "Soul Society", division: 1, force: 87, budget: 52000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 84, nom: "Kenpachi United ⚔️", pays: "Soul Society", division: 1, force: 92, budget: 68000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },

    // ========== YORBIA (Hunter x Hunter) ==========
    // Division 1
    { id: 85, nom: "Phantom Troupe FC 🕷️", pays: "Yorbia", division: 1, force: 90, budget: 58000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 86, nom: "Hunter Association 🎫", pays: "Yorbia", division: 1, force: 88, budget: 52000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 87, nom: "Zoldyck United ⛓️", pays: "Yorbia", division: 1, force: 92, budget: 65000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 88, nom: "Chimera Ant SC 🐜", pays: "Yorbia", division: 1, force: 91, budget: 62000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 89, nom: "Heaven's Arena 🏟️", pays: "Yorbia", division: 1, force: 85, budget: 44000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 90, nom: "Greed Island FC 🎮", pays: "Yorbia", division: 1, force: 84, budget: 42000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 91, nom: "Dark Continent United 🌑", pays: "Yorbia", division: 1, force: 93, budget: 74000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 92, nom: "Meruem FC 👑", pays: "Yorbia", division: 1, force: 96, budget: 90000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 93, nom: "Netero SC 🙏", pays: "Yorbia", division: 1, force: 94, budget: 76000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 94, nom: "Gon United 🎣", pays: "Yorbia", division: 1, force: 89, budget: 55000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 95, nom: "Killua FC ⚡", pays: "Yorbia", division: 1, force: 90, budget: 59000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 96, nom: "Kurapika SC 🔗", pays: "Yorbia", division: 1, force: 87, budget: 51000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },

    // ========== SHIBUYA (Jujutsu Kaisen) ==========
    // Division 1
    { id: 97, nom: "Gojo United 🔵", pays: "Shibuya", division: 1, force: 96, budget: 88000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 98, nom: "Sukuna FC 👹", pays: "Shibuya", division: 1, force: 95, budget: 85000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 99, nom: "Jujutsu High SC 🏯", pays: "Shibuya", division: 1, force: 90, budget: 60000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 100, nom: "Curse Womb United 🖤", pays: "Shibuya", division: 1, force: 88, budget: 54000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 101, nom: "Disaster Curse FC 🌋", pays: "Shibuya", division: 1, force: 89, budget: 56000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 102, nom: "Geto SC 🙏", pays: "Shibuya", division: 1, force: 92, budget: 67000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 103, nom: "Mahito United 🧩", pays: "Shibuya", division: 1, force: 90, budget: 61000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 104, nom: "Jogo FC 🔥", pays: "Shibuya", division: 1, force: 89, budget: 58000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 105, nom: "Hanami SC 🌿", pays: "Shibuya", division: 1, force: 87, budget: 52000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 106, nom: "Dagon United 💧", pays: "Shibuya", division: 1, force: 86, budget: 49000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 107, nom: "Toji FC 🔪", pays: "Shibuya", division: 1, force: 93, budget: 72000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 108, nom: "Megumi SC 🐕", pays: "Shibuya", division: 1, force: 88, budget: 53000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },

    // ========== TOKYO (Death Note / Classroom Elite) ==========
    // Division 1
    { id: 109, nom: "Advanced Nurturing FC 🎓", pays: "Tokyo", division: 1, force: 85, budget: 45000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 110, nom: "Kira United ✍️", pays: "Tokyo", division: 1, force: 92, budget: 68000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 111, nom: "L's Task Force 🍰", pays: "Tokyo", division: 1, force: 90, budget: 62000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 112, nom: "White Room SC 🤍", pays: "Tokyo", division: 1, force: 89, budget: 58000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 113, nom: "Class A FC 👑", pays: "Tokyo", division: 1, force: 86, budget: 48000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 114, nom: "Class B United 🥈", pays: "Tokyo", division: 1, force: 84, budget: 43000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 115, nom: "Class C SC 🥉", pays: "Tokyo", division: 1, force: 83, budget: 41000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 116, nom: "Class D FC 🟤", pays: "Tokyo", division: 1, force: 82, budget: 39000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 117, nom: "Yagami United 📓", pays: "Tokyo", division: 1, force: 91, budget: 65000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 118, nom: "Watari SC 🕊️", pays: "Tokyo", division: 1, force: 87, budget: 51000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 119, nom: "Mello FC 🍫", pays: "Tokyo", division: 1, force: 88, budget: 55000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false },
    { id: 120, nom: "Near United 🧸", pays: "Tokyo", division: 1, force: 89, budget: 59000000, pts: 0, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, player: false }
];

// Ajouter le club du joueur (sera choisi au début)
let playerClubId = null;
let currentLeague = "Konoha";

// Fonction pour obtenir tous les clubs d'une division
function getClubsByDivision(pays, division) {
    return ALL_CLUBS.filter(c => c.pays === pays && c.division === division);
}

// Fonction pour obtenir tous les clubs d'un pays
function getClubsByCountry(pays) {
    return ALL_CLUBS.filter(c => c.pays === pays);
}

// Fonction pour obtenir un club par ID
function getClubById(id) {
    return ALL_CLUBS.find(c => c.id === id);
}

// Fonction pour obtenir 3 offres aléatoires (1 par division)
function getRandomJobOffers() {
    const d1Clubs = ALL_CLUBS.filter(c => c.division === 1 && !c.player);
    const d2Clubs = ALL_CLUBS.filter(c => c.division === 2 && !c.player);
    const d3Clubs = ALL_CLUBS.filter(c => c.division === 3 && !c.player);
    
    const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);
    
    return [
        shuffle([...d1Clubs])[0],
        shuffle([...d2Clubs])[0],
        shuffle([...d3Clubs])[0]
    ].filter(c => c);
}
