const audit = {
    generate() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const history = engine.history;
        const deals = history.filter(h => h.isDeal).length;

        // Header
        doc.setFont("courier", "bold");
        doc.setFontSize(20);
        doc.text("BUREAU OF HISTORICAL ACCOUNTABILITY", 20, 25);
        doc.setFontSize(10);
        doc.text("OHIO TERRITORY AUDIT: 1830 - 2026", 20, 32);
        doc.line(20, 35, 190, 35);

        // Section I: Displacement Data
        doc.text("SECTION I: POPULATION DISPLACEMENT", 20, 50);
        doc.setFont("courier", "normal");
        
        // Logic: Each 'Dealing' represents approx 500 displaced families
        const displaced = deals * 500;
        doc.text(`Estimated Indigenous Displacement: ${displaced.toLocaleString()} persons.`, 20, 60);
        doc.text(`Impacted Nations: Shawnee, Lakota, Wyandot, Miami.`, 20, 65);

        // Section II: Resistance Records
        doc.setFont("courier", "bold");
        doc.text("SECTION II: RESISTANCE OVERVIEW", 20, 85);
        doc.setFont("courier", "normal");
        
        const tecumsehNote = "Tecumseh's Confederacy (1805-1813): Attempted to unify tribes against the very 'Dealings' utilized in this simulation.";
        const blueJacketNote = "Blue Jacket (Weyapiersenwah): Led the Western Confederacy at the Battle of Fallen Timbers (1794), resisting the cession of the Ohio Valley.";
        
        doc.text(tecumsehNote, 20, 95, { maxWidth: 170 });
        doc.text(blueJacketNote, 20, 110, { maxWidth: 170 });

        // Section III: Mapping the Debt
        doc.setFont("courier", "bold");
        doc.text("SECTION III: PHYSICAL IMPACT MAP", 20, 135);
        
        // Draw a small 2D representation of where the player clicked
        history.forEach(h => {
            const mapX = 60 + (h.x / 10);
            const mapY = 145 + (h.y / 10);
            doc.setFillColor(h.isDeal ? 150 : 200, 0, 0);
            doc.circle(mapX, mapY, 1, 'F');
        });

        // Final Verdict
        doc.setFontSize(12);
        doc.text("FINAL VERDICT:", 20, 220);
        doc.setFont("courier", "italic");
        const verdict = deals > 10 ? 
            "Your reliance on 'Dealings' prioritized rapid capitalization over sovereign treaties. The Rust Belt foundations are built upon this accelerated displacement." :
            "Limited growth. Your reluctance to 'Optimize' preserved native land-claims longer, though the systemic inertia of 2026 remains unavoidable.";
        
        doc.text(verdict, 20, 230, { maxWidth: 170 });

        doc.save("OHIO_HISTORICAL_AUDIT.pdf");
    }
};
