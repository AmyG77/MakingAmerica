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
            
            const pool = this.year < 1890 ? this.assets.frontier : (this.year < 1970 ? this.assets.industrial : this.assets.modern);
            tile.innerText = pool[Math.floor(Math.random() * pool.length)];

            if (this.isOptimized) {
                tile.dataset.truth = "true";
                this.history.push({ year: Math.floor(this.year), action: "Frontier Dealing" });
            }
            this.updateUI();
        }
    },

    tick() {
        this.year += this.isOptimized ? 5 : 1;
        this.gold += this.isOptimized ? 800 : 150;
        this.updateUI();
        if (this.year >= 2026) this.endGame();
    },

    updateUI() {
        document.getElementById('year').innerText = Math.floor(this.year);
        document.getElementById('gold').innerText = Math.floor(this.gold);
    },

    endGame() {
        this.year = 2026;
        this.updateUI();
        window.ui.switchToModern();
    }
};
window.onload = () => engine.init();
