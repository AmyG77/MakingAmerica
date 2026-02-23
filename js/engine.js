const engine = {
    gold: 800, year: 1830, isOptimized: false,
    history: [],
    assets: {
        frontier: ['🛖', '🌽', '🪵'], industrial: ['🏭', '🏗️', '🚂'],
        modern: ['🏢', '💻', '🔋'], nature: ['🌳', '🦌', '🌸']
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

    toggleOptimization() {
        this.isOptimized = !this.isOptimized;
        document.getElementById('efficiency').innerText = this.isOptimized ? "DEALINGS" : "STANDARD";
    },

    build(tile) {
        if (tile.classList.contains('built')) return;
        let cost = this.isOptimized ? 25 : 100;

        if (this.gold >= cost) {
            this.gold -= cost;
            tile.classList.add('built');
            
            // Asset selection
            const era = this.year < 1890 ? this.assets.frontier : (this.year < 1970 ? this.assets.industrial : this.assets.modern);
            tile.innerText = era[Math.floor(Math.random() * era.length)];

            if (this.isOptimized) {
                tile.dataset.truth = "true";
                this.history.push({ year: Math.floor(this.year), action: "Frontier Dealing" });
                tile.style.backgroundColor = "#ffebcc"; 
            }
            document.getElementById('gold').innerText = Math.floor(this.gold);
        }
    },

    tick() {
        this.year += this.isOptimized ? 5 : 1;
        this.gold += this.isOptimized ? 800 : 150;
        document.getElementById('year').innerText = Math.floor(this.year);
        document.getElementById('gold').innerText = Math.floor(this.gold);
        if (this.year >= 2026) this.endGame();
    },

    endGame() {
        this.year = 2026;
        document.getElementById('btn-audit').classList.remove('hidden');
        document.getElementById('ohio-world').style.transform = "rotateX(0deg) rotateZ(0deg) scale(0.8)";
        document.getElementById('npc-text').innerText = "2026 Reached. The 3D model is locked for Audit.";
    }
};
window.onload = () => engine.init();
