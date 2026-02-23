/**
 * UI Manager: The Director of the 2026 Reveal
 * This handles the aesthetic shift and the 'X-Ray' logic.
 */
const ui = {
    // 1. THE 2026 TRANSITION
    switchToModern() {
        console.log("BHA System: Initializing 2026 Theme...");
        
        // Change the world to the modern, clinical look
        document.body.classList.remove('era-1830');
        document.body.classList.add('era-2026');

        // Reveal the "Hidden" Bureau buttons
        const auditBtn = document.getElementById('btn-audit');
        const foundationsBtn = document.getElementById('btn-foundations');
        
        if (auditBtn) auditBtn.classList.remove('hidden');
        if (foundationsBtn) foundationsBtn.classList.remove('hidden');

        // Hide the optimization and nature tools (the past is locked)
        document.getElementById('btn-optimize')?.classList.add('hidden');
        document.getElementById('btn-nature')?.classList.add('hidden');

        // Optional: Trigger a sound effect or visual flash here
        this.flashScreen();
    },

    // 2. THE X-RAY LOGIC (View Foundations)
    toggleXray() {
        const overlay = document.getElementById('truth-overlay');
        if (!overlay) return;

        const isActivating = overlay.classList.contains('hidden');

        if (isActivating) {
            overlay.classList.remove('hidden');
            document.getElementById('btn-foundations').innerText = "🌿 HIDE FOUNDATIONS";
            this.highlightTruths();
        } else {
            overlay.classList.add('hidden');
            document.getElementById('btn-foundations').innerText = "🔍 VIEW FOUNDATIONS";
            this.clearTruthHighlights();
        }
    },

    // 3. REVEALING THE "TRUTH" MARKERS
    highlightTruths() {
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach(tile => {
            // If the tile was "Optimized" (built cheaply), it glows red
            if (tile.dataset.truth === "true") {
                tile.style.boxShadow = "inset 0 0 25px #ff4444";
                tile.style.borderColor = "#ff4444";
                tile.style.transform = "scale(0.95)";
            }
        });
    },

    clearTruthHighlights() {
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach(tile => {
            tile.style.boxShadow = "";
            tile.style.borderColor = "";
            tile.style.transform = "";
        });
    },

    flashScreen() {
        const flash = document.createElement('div');
        flash.style.position = 'fixed';
        flash.style.top = '0';
        flash.style.left = '0';
        flash.style.width = '100vw';
        flash.style.height = '100vh';
        flash.style.backgroundColor = 'white';
        flash.style.zIndex = '9999';
        flash.style.pointerEvents = 'none';
        flash.style.transition = 'opacity 1s ease';
        document.body.appendChild(flash);

        setTimeout(() => {
            flash.style.opacity = '0';
            setTimeout(() => flash.remove(), 1000);
        }, 100);
    }
};

// Expose to window so engine.js can find it
window.ui = ui;
