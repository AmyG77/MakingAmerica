const ui = {
    switchToModern() {
        console.log("BHA System: Transitioning to 2026 Modern Theme...");
        
        // 1. Change the Body Class to trigger the 2026 CSS
        document.body.classList.remove('era-1830');
        document.body.classList.add('era-2026');

        // 2. Update the HUD and HUD labels
        const hud = document.getElementById('hud');
        if (hud) {
            hud.style.backgroundColor = "#ffffff";
            hud.style.color = "#1a1a1b";
            hud.style.borderBottom = "1px solid #ddd";
        }

        // 3. Reveal the Hidden Buttons
        document.getElementById('btn-audit')?.classList.remove('hidden');
        document.getElementById('btn-foundations')?.classList.remove('hidden');
        
        // Hide the optimization button (the past is settled)
        document.getElementById('btn-optimize')?.classList.add('hidden');

        console.log("BHA System: 2026 UI Active. Audit Available.");
    },

    toggleXray() {
        const overlay = document.getElementById('truth-overlay');
        const isXrayOn = !overlay.classList.contains('hidden');

        if (isXrayOn) {
            overlay.classList.add('hidden');
            console.log("X-Ray Deactivated.");
        } else {
            overlay.classList.remove('hidden');
            this.generateTruthGlow();
            console.log("X-Ray Activated: Viewing Foundations.");
        }
    },

    generateTruthGlow() {
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach(tile => {
            // If the tile was "Optimized" (Built at low cost), it glows red in X-Ray
            if (tile.dataset.truth === "true") {
                tile.style.boxShadow = "inset 0 0 15px #ff0000";
            }
        });
    }
};
