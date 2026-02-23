const audit = {
    generate() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const history = engine.history;
        const tiles = document.querySelectorAll('.tile');

        // --- PDF HEADER ---
        doc.setFont("courier", "bold");
        doc.setFontSize(18);
        doc.text("BUREAU OF HISTORICAL ACCOUNTABILITY: OHIO DIVISION", 20, 20);
        doc.setFontSize(10);
        doc.text(`AUDIT REF: OH-${Math.floor(Math.random() * 1000000)}`, 20, 28);
        doc.line(20, 32, 190, 32);

        // --- SECTION I: THE DISPLACEMENT MAP ---
        doc.text("MAP 1-A: TERRITORIAL IMPACT & DEALING ZONES", 20, 45);
        
        const startX = 60;
        const startY = 55;
        const tileSize = 8;

        // Draw the 10x10 Grid in the PDF
        tiles.forEach((tile, index) => {
            const x = startX + (index % 10) * tileSize;
            const y = startY + Math.floor(index / 10) * tileSize;

            if (tile.dataset.truth === "true") {
                doc.setFillColor(150, 0, 0); // Dark Red for 'Dealings'
                doc.rect(x, y, tileSize, tileSize, 'F');
            } else if (tile.classList.contains('built')) {
                doc.setFillColor(200, 200, 200); // Grey for Standard
                doc.rect(x, y, tileSize, tileSize, 'F');
            } else {
                doc.setDrawColor(200); // Light border for empty land
                doc.rect(x, y, tileSize, tileSize, 'D');
            }
        });

        doc.setFontSize(8);
        doc.text("LEGEND: [Red] Optimized 'Dealing' Zone | [Grey] Standard Growth", 60, startY + 85);

        // --- SECTION II: NARRATIVE DEBT ---
        let yPos = 155;
        doc.setFontSize(12);
        doc.text("SECTION II: SYSTEMIC LOGS", 20, yPos);
        doc.setFontSize(9);
        doc.setFont("courier", "normal");

        if (history.length === 0) {
            doc.text("No 'Dealings' detected. Traditional cultivation recorded.", 20, yPos + 10);
        } else {
            // Deduplicate history by era to keep the PDF concise
            const uniqueEras = [...new Set(history.map(item => {
                if (item.year < 1860) return "1830-1860 Frontier Phase";
                if (item.year < 1920) return "1890-1920 Industrial Phase";
                return "1950+ Urban Phase";
            }))];

            uniqueEras.forEach((eraName) => {
                doc.setFont("courier", "bold");
                doc.text(`> ${eraName}:`, 20, yPos + 10);
                doc.setFont("courier", "italic");
                
                let impactText = "";
                if (eraName.includes("Frontier")) impactText = HistoricalData.optimizations[1830].impact;
                if (eraName.includes("Industrial")) impactText = HistoricalData.optimizations[1890].impact;
                if (eraName.includes("Urban")) impactText = HistoricalData.optimizations[1950].impact;

                doc.text(impactText, 25, yPos + 15, { maxWidth: 160 });
                yPos += 15;
            });
        }

        // --- FINAL VERDICT ---
        const optimizedCount = [...tiles].filter(t => t.dataset.truth === "true").length;
        const impactCoef = (optimizedCount / 100) * 100;

        doc.setFont("courier", "bold");
        doc.setFontSize(12);
        doc.text("SECTION III: FINAL ANALYSIS", 20, 240);
        doc.setFont("courier", "normal");
        doc.text(`Asset Impact Coefficient: ${impactCoef}%`, 20, 250);
        
        const verdict = impactCoef > 30 
            ? "CONCLUSION: This settlement prioritized capital liquidity over indigenous sovereignty and environmental stability."
            : "CONCLUSION: Settlement maintained high friction/low growth, resulting in reduced systemic displacement.";
        
        doc.text(verdict, 20, 260, { maxWidth: 160 });

        doc.save("OHIO_SETTLEMENT_AUDIT_2026.pdf");
    }
};
