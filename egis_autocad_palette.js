/**
 * Egis AutoCAD Palette Loader — ROBUSTE
 * Fichier JavaScript pour WEBLOAD — AutoCAD 2026
 * 
 * Utilisation : WEBLOAD "https://matthieugranger.github.io/Autocad_addin/egis_autocad_palette.js"
 * 
 * Stratégies de chargement :
 * 1. Injection directe du HTML
 * 2. Fallback : iframe
 */

(function() {
  'use strict';

  const PALETTE_URL = 'https://matthieugranger.github.io/Autocad_addin/egis_autocad_palette.html';
  console.log('🎯 EGIS Palette Loader — AutoCAD 2026');
  console.log('URL:', PALETTE_URL);

  /**
   * Stratégie 1 : Injection directe du HTML (RECOMMANDÉE)
   * Permet l'accès direct à Acad sans sandboxing
   */
  async function loadPaletteDirectly() {
    try {
      console.log('📦 Stratégie 1 : Injection directe du HTML...');
      
      const response = await fetch(PALETTE_URL);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const html = await response.text();

      // Créer un wrapper pour la palette
      const container = document.createElement('div');
      container.id = 'egis-palette-wrapper';
      container.innerHTML = html;

      document.body.appendChild(container);

      console.log('✅ Palette chargée directement — Acad accessible');
      return true;

    } catch (err) {
      console.warn('⚠️ Injection directe échouée:', err.message);
      return false;
    }
  }

  /**
   * Stratégie 2 : Fallback iframe
   * En cas d'échec de la stratégie 1
   */
  function loadPaletteIframe() {
    try {
      console.log('📦 Stratégie 2 : Fallback iframe...');

      const container = document.createElement('div');
      container.id = 'egis-palette-container';
      container.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 320px;
        height: 600px;
        border: 1px solid #ddd;
        background: white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        border-radius: 6px;
        z-index: 10000;
        overflow: hidden;
        font-family: sans-serif;
      `;

      // Titre du conteneur
      const header = document.createElement('div');
      header.style.cssText = `
        padding: 10px;
        background: #08212C;
        color: white;
        font-weight: bold;
        cursor: move;
        user-select: none;
      `;
      header.textContent = 'Egis — Outils';

      // Iframe
      const iframe = document.createElement('iframe');
      iframe.src = PALETTE_URL;
      iframe.style.cssText = `
        width: 100%;
        height: calc(100% - 40px);
        border: none;
      `;
      iframe.sandbox.add('allow-same-origin', 'allow-scripts', 'allow-forms', 'allow-popups');

      container.appendChild(header);
      container.appendChild(iframe);
      document.body.appendChild(container);

      // Rendre le conteneur déplaçable
      makeMovable(container, header);

      console.log('✅ Palette chargée en iframe');
      return true;

    } catch (err) {
      console.error('❌ Fallback iframe échoué:', err.message);
      return false;
    }
  }

  /**
   * Rendre un élément déplaçable par sa barre d'en-tête
   */
  function makeMovable(element, handle) {
    let isMoving = false;
    let offsetX = 0;
    let offsetY = 0;

    handle.addEventListener('mousedown', (e) => {
      isMoving = true;
      const rect = element.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
    });

    document.addEventListener('mousemove', (e) => {
      if (isMoving) {
        element.style.left = (e.clientX - offsetX) + 'px';
        element.style.top = (e.clientY - offsetY) + 'px';
        element.style.transform = 'none';
      }
    });

    document.addEventListener('mouseup', () => {
      isMoving = false;
    });
  }

  /**
   * Initialiser la palette
   */
  async function init() {
    // Attendre que le DOM soit prêt
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', async () => {
        const success = await loadPaletteDirectly();
        if (!success) {
          loadPaletteIframe();
        }
      });
    } else {
      const success = await loadPaletteDirectly();
      if (!success) {
        loadPaletteIframe();
      }
    }
  }

  // Démarrer l'initialisation
  init();

})();
