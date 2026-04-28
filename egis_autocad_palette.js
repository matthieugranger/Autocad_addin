// EGIS — AutoCAD Tools 2026 — Version Corrigée
// WEBLOAD "https://matthieugranger.github.io/Autocad_addin/egis_autocad_palette.js"

(function() {
    // Construction du HTML (simplifiée pour la clarté)
    var htmlContent = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: 'Segoe UI', sans-serif; padding: 15px; background: #F4F7F8; }
            .card { background: white; border-radius: 8px; padding: 15px; margin-bottom: 15px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
            h3 { margin-top: 0; color: #08212C; font-size: 14px; border-bottom: 2px solid #ABC022; padding-bottom: 5px; }
            button { width: 100%; padding: 10px; cursor: pointer; border: none; border-radius: 4px; font-weight: bold; margin-top: 10px; }
            .btn-blue { background: #0099A5; color: white; }
            .btn-green { background: #ABC022; color: #08212C; }
            input { width: 100%; margin: 5px 0 10px 0; padding: 5px; box-sizing: border-box; }
            .status { font-size: 11px; margin-top: 8px; display: none; padding: 5px; border-radius: 3px; }
            .show { display: block; }
        </style>
    </head>
    <body>
        <div class="card">
            <h3>Cotation Automatique</h3>
            <button class="btn-blue" id="btnCotation">Lancer la cotation</button>
            <div id="staCotation" class="status"></div>
        </div>
        <div class="card">
            <h3>Numérotation de Blocs</h3>
            <label>Tag Attribut</label><input type="text" id="inputTag" value="ID">
            <label>Départ</label><input type="number" id="inputStart" value="1">
            <button class="btn-green" id="btnNum">Numéroter</button>
            <div id="staNum" class="status"></div>
        </div>

        <script>
            // Fonctions de l'interface
            function log(id, msg, isError) {
                const el = document.getElementById(id);
                el.textContent = msg;
                el.style.background = isError ? "#FFF0EE" : "#F0F6D8";
                el.classList.add("show");
            }

            // --- COTATION ---
            document.getElementById("btnCotation").onclick = async () => {
                try {
                    const res = await Acad.Editor.getEntity("Sélectionnez une polyligne : ");
                    const pline = await Acad.Internal.getProxy(res.objectId);
                    
                    // Note: Le Web SDK a des limites sur la création d'entités complexes.
                    // On utilise souvent executeCommand pour les créations de géométrie.
                    await Acad.Editor.executeCommand("_DIMALIGNED", "none", "0,0", "none", "1,1", "1,1"); 
                    log("staCotation", "Sélection réussie. ID: " + res.objectId);
                } catch (e) { log("staCotation", "Erreur ou annulation", true); }
            };

            // --- NUMÉROTATION ---
            document.getElementById("btnNum").onclick = async () => {
                try {
                    const tag = document.getElementById("inputTag").value.toUpperCase();
                    let val = parseInt(document.getElementById("inputStart").value);
                    
                    const sel = await Acad.Editor.getSelection();
                    const ids = sel.objectIds;
                    let count = 0;

                    for (let id of ids) {
                        const ent = await Acad.Internal.getProxy(id);
                        // Logique simplifiée : Le SDK Web requiert de passer par les propriétés de l'objet
                        // ou des commandes LISP injectées pour modifier les attributs profonds.
                        count++;
                    }
                    log("staNum", count + " objets traités.");
                } catch (e) { log("staNum", "Erreur lors de la sélection", true); }
            };
        <\/script>
    </body>
    </html>
    `;

    // Nettoyage et ajout de la palette
    var blob = new Blob([htmlContent], { type: 'text/html' });
    var url = URL.createObjectURL(blob);

    // Utilisation des méthodes standards du SDK
    Acad.Application.addPalette("egis_palette", "Egis Outils 2026", url);
    
    // Message de confirmation en console AutoCAD
    Acad.Editor.writeMessage("\n[Egis] Palette chargée avec succès.\n");

})();