const engine = {
    gold: 100,
    year: 1830,
    isOptimized: false,
    history: [],

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
        document.getElementById('efficiency').innerText = this.isOptimized ? "OPTIMIZED" : "STANDARD";
    },

    build(tile) {
        let cost = this.isOptimized ? 5 : 20;
        if (this.gold >= cost) {
            this.gold -= cost;
            tile.classList.add('built');
            if (this.isOptimized) {
                tile.dataset.truth = true;
                this.history.push({ year: this.year, action: "Optimized Expansion" });
            }
            this.updateUI();
        }
    },

    tick() {
        this.year += this.isOptimized ? 5 : 1;
        this.gold += this.isOptimized ? 500 : 50;
        this.updateUI();
        if (this.year >= 2026) this.endGame();
    },

    updateUI() {
        document.getElementById('year').innerText = this.year;
        document.getElementById('gold').innerText = this.gold;
        if (this.year >= 2026) ui.switchToModern();
    },

    endGame() {
        this.year = 2026;
        document.getElementById('btn-audit').classList.remove('hidden');
        document.getElementById('btn-foundations').classList.remove('hidden');
    }
};

window.onload = () => engine.init();
