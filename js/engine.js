const engine = {
    gold: 800, year: 1830, isOptimized: false,
    history: [], 
    currentMode: 'build',

    assets: {
        nature: ['🌳', '🌻', '🦌'],
        frontier: ['🛖', '🌽', '🪵'],
        industrial: ['🏭', '🏗️', '🚂'],
        modern: ['🏢', '🔋', '🚁']
    },

    init() {
        const canvas = document.getElementById('ohio-canvas');
        canvas.onclick = (e) => this.handleAction(e);
        setInterval(() => this.tick(), 2000);
    },

    setAction(mode) { this.currentMode = mode; },

    toggleOptimization() {
        this.isOptimized = !this.isOptimized;
        document.getElementById('efficiency').innerText = this.isOptimized ? "DEALINGS" : "STANDARD";
    },

    handleAction(e) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        let cost = this.isOptimized ? 20 : 100;
        if (this.gold < cost) return;

        this.gold -= cost;
        this.placeEntity(x, y);
        this.updateUI();
    },

    placeEntity(x, y) {
        const canvas = document.getElementById('ohio-canvas');
        
        // 1. Create Ground Impact
        const dirt = document.createElement('div');
        dirt.className = `clearing ${this.isOptimized ? 'optimized' : ''}`;
        dirt.style.left = `${x}px`; dirt.style.top = `${y}px`;
        canvas.appendChild(dirt);

        // 2. Create Building/Tree
        const el = document.createElement('div');
        el.className = 'entity';
        el.style.left = `${x}px`; el.style.top = `${y}px`;
        el.style.zIndex = Math.floor(y); // Depth Sort

        const pool = this.currentMode === 'nature' ? this.assets.nature : 
                    (this.year < 1890 ? this.assets.frontier : 
                    (this.year < 1960 ? this.assets.industrial : this.assets.modern));
        
        el.innerText = pool[Math.floor(Math.random() * pool.length)];
        canvas.appendChild(el);

        // 3. Record for Audit
        if (this.isOptimized || this.currentMode === 'build') {
            this.history.push({
                x, y, year: Math.floor(this.year), 
                isDeal: this.isOptimized, 
                type: this.currentMode 
            });
        }
    },

    tick() {
        this.year += this.isOptimized ? 5 : 1;
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
        document.getElementById('npc-text').innerText = "The Ohio simulation has concluded. Your Audit report is ready for download.";
    }
};
window.onload = () => engine.init();
