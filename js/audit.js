const audit = {
    generate() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFontSize(22);
        doc.text("BUREAU OF HISTORICAL ACCOUNTABILITY", 20, 20);
        doc.setFontSize(14);
        doc.text(`Final 2026 Dividend Audit: $${engine.gold}`, 20, 30);

        const rows = engine.history.map(h => [h.year, "Optimized Action", "Systemic Profit"]);
        
        doc.autoTable({
            startY: 40,
            head: [['Year', 'Action', 'Impact']],
            body: rows,
        });

        doc.text("NOTE: This dividend is a result of historical choices.", 20, doc.lastAutoTable.finalY + 20);
        doc.save("MAKING_AMERICA_AUDIT.pdf");
    }
};
