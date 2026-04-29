// EGIS - FIX FINAL 2026
(function() {
    async function forceRender() {
        // Attendre que l'objet Acad soit totalement stabilisé
        if (typeof Acad === 'undefined') {
            await new Promise(r => setTimeout(r, 2000));
        }

        const id = "EGIS_ULTRA_FIX";
        
        // On définit le HTML de manière ultra-standard
        const htmlContent = `<!DOCTYPE html><html><body style="background:#08212C;color:white;padding:20px;font-family:sans-serif;">
            <h1 style="color:#ABC022">Egis Operationnel</h1>
            <p>Si vous voyez ceci, le rendu fonctionne enfin.</p>
            <button onclick="alert('Lien OK')" style="padding:10px;width:100%">Tester</button>
            </body></html>`;

        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);

        try {
            // Nettoyage radical
            try { await Acad.Application.removePalette(id); } catch(e) {}
            
            // Création de la palette
            const palette = new Acad.UI.Palette(id, url);
            palette.title = "Egis Tools";
            palette.width = 300;
            palette.visible = true;

            // Commande pour forcer la mise à jour de l'affichage
            Acad.Editor.executeCommand("_.REDRAW");
            console.log("Palette Egis chargée");
        } catch (err) {
            console.error(err);
        }
    }

    // On lance avec un délai supplémentaire pour laisser le moteur respirer
    setTimeout(forceRender, 500);
})();
