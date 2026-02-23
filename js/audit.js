const audit = {
    generate() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const deals = engine.history.length;

        doc.setFont("courier", "bold");
        doc.text("BUREAU OF HISTORICAL ACCOUNTABILITY: MIAMI VALLEY", 20, 20);
        doc.line(20, 25, 190, 25);

        doc.text("SECTION I: THE EXTRACTION CYCLE", 20, 40);
        doc.setFont("courier", "normal");
        doc.text(`1795: The Treaty of Greenville formally ceded this land.`, 20, 50);
        doc.text(`2026: The simulated Net Worth is $${engine.gold.toLocaleString()}.`, 20, 55);

        doc.text("SECTION II: THE COST OF 'DEALINGS'", 20, 75);
        doc.text(`Total expedited land-clearings: ${deals}`, 20, 85);
        doc.text(`Impact: Removal of the Shawnee (Blue Jacket) and Miami (Little Turtle).`, 20, 90);

        doc.setFont("courier", "italic");
        doc.text("Note: The 'Walmart' and 'Shopping Mall' sprites built after 1980", 20, 110);
        doc.text("now occupy the same acreage once held by sovereign nations.", 20, 115);
        doc.text("These lots are currently categorized as 'Dead Retail Space'.", 20, 120);

        doc.save("MIAMI_VALLEY_AUDIT.pdf");
    }
};
