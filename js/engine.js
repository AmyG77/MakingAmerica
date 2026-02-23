const engine = {
    gold: 800,
    year: 1830,
    isOptimized: false,
    multiplier: 1,
    history: [],
    restoredCount: 0,
    currentAction: 'plow',

    init() {
        const canvas = document.getElementById('ohio-canvas');
        canvas.onclick = (e) => this.handleClick(e);
        
        // --- NEW: PRE-POPULATE THE FOREST ---
        this.generateInitialWilderness();
        
        this.gameTick = setInterval(() => this.tick(), 2000);
    },

    // Generates the ancient Miami Valley forest
    generateInitialWilderness() {
        const canvas = document.getElementById('ohio-canvas');
        for (let i = 0; i < 45; i++) {
            const x = Math.random() * 900 + 50; // Random X within canvas
            const y = Math.random() * 500 + 50; // Random Y within canvas
            
            const tree = document.createElement('div');
            tree.className = 'entity ancient-forest initial-wild';
            tree.style.left = `${x}px`;
            tree.style.top = `${y}px`;
            tree.style.zIndex = Math.floor(y);
            canvas.appendChild(tree);
        }
    },

    handleClick(e) {
        const canvas = document.getElementById('ohio-canvas');
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (this.year >= 2026 && this.currentAction === 'restore') {
            this.handleRestoration(e.target);
        } else if (this.year < 2026) {
            this.build(x, y);
        }
    },

    build(x, y) {
        let cost = this.isOptimized ? 25 : 150;
        
        if (this.gold >= cost) {
            this.gold -= cost;
            
            // --- NEW: CLEAR THE LAND ---
            this.clearWildernessAt(x, y);
            
            this.placeSprite(x, y);
            this.updateUI();
        }
    },

    // Removes initial trees in the immediate vicinity of the new building
    clearWildernessAt(x, y) {
        const entities = document.querySelectorAll('.initial-wild');
        entities.forEach(tree => {
            const tx = parseFloat(tree.style.left);
            const ty = parseFloat(tree.style.top);
            const distance = Math.sqrt((x - tx)**2 + (y - ty)**2);
            
            // If the tree is within 40 pixels of the new build site, clear it
            if (distance < 45) {
                tree.remove();
            }
        });
    },

    placeSprite(x, y) {
        const canvas = document.getElementById('ohio-canvas');
        const el = document.createElement('div');
        
        let type = "corn";
        if (this.year > 1890) type = "factory";
        if (this.year > 1980) type = "mall";
        if (this.year > 2010) type = "decay";

        el.className = `entity ${type}`;
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        el.style.zIndex = Math.floor(y);

        canvas.appendChild(el);

        if (this.isOptimized) {
            this.history.push({ year: Math.floor(this.year), type: type });
        }
    },

    // ... Rest of the engine remains the same (restoreLand, tick, etc.)
    handleRestoration(target) {
        if (!target.classList.contains('entity')) return;
        const cost = 5000;
        if (this.gold >= cost) {
            this.gold -= cost;
            this.restoredCount++;
            target.className = 'entity ancient-forest';
            this.updateUI();
            document.getElementById('npc-text').innerText = "Stewardship restores what was once cleared.";
        }
    },

    upgradeTools(name, cost, mult) {
        if (this.gold >= cost) {
            this.gold -= cost;
            this.multiplier = mult;
            if (window.ui) window.ui.toggleShop();
            this.updateUI();
        }
    },

    toggleOptimization() {
        this.isOptimized = !this.isOptimized;
        document.getElementById('efficiency').innerText = this.isOptimized ? "OPTIMIZED" : "STANDARD";
    },

    tick() {
        if (this.year < 2026) {
            this.year += this.isOptimized ? 5 : 1;
            const baseIncome = this.isOptimized ? 1500 : 300;
            this.gold += baseIncome * this.multiplier;
            this.updateUI();
        } else {
            this.year = 2026;
            this.updateUI();
            if (window.ui) window.ui.switchToModern();
        }
    },

    updateUI() {
        document.getElementById('year').innerText = Math.floor(this.year);
        document.getElementById('gold').innerText = Math.floor(this.gold);
        const total = document.querySelectorAll('.entity').length;
        const stewardship = total > 0 ? (this.restoredCount / total) * 100 : 0;
        document.getElementById('steward-score').innerText = Math.floor(stewardship);
    },

    setAction(mode) { this.currentAction = mode; }
};

window.engine = engine;
window.onload = () => engine.init();
