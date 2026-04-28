/**
 * Egis AutoCAD Palette Loader — VERSION DEBUG
 * Fichier JavaScript pour WEBLOAD — AutoCAD 2026
 * 
 * Utilisation : WEBLOAD "https://matthieugranger.github.io/Autocad_addin/egis_autocad_palette_debug.js"
 */

(function() {
  'use strict';

  console.log('=== EGIS PALETTE LOADER DÉMARRÉ ===');
  console.log('Vérification de l\'API AutoCAD...');

  // Debug : Afficher ce qui est disponible
  window.logACadAPI = function() {
    console.log('--- INSPECTION API AUTOCAD ---');
    console.log('window.Acad:', typeof window.Acad);
    console.log('window.Acad.UI:', typeof (window.Acad && window.Acad.UI));
    console.log('window.Acad.Editor:', typeof (window.Acad && window.Acad.Editor));
    
    if (window.Acad && window.Acad.UI) {
      console.log('Acad.UI properties:', Object.keys(window.Acad.UI));
    }
    if (window.Acad && window.Acad.Editor) {
      console.log('Acad.Editor properties:', Object.keys(window.Acad.Editor));
    }
    console.log('--- FIN INSPECTION ---');
  };

  // Attendre la disponibilité d'Acad
  function waitForAcad(callback, maxAttempts = 30) {
    let attempts = 0;
    const checkInterval = setInterval(() => {
      attempts++;
      
      if (window.Acad) {
        clearInterval(checkInterval);
        console.log(`✓ Acad détecté après ${attempts * 100}ms`);
        callback();
      } else if (attempts >= maxAttempts) {
        clearInterval(checkInterval);
        console.error(`✕ Acad non détecté après ${maxAttempts * 100}ms`);
        console.error('WEBLOAD peut n\'avoir pas fonctionné correctement.');
      }
    }, 100);
  }

  waitForAcad(() => {
    console.log('🔍 Inspection de l\'API disponible...');
    logACadAPI();
    
    // Tentative 1 : Charger l'HTML directement avec window.open()
    console.log('📋 Tentative 1 : Utiliser une approche iframe...');
    loadPaletteIframe();
  });

  /**
   * Approche 1 : Créer une iframe contenant la palette
   */
  function loadPaletteIframe() {
    try {
      const PALETTE_URL = 'https://matthieugranger.github.io/Autocad_addin/egis_autocad_palette.html';
      
      // Créer un conteneur pour la palette
      const container = document.createElement('div');
      container.id = 'egis-palette-container';
      container.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        width: 320px;
        height: 600px;
        border: 1px solid #ccc;
        background: white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        border-radius: 4px;
        z-index: 10000;
        overflow: hidden;
      `;

      // Créer l'iframe
      const iframe = document.createElement('iframe');
      iframe.src = PALETTE_URL;
      iframe.style.cssText = `
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 4px;
      `;
      iframe.sandbox.add('allow-same-origin', 'allow-scripts', 'allow-forms');

      container.appendChild(iframe);
      document.body.appendChild(container);

      console.log('✓ Iframe palette créée');

      // Test : Essayer d'accéder à la palette après chargement
      iframe.onload = () => {
        console.log('✓ Iframe palette chargée');
        // Essayer de communiquer avec l'iframe
        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
          console.log('Iframe document accessible:', !!iframeDoc);
        } catch (e) {
          console.log('Iframe : accès cross-origin (normal)');
        }
      };

      iframe.onerror = () => {
        console.error('✕ Erreur lors du chargement de l\'iframe');
      };

    } catch (err) {
      console.error('Erreur iframe:', err.message);
    }
  }

})();
