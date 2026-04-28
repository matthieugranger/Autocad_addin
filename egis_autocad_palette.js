/**
 * Egis AutoCAD Palette Loader - Version Corrigée 2026
 * Utilisation : WEBLOAD "https://matthieugranger.github.io/Autocad_addin/egis_autocad_palette.js"
 */

(function() {
  'use strict';

  // URL directe de votre fichier HTML hébergé
  const PALETTE_URL = 'https://matthieugranger.github.io/Autocad_addin/egis_autocad_palette.html';
  const PALETTE_ID = 'egis-autocad-tools-palette';

  async function initPalette() {
    try {
      // 1. Attendre que l'API Acad soit chargée
      if (typeof Acad === 'undefined') {
        let attempts = 0;
        while (typeof Acad === 'undefined' && attempts < 20) {
          await new Promise(r => setTimeout(r, 200));
          attempts++;
        }
      }

      if (typeof Acad === 'undefined') {
        console.error('❌ SDK AutoCAD introuvable');
        return;
      }

      // 2. Nettoyage si la palette existe déjà
      try {
        await Acad.Application.removePalette(PALETTE_ID);
      } catch (e) { /* ignored */ }

      // 3. Création de la palette
      // On utilise addPalette avec l'URL directe de GitHub
      await Acad.Application.addPalette(PALETTE_ID, 'Egis — Outils 2026', PALETTE_URL);
      
      console.log('✓ Palette Egis chargée depuis GitHub');
      Acad.Editor.writeMessage('\n[Egis] Palette chargée avec succès.\n');

    } catch (err) {
      console.error('❌ Erreur:', err.message);
    }
  }

  initPalette();
})();