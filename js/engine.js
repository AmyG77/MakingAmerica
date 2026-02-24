const engine = {
    gold: 800, year: 1830, isOptimized: false, multiplier: 1, history: [], restoredCount: 0, currentAction: 'plow',

    init() {
        const canvas = document.getElementById('ohio-canvas');
        canvas.onclick = (e) => this.handleClick(e);
        this.generateInitialWilderness();
        this.gameLoop = setInterval(() => this.tick(), 2000);
    },

    generateInitialWilderness() {
        const canvas = document.getElementById('ohio-canvas');
        for (let i = 0; i < 35; i++) {
            const x = Math.random() * 900 + 50;
            const y = Math.random() * 500 + 50;
            const tree = document.createElement('div');
            tree.className = 'entity ancient-forest initial-wild';
            tree.style.left = `${x}px`;
            tree.style.top = `${y}px`;
            tree.style.zIndex = Math.floor(y);
            canvas.appendChild(tree);
        }
    },

    handleClick(e) {
        // Prevent clicking through to building when shop is open
        if (!document.getElementById('shop-overlay').classList.contains('hidden')) return;

        const rect = document.getElementById('ohio-canvas').getBoundingClientRect();
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
            this.clearWildernessAt(x, y);
            this.placeSprite(x, y);
            this.updateUI();
        }
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
    },

    clearWildernessAt(x, y) {
        const trees = document.querySelectorAll('.initial-wild');
        trees.forEach(tree => {
            const tx = parseFloat(tree.style.left);
            const ty = parseFloat(tree.style.top);
            const dist = Math.sqrt((x - tx)**2 + (y - ty)**2);
            // If tree is within range, remove it to clear land
            if (dist < 60) tree.remove();
        });
    },

    tick() {
        if (this.year < 2026) {
            this.year += this.isOptimized ? 5 : 1;
            this.gold += (this.isOptimized ? 1500 : 300) * this.multiplier;
            
            // Activate Dust Bowl visual in 1930
            if (this.year >= 1930) document.body.classList.add('era-dusty');
            
            this.updateUI();
        } else {
            this.year = 2026;
            clearInterval(this.gameLoop);
            ui.switchToModern();
        }
    },

    updateUI() {
        document.getElementById('year').innerText = Math.floor(this.year);
        document.getElementById('gold').innerText = Math.floor(this.gold);
    },

    upgradeTools(name, cost, mult) {
        if (this.gold >= cost) {
            this.gold -= cost;
            this.multiplier = mult;
            ui.toggleShop();
            document.getElementById('npc-text').innerText = `Upgraded to ${name}! The land yields more now.`;
            this.updateUI();
        }
    },

    setAction(mode) { this.currentAction = mode; }
};
window.onload = () => engine.init();
