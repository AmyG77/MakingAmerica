const engine = {
    gold: 800, year: 1830, isOptimized: false,
    history: [], multiplier: 1, currentEra: "FRONTIER",

    init() {
        document.getElementById('ohio-canvas').onclick = (e) => this.build(e);
        setInterval(() => this.tick(), 2000);
    },

    upgradeTools(name, cost, mult) {
        if (this.gold >= cost) {
            this.gold -= cost;
            this.multiplier = mult;
            document.getElementById('npc-text').innerText = `With the ${name}, the valley's output will triple.`;
            this.updateUI();
        }
    },

    build(e) {
        let cost = this.isOptimized ? 25 : 150;
        if (this.gold < cost) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

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
        el.style.zIndex = Math.floor(y); // Depth stacking

        document.getElementById('ohio-canvas').appendChild(el);
        if (this.isOptimized) this.history.push({ year: Math.floor(this.year), type });
    },

    tick() {
        this.year += this.isOptimized ? 5 : 1;
        this.gold += (this.isOptimized ? 1500 : 300) * this.multiplier;
        
        if (this.year > 2026) this.endGame();
        this.updateUI();
    },

    updateUI() {
        document.getElementById('year').innerText = Math.floor(this.year);
        document.getElementById('gold').innerText = Math.floor(this.gold);
    },

    endGame() {
        this.year = 2026;
        document.getElementById('btn-audit').classList.remove('hidden');
        document.getElementById('npc-text').innerText = "The cycle of the Miami Valley is complete.";
    }
};
window.onload = () => engine.init();
