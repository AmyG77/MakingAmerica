const audit = {
    generate() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Pull history from engine or local storage
        const history = engine.history.length > 0 ? 
                        engine.history : 
                        JSON.parse(localStorage.getItem('moral_debt') || "[]");

        doc.setFont("courier", "bold");
        doc.text("BUREAU OF HISTORICAL ACCOUNTABILITY", 20, 30);
        doc.setFontSize(10);
        doc.text(`DATE: February 23, 2026`, 20, 40);
        doc.line(20, 45, 190, 45);

        doc.text("SECTION II: SYSTEMIC IMPACT LOG", 20, 60);
        
        let y = 70;
        if (history.length === 0) {
            doc.text("No 'Optimized' actions were logged. The foundation is clean.", 20, y);
        } else {
            history.forEach((item) => {
                if (y > 270) { doc.addPage(); y = 20; }
                
                // Get the 'Truth' based on the year of the action
                const era = item.year < 1880 ? 1830 : (item.year < 1940 ? 1880 : 1940);
                const truth = HistoricalData.optimizations[era]?.impact || "Standard expansion impact.";

                doc.setFont("courier", "bold");
                doc.text(`[YEAR ${item.year}] ${item.action}`, 20, y);
                doc.setFont("courier", "italic");
                doc.text(`> ${truth}`, 25, y + 5, { maxWidth: 160 });
                
                y += 15;
            });
        }

        doc.save("FINAL_AUDIT_REPORT.pdf");
        // Optional: Clear storage after audit is claimed
        localStorage.removeItem('moral_debt');
    }
};
