const ui = {
    toggleShop() {
        const shop = document.getElementById('shop-overlay');
        if (shop) shop.classList.toggle('hidden');
    },

    switchToModern() {
        // Switch control bars in 2026
        document.getElementById('build-controls').classList.add('hidden');
        document.getElementById('restore-controls').classList.remove('hidden');
        document.getElementById('npc-text').innerText = "The age of extraction is over. Will you give the land back?";
    }
};
window.ui = ui;
