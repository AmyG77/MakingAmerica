const engine = {
    gold: 500,
    year: 1830,
    isOptimized: false,
    isNatureMode: false,
    history: [],

    assets: {
        frontier: ['🏘️', '🌾', '⛪', '🪵'],
        industrial: ['🏭', '🏬', '🚂', '🏦'],
        modern: ['🏙️', '💻', '🔋', '🚁'],
        nature: ['🌳', '⛲', '🦌', '🌸', '🦢']
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

    // NPC Logic: Pip gives directions
    updatePip(message) {
        const textEl = document.getElementById('npc-text');
        if (textEl) textEl.innerText = message;
    },

    toggleNature() {
        this.isNatureMode = !this.isNatureMode;
        this.isOptimized = false;
        this.updatePip("Oh! Planting gardens? The forest creatures thank you, but the bank may not...");
        this.updateUI();
    },

    toggleOptimization() {
        this.isOptimized = !this.isOptimized;
        this.isNatureMode = false;
        this.updatePip(this.isOptimized ? 
            "Speeding up? I like your hustle! The Bureau loves efficient Governors." : 
            "Back to a steady pace. Quality over quantity, I suppose!");
        this.updateUI();
    },

    build(tile) {
        if (tile.classList.contains('built')) return;
        let cost = this.isNatureMode ? 150 : (this.isOptimized ? 25 : 100);

        if (this.gold >= cost) {
            this.gold -= cost;
            tile.classList.add('built');
            
            const pool = this.isNatureMode ? this.assets.nature : this.getCurrentAsset();
            tile.innerText = pool[Math.floor(Math.random() * pool.length)];
            
            if (this.isOptimized) tile.dataset.truth = "true";
            this.updateUI();
        } else {
            this.updatePip("We're short on gold! Try waiting for the next season's dividends.");
        }
    },

    getCurrentAsset() {
        if (this.year < 1890) return this.assets.frontier;
        if (this.year < 1960) return this.assets.industrial;
        return this.assets.modern;
    },

    tick() {
        this.year += this.isOptimized ? 5 : (this.isNatureMode ? 0.5 : 1);
        this.gold += this.isOptimized ? 1000 : (this.isNatureMode ? 50 : 200);
        
        // Mid-game NPC prompts
        if (this.year > 1900 && this.gold < 1000) this.updatePip("1900 already? We need more growth if we want to hit the 2026 Audit!");
        
        this.updateUI();
        if (this.year >= 2026) this.endGame();
    },

    updateUI() {
        document.getElementById('year').innerText = Math.floor(this.year);
        document.getElementById('gold').innerText = Math.floor(this.gold);
        document.getElementById('efficiency').innerText = this.isOptimized ? "OPTIMIZED" : (this.isNatureMode ? "SUSTAINABLE" : "STANDARD");
    },

    endGame() {
        this.year = 2026;
        this.updateUI();
        this.updatePip("It's 2026. The simulation is complete. It's time to see what lies beneath our garden.");
        document.body.classList.add('era-2026');
        document.getElementById('btn-audit')?.classList.remove('hidden');
        document.getElementById('btn-foundations')?.classList.remove('hidden');
        document.getElementById('btn-optimize')?.classList.add('hidden');
        document.getElementById('btn-nature')?.classList.add('hidden');
    }
};

window.onload = () => engine.init();
