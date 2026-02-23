const audit = {
    generate() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const stats = {
            gold: Math.floor(engine.gold),
            history: engine.history,
            year: Math.floor(engine.year)
        };

        // 🎨 PDF Styling
        doc.setFont("courier", "bold");
        doc.setFontSize(22);
        doc.text("BUREAU OF HISTORICAL ACCOUNTABILITY", 20, 30);
        
        doc.setFontSize(12);
        doc.setFont("courier", "normal");
        doc.text(`DATE OF ISSUE: February 23, 2026`, 20, 40);
        doc.text(`SUBJECT: Final Asset Dividend & Structural Audit`, 20, 46);
        doc.line(20, 50, 190, 50);

        // 💰 The Financial Summary
        doc.setFont("courier", "bold");
        doc.text("SECTION I: FINANCIAL POSITION", 20, 65);
        doc.setFont("courier", "normal");
        doc.text(`Calculated Net Worth: $${stats.gold}`, 20, 75);
        doc.text(`Era Classification: ${stats.gold > 50000 ? 'Tier 1 Capitalist' : 'Tier 3 Manager'}`, 20, 81);

        // ⚖️ The Narrative Reveal
        doc.setFont("courier", "bold");
        doc.text("SECTION II: SYSTEMIC IMPACT LOG", 20, 100);
        
        let yPos = 110;
        doc.setFontSize(10);
        
        if (stats.history.length === 0) {
            doc.text("No 'Optimized' actions recorded. The city was built via standard growth.", 20, yPos);
        } else {
            stats.history.slice(0, 10).forEach((entry) => {
                const era = entry.year < 1880 ? 1830 : (entry.year < 1940 ? 1880 : 1940);
                const truth = HistoricalData.optimizations[era].impact;
                
                doc.text(`[${Math.floor(entry.year)}] ${entry.action}:`, 20, yPos);
                doc.setFont("courier", "italic");
                doc.text(`> ${truth}`, 25, yPos + 5, { maxWidth: 160 });
                doc.setFont("courier", "normal");
                
                yPos += 15;
                if (yPos > 270) { doc.addPage(); yPos = 20; }
            });
        }

        // 📝 The Final Verdict
        doc.setFont("courier", "bold");
        doc.text("SECTION III: FINAL VERDICT", 20, yPos + 10);
        doc.setFont("courier", "normal");
        const verdict = stats.gold > 50000 
            ? "Your dividend is ready. It is built upon 200 years of 'Efficiency' that cannot be undone."
            : "Your dividend is modest. Your refusal to 'Optimize' has limited your capital, but preserved the foundation.";
        
        doc.text(verdict, 20, yPos + 20, { maxWidth: 160 });

        // 📎 Save the File
        doc.save(`BHA_AUDIT_REPORT_2026.pdf`);
        console.log("Audit Generated.");
    }
};
