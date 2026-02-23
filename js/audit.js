/**
 * Miami Valley Audit Engine
 * Generates a PDF report using jsPDF based on player actions.
 */
const audit = {
    generate() {
        console.log("Audit: Initiating PDF Generation...");
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const stats = window.engine;
        const stewardship = document.getElementById('steward-score').innerText;

        // --- STYLING & HEADER ---
        doc.setFont("courier", "bold");
        doc.setFontSize(18);
        doc.text("BUREAU OF HISTORICAL ACCOUNTABILITY", 20, 20);
        doc.setFontSize(10);
        doc.text("MIAMI VALLEY DIVISION | FINAL REPORT 2026", 20, 28);
        doc.line(20, 32, 190, 32);

        // --- SECTION I: FINANCIAL ANALYSIS ---
        doc.setFont("courier", "bold");
        doc.text("SECTION I: CAPITAL EXTRACTION", 20, 45);
        doc.setFont("courier", "normal");
        doc.text(`Accumulated Net Worth: $${stats.gold.toLocaleString()}`, 20, 55);
        doc.text(`Total Developed Zones: ${document.querySelectorAll('.entity').length}`, 20, 60);

        // --- SECTION II: INDIGENOUS LEGACY ---
        doc.setFont("courier", "bold");
        doc.text("SECTION II: THE COST OF EXPANSION", 20, 80);
        doc.setFont("courier", "normal");
        
        const treaty = window.HistoricalData.treaties.greenville;
        doc.text(`Origin Event: Treaty of Greenville (${treaty.year})`, 20, 90);
        doc.setFont("courier", "italic");
        doc.text(`Impact: ${treaty.impact}`, 25, 95, { maxWidth: 160 });
        
        doc.setFont("courier", "normal");
        doc.text("CITED RESISTANCE LEADERS:", 20, 110);
        doc.text(`- ${window.HistoricalData.figures.littleTurtle.name}`, 25, 120);
        doc.text(`- ${window.HistoricalData.figures.blueJacket.name}`, 25, 125);
        doc.text(`- ${window.HistoricalData.figures.tecumseh.role} ${window.HistoricalData.figures.tecumseh.name}`, 25, 130);

        // --- SECTION III: FINAL STEWARDSHIP VERDICT ---
        doc.setFont("courier", "bold");
        doc.text("SECTION III: STEWARDSHIP ANALYSIS", 20, 150);
        doc.setFont("courier", "normal");
        doc.text(`Final Stewardship Rating: ${stewardship}%`, 20, 160);

        let verdict = "";
        if (parseInt(stewardship) >= 70) {
            verdict = "VERDICT: RESTORATIVE STEWARDSHIP. The Governor utilized extracted capital to heal the soil and re-establish ancient ecological baselines. The Miami land is breathing again.";
        } else if (parseInt(stewardship) > 0) {
            verdict = "VERDICT: PARTIAL REGENERATION. Some effort was made to remove derelict retail space, yet the industrial and retail footprint remains dominant.";
        } else {
            verdict = "VERDICT: PERMANENT EXTRACTION. The simulation concluded with maximum concrete coverage. The Miami Valley remains a landscape of dead retail and historical erasure.";
        }

        doc.setFont("courier", "italic");
        doc.text(verdict, 20, 170, { maxWidth: 160 });

        // --- SECTION IV: VISUAL FOOTPRINT ---
        doc.setFont("courier", "bold");
        doc.text("SECTION IV: TERRITORIAL IMPACT MAP", 20, 200);
        
        // Simple 2D Dot Map of the player's city
        const history = engine.history || [];
        history.forEach((h, i) => {
            const dotX = 30 + (i % 20) * 8;
            const dotY = 210 + Math.floor(i / 20) * 8;
            doc.setFillColor(h.isDeal ? 150 : 200, 0, 0);
            if (dotY < 280) doc.circle(dotX, dotY, 1, 'F');
        });

        // Save File
        doc.save("MIAMI_VALLEY_AUDIT_2026.pdf");
        console.log("Audit: PDF Delivered.");
    }
};

window.audit = audit;
