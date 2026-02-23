const audit = {
    generate() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const tiles = document.querySelectorAll('.tile');

        doc.setFont("courier", "bold");
        doc.text("BUREAU OF HISTORICAL ACCOUNTABILITY: OHIO", 20, 20);
        doc.setFontSize(8);
        doc.text("MAP 1-A: DISPLACEMENT & IMPACT GRID", 20, 30);

        // Draw Map
        tiles.forEach((tile, i) => {
            const x = 60 + (i % 10) * 8;
            const y = 40 + Math.floor(i / 10) * 8;
            if (tile.dataset.truth === "true") {
                doc.setFillColor(150, 0, 0); // Red = Dealing
                doc.rect(x, y, 8, 8, 'F');
            } else {
                doc.setDrawColor(200);
                doc.rect(x, y, 8, 8, 'D');
            }
        });

        doc.setFontSize(10);
        doc.text("SECTION II: SYSTEMIC LOGS", 20, 130);
        let y = 140;
        engine.history.slice(0, 10).forEach(item => {
            const truth = item.year < 1880 ? HistoricalData.optimizations[1830].impact : HistoricalData.optimizations[1890].impact;
            doc.text(`[YEAR ${item.year}] > ${truth}`, 25, y, {maxWidth: 160});
            y += 15;
        });

        doc.save("OHIO_FINAL_AUDIT.pdf");
    }
};
window.audit = audit;
