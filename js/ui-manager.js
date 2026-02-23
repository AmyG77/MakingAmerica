const ui = {
    isRotating: false,

    toggleRotation() {
        if (engine.year >= 2026) return;
        const world = document.getElementById('ohio-world');
        this.isRotating = !this.isRotating;
        
        if (this.isRotating) {
            world.classList.add('rotating-world');
            document.getElementById('btn-rotate').innerText = "⏹️ STOP";
        } else {
            world.classList.remove('rotating-world');
            document.getElementById('btn-rotate').innerText = "🔄 ROTATE";
        }
    },

    switchToModern() {
        const world = document.getElementById('ohio-world');
        world.classList.remove('rotating-world');
        world.style.transform = "rotateX(0deg) rotateZ(0deg) scale(0.8)";
        
        document.getElementById('btn-audit').classList.remove('hidden');
        document.getElementById('btn-rotate').classList.add('hidden');
        document.getElementById('btn-charge').classList.add('hidden');
    }
};
window.ui = ui;
