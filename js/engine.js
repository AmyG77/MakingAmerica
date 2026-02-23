const engine = {
    gold: 800, year: 1830, isOptimized: false, multiplier: 1, history: [], restoredCount: 0, currentAction: 'plow',

    init() {
        document.getElementById('ohio-canvas').onclick = (e) => this.handleClick(e);
        setInterval(() => this.tick(), 2000);
    },

    handleClick(e) {
        const rect = document.getElementById('ohio-canvas').getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (this.year >= 2026 && this.currentAction === 'restore') {
            this.restoreLand(e.target);
        } else if (this.year < 2026) {
            this.build(x, y);
        }
    },

    upgradeTools(name, cost, mult) {
        if (this.gold >= cost) {
            this.gold -= cost;
            this.multiplier = mult;
            ui.toggleShop();
            document.getElementById('npc-text').innerText = `Bought ${name}! Production up.`;
            this.updateUI();
        }
    },

    build(x, y) {
        let cost = this.isOptimized ? 25 : 150;
        if (this.gold < cost) return;
        this.gold -= cost;
        this.placeSprite(x, y);
        this.updateUI();
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

    restoreLand(target) {
        if (!target.classList.contains('entity') || this.gold < 5000) return;
        this.gold -= 5000;
        this.restoredCount++;
        target.className = 'entity ancient-forest';
        this.updateUI();
    },

    tick() {
        if (this.year < 2026) {
            this.year += this.isOptimized ? 5 : 1;
            this.gold += (this.isOptimized ? 1500 : 300) * this.multiplier;
            this.updateUI();
        } else {
            ui.switchToModern();
        }
    },

    updateUI() {
        document.getElementById('year').innerText = Math.floor(this.year);
        document.getElementById('gold').innerText = Math.floor(this.gold);
        let total = document.querySelectorAll('.entity').length;
        let score = total > 0 ? (this.restoredCount / total) * 100 : 0;
        document.getElementById('steward-score').innerText = Math.floor(score);
    },

    setAction(mode) { this.currentAction = mode; }
};
window.onload = () => engine.init();
