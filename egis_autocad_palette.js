/**
 * Egis AutoCAD Palette Loader
 * Fichier JavaScript pour WEBLOAD — AutoCAD 2026
 * 
 * Utilisation : WEBLOAD "https://matthieugranger.github.io/Autocad_addin/egis_autocad_palette.js"
 */

(function() {
  'use strict';

  // Configuration
  const PALETTE_URL = 'https://matthieugranger.github.io/Autocad_addin/egis_autocad_palette.html';
  const PALETTE_ID = 'egis-autocad-tools-palette';

  /**
   * Crée et affiche la palette (Web Palette)
   */
  function initPalette() {
    try {
      // Vérifier que AutoCAD Web SDK est disponible
      if (typeof Acad === 'undefined') {
        console.error('❌ AutoCAD Web SDK non disponible');
        return;
      }

      // Créer la palette avec Acad.UI.Palette
      const palette = new Acad.UI.Palette(PALETTE_ID, PALETTE_URL);
      
      // Options d'affichage
      palette.title = 'Egis — Outils';
      palette.visible = true;
      palette.width = 320;
      palette.minWidth = 260;

      console.log('✓ Palette Egis chargée avec succès');

    } catch (err) {
      console.error('❌ Erreur lors du chargement de la palette:', err.message);
    }
  }

  // Initialiser dès que le script est chargé
  initPalette();

})();
