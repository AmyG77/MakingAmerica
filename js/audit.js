const audit = {
    generate() {
        try {
            const { jsPDF } = window.jspdf;
            if (!jsPDF) return alert("Library missing!");

            const doc = new jsPDF();
            doc.setFont("courier", "bold");
            doc.text("BUREAU OF HISTORICAL ACCOUNTABILITY: OHIO", 20, 20);
            
            // DRAW THE MAP IN THE PDF
            const tiles = document.querySelectorAll('.tile');
            tiles.forEach((tile, i) => {
                const x = 60 + (i % 10) * 8;
                const y = 40 + Math.floor(i / 10) * 8;
                if (tile.dataset.truth === "true") {
                    doc.setFillColor(150, 0, 0);
                    doc.rect(x, y, 8, 8, 'F');
                } else {
                    doc.setDrawColor(200);
                    doc.rect(x, y, 8, 8, 'D');
                }
            });

            doc.text("SECTION II: SYSTEMIC DEBT LOG", 20, 130);
            let y = 140;
            engine.history.forEach(item => {
                doc.setFontSize(8);
                doc.text(`[YEAR ${item.year}] Treaty Violation / Land Clearing`, 25, y);
                y += 5;
            });

            doc.save("OHIO_FINAL_AUDIT.pdf");
        } catch (e) {
            console.error(e);
            alert("Audit failed. Check console.");
        }
    }
};
window.audit = audit; // MAKES THE BUTTON WORK
