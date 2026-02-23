const engine = {
    gold: 500, year: 1830, isOptimized: false, isNatureMode: false,
    history: [],
    assets: {
        frontier: ['🏘️', '🌾', '🪵'], industrial: ['🏭', '🏬', '🚂'],
        modern: ['🏙️', '💻', '🔋'], nature: ['🌳', '⛲', '🐰']
    },

    init() {
        const grid = document.getElementById('map-grid');
        for (let i = 0; i < 100; i++) {
            let tile = document.createElement('div');
            tile.className = 'tile';
            tile.onclick = () => this.build(tile);
            grid.appendChild(tile);
        }
        setInterval(() => this.tick(), 2000);
    },

    updatePip(msg) { document.getElementById('npc-text').innerText = msg; },

    toggleOptimization() {
        this.isOptimized = !this.isOptimized;
        this.isNatureMode = false;
        this.updatePip(this.isOptimized ? "Full speed ahead! The Bureau loves efficiency!" : "Back to a slow, cozy pace.");
        document.getElementById('efficiency').innerText = this.isOptimized ? "OPTIMIZED" : "STANDARD";
    },

    toggleNature() {
        this.isNatureMode = !this.isNatureMode;
        this.isOptimized = false;
        this.updatePip("Nature mode? How lovely! The forest creatures are so happy.");
        document.getElementById('efficiency').innerText = "SUSTAINABLE";
    },

    build(tile) {
        if (tile.classList.contains('built')) return;
        let cost = this.isNatureMode ? 150 : (this.isOptimized ? 25 : 100);
        if (this.gold >= cost) {
            this.gold -= cost; tile.classList.add('built');
            const pool = this.isNatureMode ? this.assets.nature : (this.year < 1920 ? this.assets.frontier : (this.year < 1980 ? this.assets.industrial : this.assets.modern));
            tile.innerText = pool[Math.floor(Math.random() * pool.length)];
            if (this.isOptimized) tile.dataset.truth = "true";
            document.getElementById('gold').innerText = Math.floor(this.gold);
        } else {
            this.updatePip("We need more gold! Wait for the seasons to pass.");
        }
    },

    tick() {
        this.year += this.isOptimized ? 5 : (this.isNatureMode ? 0.5 : 1);
        this.gold += this.isOptimized ? 1000 : (this.isNatureMode ? 50 : 200);
        document.getElementById('year').innerText = Math.floor(this.year);
        document.getElementById('gold').innerText = Math.floor(this.gold);

        if (this.year >= 2026) this.endGame();
    },

    endGame() {
        this.year = 2026;
        this.updatePip("It is 2026. The city is finished. It's time to see what you've really built.");
        
        // This is the trigger that was likely missing or failing
        if (window.ui) {
            window.ui.switchToModern();
        } else {
            // Backup if ui-manager fails
            document.body.classList.add('era-2026');
            document.getElementById('btn-audit').classList.remove('hidden');
            document.getElementById('btn-foundations').classList.remove('hidden');
        }
    }
};
window.onload = () => engine.init();
