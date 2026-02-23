const engine = {
    gold: 800, year: 1830, isOptimized: false,
    history: [], multiplier: 1, currentAction: 'plow',
    restoredCount: 0,

    init() {
        document.getElementById('ohio-canvas').onclick = (e) => this.handleClick(e);
        setInterval(() => this.tick(), 2000);
    },

    handleClick(e) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (this.currentAction === 'restore') {
            this.restoreLand(e.target, x, y);
        } else {
            this.build(x, y);
        }
    },

    build(x, y) {
        if (this.year >= 2026) return;
        let cost = this.isOptimized ? 25 : 150;
        if (this.gold < cost) return;

        this.gold -= cost;
        this.placeSprite(x, y);
        this.updateUI();
    },

    restoreLand(target, x, y) {
        // Only works on built entities in 2026
        if (this.year < 2026 || !target.classList.contains('entity')) return;
        if (this.gold < 5000) return;

        this.gold -= 5000;
        this.restoredCount++;
        
        // Transform the decaying mall into a forest
        target.className = 'entity ancient-forest';
        target.innerText = ""; // Clear any emojis if used
        
        this.updateUI();
        document.getElementById('npc-text').innerText = "The concrete is cracking. The valley breathes again.";
    },

    placeSprite(x, y) {
        const el = document.createElement('div');
        let type = "corn";
        if (this.year > 1890) type = "factory";
        if (this.year > 1980) type = "mall";
        if (this.year > 2010) type = "decay";

        el.className = `entity ${type}`;
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        el.style.zIndex = Math.floor(y);

        document.getElementById('ohio-canvas').appendChild(el);
        if (this.isOptimized) this.history.push({ year: Math.floor(this.year), type });
    },

    tick() {
        if (this.year < 2026) {
            this.year += this.isOptimized ? 5 : 1;
            this.gold += (this.isOptimized ? 1500 : 300) * this.multiplier;
        }
        this.updateUI();
        if (this.year >= 2026) this.triggerEnding();
    },

    triggerEnding() {
        this.year = 2026;
        document.getElementById('build-controls').classList.add('hidden');
        document.getElementById('restore-controls').classList.remove('hidden');
        document.getElementById('npc-text').innerText = "The factories have closed. You have millions in Net Worth. Will you leave the parking lots, or restore the Miami soil?";
    },

    updateUI() {
        document.getElementById('year').innerText = Math.floor(this.year);
        document.getElementById('gold').innerText = Math.floor(this.gold);
        // Stewardship is % of map restored
        let totalEntities = document.querySelectorAll('.entity').length;
        let stewardship = totalEntities > 0 ? (this.restoredCount / totalEntities) * 100 : 0;
        document.getElementById('steward-score').innerText = Math.floor(stewardship);
    }
};
window.onload = () => engine.init();
