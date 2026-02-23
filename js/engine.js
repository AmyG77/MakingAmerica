const engine = {
    gold: 500,
    year: 1830,
    isOptimized: false,
    history: [],

    // Building Dictionary based on Era
    assets: {
        frontier: ['🏘️', '🌾', '⛪', '🪵'],
        industrial: ['🏭', '🏬', '🚂', '🏦'],
        suburban: ['🏡', '🏪', '🏫', '⛽'],
        modern: ['🏙️', '💻', '🔋', '🚁']
    },

    init() {
        console.log("City Architect: Initializing 1830 Grid...");
        const grid = document.getElementById('map-grid');
        for (let i = 0; i < 100; i++) {
            let tile = document.createElement('div');
            tile.className = 'tile';
            tile.onclick = () => this.build(tile);
            grid.appendChild(tile);
        }
        setInterval(() => this.tick(), 2000);
    },

    toggleOptimization() {
        this.isOptimized = !this.isOptimized;
        document.getElementById('efficiency').innerText = this.isOptimized ? "OPTIMIZED" : "STANDARD";
    },

    getCurrentAsset() {
        if (this.year < 1880) return this.assets.frontier;
        if (this.year < 1940) return this.assets.industrial;
        if (this.year < 1990) return this.assets.suburban;
        return this.assets.modern;
    },

    build(tile) {
        let cost = this.isOptimized ? 25 : 100;
        
        if (this.gold >= cost && !tile.classList.contains('built')) {
            this.gold -= cost;
            tile.classList.add('built');
            
            // Select building based on era
            const eraBuildings = this.getCurrentAsset();
            tile.innerText = eraBuildings[Math.floor(Math.random() * eraBuildings.length)];
            
            if (this.isOptimized) {
                tile.dataset.truth = "true";
                this.history.push({ year: this.year, action: "Aggressive Development" });
                tile.style.borderColor = "#ff8b94"; // Hint of the "Truth"
            }
            
            this.updateUI();
        }
    },

    tick() {
        this.year += this.isOptimized ? 5 : 1;
        this.gold += this.isOptimized ? 1000 : 200; // Optimization = Massive Capital
        
        this.updateUI();

        if (this.year >= 2026) {
            this.endGame();
        }
    },

    updateUI() {
        document.getElementById('year').innerText = this.year;
        document.getElementById('gold').innerText = this.gold;
    },

    endGame() {
        this.year = 2026;
        this.updateUI();
        document.body.classList.add('era-2026');
        document.getElementById('btn-audit')?.classList.remove('hidden');
        document.getElementById('btn-foundations')?.classList.remove('hidden');
        document.getElementById('btn-optimize')?.classList.add('hidden');
    }
};

window.onload = () => engine.init();
