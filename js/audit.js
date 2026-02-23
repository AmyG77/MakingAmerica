const audit = {
    generate() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const stewardship = document.getElementById('steward-score').innerText;

        doc.setFont("courier", "bold");
        doc.text("BUREAU OF HISTORICAL ACCOUNTABILITY: MIAMI VALLEY", 20, 20);
        doc.line(20, 25, 190, 25);

        doc.text("SECTION I: TERRITORIAL DISPLACEMENT", 20, 40);
        doc.setFont("courier", "normal");
        doc.text(`Recorded Removal Era: 1795 Treaty of Greenville.`, 20, 50);
        doc.text(`Indigenous Resistance: Blue Jacket & Tecumseh.`, 20, 55);

        doc.text("SECTION II: THE INDUSTRIAL REMAINDER", 20, 75);
        doc.text(`Final Net Worth: $${engine.gold.toLocaleString()}`, 20, 85);
        doc.text(`2026 Stewardship Rating: ${stewardship}%`, 20, 90);

        doc.setFont("courier", "italic");
        if (parseInt(stewardship) > 50) {
            doc.text("VERDICT: Land restoration initiated. The valley returns to stewardship.", 20, 110);
        } else {
            doc.text("VERDICT: Permanent extraction. Landscape remains dead retail space.", 20, 110);
        }

        doc.save("MIAMI_VALLEY_AUDIT.pdf");
    }
};
