/**
 * Making America: Miami Valley Engine
 * This script manages the simulation timeline, asset placement, and state transitions.
 */
const engine = {
    gold: 800,
    year: 1830,
    isOptimized: false,
    multiplier: 1,
    history: [],
    restoredCount: 0,
    currentAction: 'plow', // Options: 'plow', 'restore'

    init() {
        console.log("Miami Valley Engine: Initialized.");
        const canvas = document.getElementById('ohio-canvas');
        
        // Listen for clicks on the wilderness canvas
        canvas.onclick = (e) => this.handleClick(e);
        
        // Start the game loop (1 second = 6 months - 2.5 years depending on speed)
        this.gameTick = setInterval(() => this.tick(), 2000);
    },

    handleClick(e) {
        const canvas = document.getElementById('ohio-canvas');
        const rect = canvas.getBoundingClientRect();
        
        // Calculate coordinates relative to the canvas
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // If it is 2026 and we are in restoration mode
        if (this.year >= 2026 && this.currentAction === 'restore') {
            this.handleRestoration(e.target);
        } 
        // Standard building phase (Pre-2026)
        else if (this.year < 2026) {
            this.build(x, y);
        }
    },

    build(x, y) {
        let cost = this.isOptimized ? 25 : 150;
        
        if (this.gold >= cost) {
            this.gold -= cost;
            this.placeSprite(x, y);
            this.updateUI();
        } else {
            document.getElementById('npc-text').innerText = "We're short on gold, Governor. Wait for the harvest.";
        }
    },

    placeSprite(x, y) {
        const canvas = document.getElementById('ohio-canvas');
        const el = document.createElement('div');
        
        // Determine the sprite type based on the historical era
        let type = "corn";
        if (this.year > 1890) type = "factory";
        if (this.year > 1980) type = "mall";
        if (this.year > 2010) type = "decay";

        el.className = `entity ${type}`;
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        
        // DEPTH SORTING: Objects lower on screen (higher Y) appear in front
        el.style.zIndex = Math.floor(y);

        canvas.appendChild(el);

        // Log to history for the Audit
        if (this.isOptimized) {
            this.history.push({ year: Math.floor(this.year), type: type });
        }
    },

    handleRestoration(target) {
        // Only target existing buildings/entities
        if (!target.classList.contains('entity')) return;
        
        const cost = 5000;
        if (this.gold >= cost) {
            this.gold -= cost;
            this.restoredCount++;
            
            // Transform the decay into the Ancient Oak
            target.className = 'entity ancient-forest';
            
            this.updateUI();
            document.getElementById('npc-text').innerText = "A magnificent oak takes root. The soil is healing.";
        } else {
            document.getElementById('npc-text').innerText = "Restoration is expensive. We need more capital to buy back the land.";
        }
    },

    upgradeTools(name, cost, mult) {
        if (this.gold >= cost) {
            this.gold -= cost;
            this.multiplier = mult;
            
            // Interaction with UI Manager to close Barnaby's shop
            if (window.ui) window.ui.toggleShop();
            
            document.getElementById('npc-text').innerText = `Excellent trade! This ${name} will increase our yields.`;
            this.updateUI();
        }
    },

    toggleOptimization() {
        this.isOptimized = !this.isOptimized;
        document.getElementById('efficiency').innerText = this.isOptimized ? "OPTIMIZED" : "STANDARD";
        
        const msg = this.isOptimized ? 
            "The 'Dealings' are signed. Expansion will now accelerate." : 
            "Returning to standard growth. Quality over speed.";
        document.getElementById('npc-text').innerText = msg;
    },

    tick() {
        if (this.year < 2026) {
            // Progress Time
            this.year += this.isOptimized ? 5 : 1;
            
            // Generate Revenue (Scales with shop upgrades and speed)
            const baseIncome = this.isOptimized ? 1500 : 300;
            this.gold += baseIncome * this.multiplier;
            
            this.updateUI();
        } else {
            // Year 2026 Reached: Trigger the Ending
            this.year = 2026;
            this.updateUI();
            if (window.ui) window.ui.switchToModern();
        }
    },

    updateUI() {
        document.getElementById('year').innerText = Math.floor(this.year);
        document.getElementById('gold').innerText = Math.floor(this.gold);
        
        // Calculate Stewardship as % of total map built that has been restored
        const totalEntities = document.querySelectorAll('.entity').length;
        const stewardship = totalEntities > 0 ? (this.restoredCount / totalEntities) * 100 : 0;
        document.getElementById('steward-score').innerText = Math.floor(stewardship);
    },

    setAction(mode) {
        this.currentAction = mode;
        console.log(`Current Action set to: ${mode}`);
    }
};

// Expose engine to the window and start
window.engine = engine;
window.onload = () => engine.init();
