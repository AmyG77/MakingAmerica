const engine = {
    gold: 800, year: 1830, isOptimized: false,
    history: [], // This is the Moral Debt Ledger
    currentAction: 'sow',

    assets: {
        early: ['🌲', '🌽', '🛖'], // Frontier Ohio
        mid: ['🧱', '🏭', '🏘️'],  // Rising Rust Belt
        late: ['🏗️', '🏚️', '🏢'], // Modern Ohio
        nature: ['🦌', '🌻', '🦅']
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

    setAction(a) { this.currentAction = a; },

    toggleOptimization() {
        this.isOptimized = !this.isOptimized;
        document.getElementById('efficiency').innerText = this.isOptimized ? "DEALINGS" : "STANDARD";
        const msg = this.isOptimized ? "New treaties signed! Growth will be rapid." : "Back to standard cultivation.";
        document.getElementById('npc-text').innerText = msg;
    },

    build(tile) {
        if (tile.classList.contains('built')) return;
        let cost = this.isOptimized ? 20 : 100;

        if (this.gold >= cost) {
            this.gold -= cost;
            tile.classList.add('built');
            
            // Choose asset based on era
            const era = this.year < 1880 ? this.assets.early : (this.year < 1960 ? this.assets.mid : this.assets.late);
            tile.innerText = era[Math.floor(Math.random() * era.length)];

            // RECORD MORAL DEBT
            if (this.isOptimized) {
                const eraContext = this.year < 1860 ? "Land Cession Treaty" : "Industrial Displacement";
                this.history.push({ year: Math.floor(this.year), action: eraContext });
                tile.style.backgroundColor = "#ffd3b6"; // Subtle visual indicator
            }

            this.updateUI();
        }
    },

    tick() {
        this.year += this.isOptimized ? 4 : 1;
        this.gold += this.isOptimized ? 1000 : 200;
        this.updateUI();
        if (this.year >= 2026) this.endGame();
    },

    updateUI() {
        document.getElementById('year').innerText = Math.floor(this.year);
        document.getElementById('gold').innerText = Math.floor(this.gold);
    },

    endGame() {
        this.year = 2026;
        document.getElementById('btn-audit').classList.remove('hidden');
        document.getElementById('npc-text').innerText = "The Ohio simulation is complete. Review your Audit.";
    }
};

window.onload = () => engine.init();
