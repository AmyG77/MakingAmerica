const engine = {
    gold: 100,
    year: 1830,
    isOptimized: false,
    history: [],

    init() {
        console.log("Bureau System: Initializing Frontier...");
        const grid = document.getElementById('map-grid');
        
        if (!grid) {
            console.error("FATAL ERROR: #map-grid not found in index.html");
            return;
        }

        // Create 100 land tiles
        for (let i = 0; i < 100; i++) {
            let tile = document.createElement('div');
            tile.className = 'tile';
            
            // The logic for settling land
            tile.onclick = () => {
                this.build(tile);
            };
            
            grid.appendChild(tile);
        }
        console.log("Bureau System: 100 Tiles Generated.");

        // Start the master clock
        setInterval(() => this.tick(), 2000);
    },

    toggleOptimization() {
        this.isOptimized = !this.isOptimized;
        const display = document.getElementById('efficiency');
        if (display) {
            display.innerText = this.isOptimized ? "OPTIMIZED" : "STANDARD";
            console.log(`System Status: Optimization ${this.isOptimized ? 'Active' : 'Deactivated'}`);
        }
    },

    build(tile) {
        let cost = this.isOptimized ? 5 : 20;
        
        if (this.gold >= cost && !tile.classList.contains('built')) {
            this.gold -= cost;
            tile.classList.add('built');
            
            if (this.isOptimized) {
                tile.style.backgroundColor = "#b71c1c"; // Red highlight for "Optimized" land
                this.history.push({ year: this.year, action: "Optimized Expansion" });
            }
            
            this.updateUI();
            console.log(`Action: Land Settled. Cost: ${cost}. Remaining Gold: ${this.gold}`);
        } else if (this.gold < cost) {
            console.warn("Insufficient Capital for further expansion.");
        }
    },

    tick() {
        // The core "Progress Trap"
        this.year += this.isOptimized ? 5 : 1;
        this.gold += this.isOptimized ? 500 : 50;
        
        this.updateUI();

        if (this.year >= 2026) {
            this.endGame();
        }
    },

    updateUI() {
        const yearEl = document.getElementById('year');
        const goldEl = document.getElementById('gold');
        
        if (yearEl) yearEl.innerText = this.year;
        if (goldEl) goldEl.innerText = this.gold;
    },

    endGame() {
        console.log("2026 AUDIT TRIGGERED.");
        this.year = 2026;
        this.updateUI();
        
        // Show the Audit and X-Ray buttons
        document.getElementById('btn-audit')?.classList.remove('hidden');
        document.getElementById('btn-foundations')?.classList.remove('hidden');
        
        // Change the world theme to Modern
        if (typeof ui !== 'undefined') {
            ui.switchToModern();
        }
    }
};

// Launch the Bureau
window.onload = () => engine.init();
