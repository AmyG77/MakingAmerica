const audit = {
    generate() {
        console.log("Audit: Starting generation...");
        try {
            const { jsPDF } = window.jspdf;
            if (!jsPDF) throw new Error("jsPDF library not found! Check your index.html script tags.");

            const doc = new jsPDF();
            const history = engine.history || [];
            
            // Header
            doc.setFont("courier", "bold");
            doc.text("BUREAU OF HISTORICAL ACCOUNTABILITY", 20, 20);
            doc.setFontSize(10);
            doc.text("OHIO DIVISION - FINAL SETTLEMENT REPORT", 20, 28);
            doc.line(20, 32, 190, 32);

            // Logic to draw the Ohio Grid in the PDF
            doc.text("MAP 1-A: IMPACT GRID", 20, 45);
            const tiles = document.querySelectorAll('.tile');
            tiles.forEach((tile, i) => {
                const x = 60 + (i % 10) * 8;
                const y = 55 + Math.floor(i / 10) * 8;
                if (tile.dataset.truth === "true") {
                    doc.setFillColor(150, 0, 0); // Red for Dealings
                    doc.rect(x, y, 8, 8, 'F');
                } else {
                    doc.setDrawColor(200);
                    doc.rect(x, y, 8, 8, 'D');
                }
            });

            doc.text("REPORT COMPLETE. DOWNLOAD INITIALIZED.", 20, 150);
            doc.save("OHIO_AUDIT.pdf");
            alert("Audit saved! Check your downloads folder.");
            
        } catch (error) {
            console.error("Audit Error:", error);
            alert("The Bureau encountered an error: " + error.message);
        }
    }
};

// Ensure the HTML can see this object
window.audit = audit;
