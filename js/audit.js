const audit = {
    generate() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const score = document.getElementById('steward-score').innerText;

        doc.setFont("courier", "bold");
        doc.text("BUREAU OF HISTORICAL ACCOUNTABILITY: MIAMI VALLEY", 20, 20);
        doc.line(20, 25, 190, 25);

        doc.text("SECTION I: THE EXTRACTION CYCLE", 20, 40);
        doc.setFont("courier", "normal");
        doc.text(`Final Net Worth: $${engine.gold.toLocaleString()}`, 20, 50);
        doc.text(`Settlement Footprint: ${document.querySelectorAll('.entity').length} Zones`, 20, 55);

        doc.text("SECTION II: THE RESTORATION DIVIDEND", 20, 75);
        doc.text(`Stewardship Rating: ${score}%`, 20, 85);
        
        if (parseInt(score) > 50) {
            doc.text("VERDICT: REGENERATIVE ACTION TAKEN.", 20, 100);
            doc.setFont("courier", "italic");
            doc.text("By utilizing extracted capital to remove derelict retail", 20, 110);
            doc.text("space, the Governor has initiated a return to pre-1795", 20, 115);
            doc.text("ecological baselines. The Miami land is healing.", 20, 120);
        } else {
            doc.text("VERDICT: PERMANENT EXTRACTION.", 20, 100);
            doc.setFont("courier", "italic");
            doc.text("The Governor chose to retain capital over land health.", 20, 110);
            doc.text("The Miami Valley remains a landscape of dead retail.", 20, 115);
        }

        doc.save("MIAMI_VALLEY_FINAL_STAKES.pdf");
    }
};
