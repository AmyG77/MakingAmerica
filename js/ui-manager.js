const ui = {
    toggleShop() {
        const shop = document.getElementById('shop-overlay');
        if (shop) shop.classList.toggle('hidden');
    },

    switchToModern() {
        // Switch control bars
        document.getElementById('build-controls').classList.add('hidden');
        document.getElementById('restore-controls').classList.remove('hidden');
        
        document.getElementById('npc-text').innerText = "The mills have closed and the malls are empty. Will you restore the Miami soil?";
    }
};
window.ui = ui;
