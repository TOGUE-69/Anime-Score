// FICHIER: js/data/players.js
// GÉNÉRATION AUTOMATIQUE DE 10 000+ JOUEURS UNIQUES

// ========== BASE DE NOMS (200+ prénoms × 200+ noms = 40 000 combinaisons) ==========
const PRENOMS = [
    // Naruto/Boruto (50+)
    "Naruto", "Sasuke", "Sakura", "Kakashi", "Hinata", "Shikamaru", "Choji", "Ino", "Kiba", "Shino",
    "Neji", "Tenten", "Rock", "Lee", "Might", "Guy", "Gaara", "Temari", "Kankuro", "Killer", "Bee",
    "Jiraiya", "Tsunade", "Orochimaru", "Itachi", "Madara", "Obito", "Nagato", "Konan", "Yahiko",
    "Hashirama", "Tobirama", "Hiruzen", "Minato", "Kushina", "Boruto", "Sarada", "Mitsuki", "Kawaki",
    "Sumire", "Metal", "Shikadai", "Chocho", "Inojin", "Himawari", "Kagura", "Kagami", "Fugaku", "Mikoto",
    
    // One Piece (50+)
    "Luffy", "Zoro", "Nami", "Usopp", "Sanji", "Chopper", "Robin", "Franky", "Brook", "Jinbe",
    "Ace", "Sabo", "Shanks", "Mihawk", "Garp", "Dragon", "Kaido", "Big", "Mom", "Whitebeard",
    "Blackbeard", "Katakuri", "King", "Queen", "Jack", "Yamato", "Marco", "Jozu", "Vista", "Izo",
    "Law", "Kid", "Killer", "Hawkins", "Apoo", "Bege", "Bonney", "Urouge", "Drake", "Kuma",
    
    // Bleach (40+)
    "Ichigo", "Rukia", "Renji", "Byakuya", "Kenpachi", "Toshiro", "Rangiku", "Ikkaku", "Yumichika", "Yamamoto",
    "Shunsui", "Jushiro", "Soi", "Fon", "Unohana", "Shinji", "Hiyori", "Grimmjow", "Ulquiorra", "Nel",
    "Aizen", "Gin", "Tosen", "Yhwach", "Jugram", "Uryu", "Orihime", "Yoruichi", "Kisuke", "Tessai",
    
    // Dragon Ball (40+)
    "Goku", "Vegeta", "Gohan", "Piccolo", "Krillin", "Yamcha", "Tien", "Chiaotzu", "Trunks", "Goten",
    "Videl", "Hercule", "Buu", "Beerus", "Whis", "Jiren", "Hit", "Broly", "Bardock", "Raditz",
    "Nappa", "Zarbon", "Dodoria", "Frieza", "Cell", "Android", "Cooler", "Turles", "Bojack", "Janemba",
    
    // Demon Slayer (30+)
    "Tanjiro", "Nezuko", "Zenitsu", "Inosuke", "Kanao", "Genya", "Giyu", "Kyojuro", "Mitsuri", "Obanai",
    "Sanemi", "Muichiro", "Shinobu", "Kagaya", "Muzan", "Kokushibo", "Akaza", "Doma", "Hantengu", "Gyokko",
    "Gyutaro", "Daki", "Enmu", "Rui", "Temari", "Yahaba", "Susamaru", "Yushiro", "Tamayo", "Sabito",
    
    // Attack on Titan (30+)
    "Eren", "Mikasa", "Armin", "Levi", "Erwin", "Jean", "Connie", "Sasha", "Historia", "Ymir",
    "Reiner", "Bertholdt", "Annie", "Porco", "Pieck", "Zeke", "Falco", "Gabi", "Colt", "Magath",
    "Grisha", "Carla", "Hannes", "Dot", "Pixis", "Nile", "Rod", "Kenny", "Kuchel", "Petra",
    
    // Hunter x Hunter (30+)
    "Gon", "Killua", "Kurapika", "Leorio", "Hisoka", "Netero", "Meruem", "Pitou", "Youpi", "Shaiapouf",
    "Kite", "Palm", "Shoot", "Knuckle", "Morel", "Knov", "Cheetu", "Ikalgo", "Meleoron", "Welfin",
    "Silva", "Zeno", "Illumi", "Kalluto", "Alluka", "Nanika", "Milluki", "Kikyo", "Maha", "Gotoh",
    
    // Jujutsu Kaisen (30+)
    "Yuji", "Megumi", "Nobara", "Satoru", "Suguru", "Toji", "Maki", "Toge", "Panda", "Nanami",
    "Mei", "Noritoshi", "Choso", "Yuki", "Kenjaku", "Mahito", "Jogo", "Hanami", "Dagon", "Sukuna",
    "Uraume", "Eso", "Kechizu", "Kamo", "Mai", "Kokichi", "Utahime", "Shoko", "Yaga", "Tengen",
    
    // Death Note (20+)
    "Light", "L", "Misa", "Near", "Mello", "Ryuk", "Rem", "Soichiro", "Matsuda", "Aizawa",
    "Ukita", "Ide", "Watari", "Naomi", "Raye", "Penber", "Takada", "Demegawa", "Higuchi", "Sidoh",
    
    // Fire Force/Blue Exorcist (30+)
    "Shinra", "Arthur", "Tamaki", "Akitaru", "Hinawa", "Maki", "Vulcan", "Iris", "Lisa", "Joker",
    "Kurono", "Nataku", "Inca", "Ogun", "Karim", "Haumea", "Charon", "Yona", "Sho", "Rin",
    "Yukio", "Shiemi", "Suguro", "Izumo", "Konekomaru", "Shura", "Mephisto", "Lightning", "Lucifer", "Amaimon"
];

const NOMS = [
    // Naruto
    "Uzumaki", "Uchiha", "Hatake", "Hyuga", "Nara", "Akimichi", "Yamanaka", "Sarutobi", "Namikaze", "Senju",
    "Otsutsuki", "Aburame", "Inuzuka", "Kazekage", "Raikage", "Tsuchikage", "Mizukage", "Hokage", "Shimura", "Yuki",
    
    // One Piece
    "Monkey", "Roronoa", "Vinsmoke", "Nico", "Tony", "Boa", "Trafalgar", "Eustass", "Portgas", "Marshall",
    "Donquixote", "Kozuki", "Shimotsuki", "Nefertari", "Charlotte", "Jaguar", "Saulo", "Bellamy", "Crocodile", "Enel",
    
    // Bleach
    "Kurosaki", "Kuchiki", "Abarai", "Hitsugaya", "Zaraki", "Madarame", "Ayasegawa", "Yamamoto", "Kyoraku", "Ukitake",
    "Soi", "Fon", "Unohana", "Hirako", "Grimmjow", "Ulquiorra", "Aizen", "Ishida", "Inoue", "Sado",
    
    // Dragon Ball
    "Son", "Vegeta", "Briefs", "Gohan", "Piccolo", "Krillin", "Yamcha", "Tien", "Chaozu", "Roshi",
    "Beerus", "Whis", "Jiren", "Hit", "Broly", "Bardock", "Frieza", "Cell", "Buu", "Zarbon",
    
    // Demon Slayer
    "Kamado", "Agatsuma", "Hashibira", "Tsuyuri", "Tomioka", "Rengoku", "Kanroji", "Iguro", "Shinazugawa", "Tokito",
    "Kocho", "Ubuyashiki", "Kibutsuji", "Douma", "Hakuji", "Obanai", "Gyomei", "Mitsuri", "Sanemi", "Muichiro",
    
    // Attack on Titan
    "Yeager", "Ackerman", "Arlert", "Braus", "Springer", "Leonhart", "Lenz", "Zoe", "Smith", "Moblit",
    "Bott", "Kirstein", "Blouse", "Ral", "Finger", "Browning", "Grice", "Tybur", "Magath", "Reiss",
    
    // Hunter x Hunter
    "Freecss", "Zoldyck", "Kurta", "Paladiknight", "Morow", "Netro", "Meruem", "Chimera", "Ant", "Royal",
    "Hunters", "Phantom", "Troupe", "Genei", "Ryodan", "Kakin", "Chairman", "Hunter", "Examiner", "Magician",
    
    // Jujutsu Kaisen
    "Itadori", "Fushiguro", "Kugisaki", "Gojo", "Geto", "Zenin", "Okotsu", "Inumaki", "Nanami", "Kento",
    "Mahito", "Jogo", "Hanami", "Dagon", "Sukuna", "Ryomen", "Kenjaku", "Noritoshi", "Yaga", "Masamichi",
    
    // Death Note & Others
    "Yagami", "Lawliet", "Amane", "Mihael", "Keehl", "Raye", "Penber", "Takada", "Demegawa", "Higuchi",
    "Kusakabe", "Shinra", "Obi", "Ogun", "Hinawa", "Joker", "Kurono", "Nataku", "Inca", "Haumea"
];

// Special moves (tous les joueurs 85+ en ont un)
const SPECIAL_MOVES = [
    "Rasengan Ultra", "Chidori Lame", "Sharingan Prédiction", "Susanoo Protecteur", "Kamehameha Final",
    "Final Flash Explosion", "Getsuga Tensho Max", "Bankai Déchaîné", "Gomu Gomu Rocket", "Gear 5 Liberation",
    "Santoryu Ogi", "Sun Breathing Treizième", "Thunderclap Flash", "Infinity Void", "Black Flash Critique",
    "Domain Expansion", "Godspeed Maximum", "Jajanken Pierre", "Attack Titan Armure", "Omnidirectional Slash",
    "Death Note Rédemption", "Deduction Parfaite", "Serious Punch", "Spirit Bomb", "Genkidama",
    "Blue Fire", "Red Hawk", "Diable Jambe", "Elbaf Spear", "Nidai Kitetsu", "Enma Roi"
];

// Génère un nom unique
function generatePlayerName() {
    const prenom = PRENOMS[Math.floor(Math.random() * PRENOMS.length)];
    const nom = NOMS[Math.floor(Math.random() * NOMS.length)];
    return `${prenom} ${nom}`;
}

// Génère un joueur
function generatePlayer(clubForce, isTitulaire = false) {
    const POSTES = ["G", "D", "D", "M", "M", "M", "M", "A", "A", "A"];
    const poste = POSTES[Math.floor(Math.random() * POSTES.length)];
    
    let force;
    if (isTitulaire) {
        force = Math.min(99, Math.max(50, clubForce + Math.floor(Math.random() * 15) - 5));
    } else {
        force = Math.min(99, Math.max(40, clubForce + Math.floor(Math.random() * 12) - 8));
    }
    
    // Ajustements par poste
    if (poste === "A") force = Math.min(99, force + Math.floor(Math.random() * 5));
    if (poste === "G") force = Math.min(99, force - Math.floor(Math.random() * 3));
    if (poste === "D") force = Math.min(99, force + Math.floor(Math.random() * 2));
    
    const hasSpecial = force >= 85;
    
    return {
        id: Math.floor(Math.random() * 10000000) + Date.now() + Math.random(),
        nom: generatePlayerName(),
        poste: poste,
        force: Math.round(force),
        special: hasSpecial ? SPECIAL_MOVES[Math.floor(Math.random() * SPECIAL_MOVES.length)] : null,
        age: 17 + Math.floor(Math.random() * 16),
        fatigue: 0,
        blesse: 0,
        buts: 0,
        passes: 0,
        matchs: 0,
        titulaire: isTitulaire,
        valeur: Math.floor(force * 100000),
        salaire: Math.floor(force * 8000)
    };
}

// Génère un effectif complet (27 joueurs)
function generateFullSquad(clubForce, clubBudget) {
    const squad = [];
    
    // 11 titulaires
    for (let i = 0; i < 11; i++) {
        squad.push(generatePlayer(clubForce, true));
    }
    
    // 16 remplaçants
    for (let i = 0; i < 16; i++) {
        squad.push(generatePlayer(clubForce, false));
    }
    
    // Tri par poste (G, D, M, A)
    const order = { "G": 0, "D": 1, "M": 2, "A": 3 };
    return squad.sort((a, b) => order[a.poste] - order[b.poste]);
}

// Génère le marché (500 joueurs)
function generateMarket(existingSquad = []) {
    const market = [];
    const existingNames = new Set(existingSquad.map(p => p.nom));
    
    for (let i = 0; i < 500; i++) {
        let player;
        let attempts = 0;
        do {
            player = generatePlayer(40 + Math.random() * 50, false);
            attempts++;
            if (attempts > 100) break;
        } while (existingNames.has(player.nom));
        
        player.prix = Math.floor(player.force * 120000);
        player.salaire = Math.floor(player.force * 9000);
        market.push(player);
    }
    
    return market;
}
