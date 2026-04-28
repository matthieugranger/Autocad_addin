/**
 * Egis AutoCAD Palette Loader — DEBUG VISUEL
 * Fichier JavaScript pour WEBLOAD — AutoCAD 2026
 * 
 * Utilisation : WEBLOAD "https://matthieugranger.github.io/Autocad_addin/egis_autocad_palette.js"
 */

(function() {
  'use strict';

  const PALETTE_URL = 'https://matthieugranger.github.io/Autocad_addin/egis_autocad_palette.html';

  // ══════════════════════════════════════════
  // LOGS VISUELS DANS LA PAGE
  // ══════════════════════════════════════════
  
  const logPanel = document.createElement('div');
  logPanel.id = 'egis-log-panel';
  logPanel.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    width: 400px;
    max-height: 500px;
    background: #1e1e1e;
    color: #00ff00;
    border: 2px solid #00ff00;
    border-radius: 4px;
    padding: 10px;
    font-family: 'Courier New', monospace;
    font-size: 12px;
    line-height: 1.4;
    overflow-y: auto;
    z-index: 99999;
    box-shadow: 0 0 20px rgba(0,255,0,0.3);
  `;

  document.body.appendChild(logPanel);

  function addLog(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement('div');
    
    let color = '#00ff00'; // info
    let prefix = '[INFO]';
    
    if (type === 'success') {
      color = '#00ff00';
      prefix = '[✓]';
    } else if (type === 'error') {
      color = '#ff4444';
      prefix = '[✗]';
    } else if (type === 'warn') {
      color = '#ffaa00';
      prefix = '[⚠]';
    }
    
    logEntry.style.color = color;
    logEntry.textContent = `${timestamp} ${prefix} ${message}`;
    logPanel.appendChild(logEntry);
    
    // Scroller vers le bas
    logPanel.scrollTop = logPanel.scrollHeight;
    
    // Aussi log en console
    console.log(`${prefix} ${message}`);
  }

  // ══════════════════════════════════════════
  // INITIALISATION
  // ══════════════════════════════════════════

  addLog('═══ EGIS PALETTE LOADER DÉMARRÉ ═══', 'info');
  addLog(`URL Palette: ${PALETTE_URL}`, 'info');

  // Ajouter un délai initial
  addLog('⏳ Délai initial 500ms (Acad startup)...', 'info');

  setTimeout(async () => {
    await initLoader();
  }, 500);

  async function initLoader() {
    addLog('Vérification de Acad...', 'info');
    addLog(`window.Acad: ${typeof window.Acad}`, 'info');

    // Vérifier que Acad existe
    let acadAvailable = window.Acad;
    if (!acadAvailable) {
      addLog('⏳ Acad pas encore disponible, attente 1s...', 'warn');
      await delay(1000);
      acadAvailable = window.Acad;
    }

    if (!acadAvailable) {
      addLog('Acad toujours pas disponible après attente', 'warn');
      addLog('Tentative de chargement sans Acad...', 'info');
    } else {
      addLog('✓ Acad est disponible', 'success');
      
      // Exécuter un délai dans AutoCAD
      try {
        addLog('Exécution: Acad.Editor.executeCommand("_.DELAY 100")', 'info');
        await window.Acad.Editor.executeCommand('_.DELAY 100');
        addLog('✓ Commande DELAY exécutée', 'success');
      } catch (err) {
        addLog(`Erreur DELAY: ${err.message}`, 'error');
      }
    }

    // Charger la palette
    loadPalette();
  }

  async function loadPalette() {
    addLog('═══ CHARGEMENT PALETTE ═══', 'info');

    // Stratégie 1 : Injection directe
    addLog('Stratégie 1: Injection directe du HTML...', 'info');
    
    try {
      const response = await fetch(PALETTE_URL);
      
      addLog(`Fetch statut: ${response.status}`, 'info');
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const html = await response.text();
      addLog(`HTML reçu: ${html.length} caractères`, 'success');

      // Créer wrapper
      const container = document.createElement('div');
      container.id = 'egis-palette-wrapper';
      container.innerHTML = html;

      document.body.appendChild(container);
      addLog('✓ Palette injectée directement dans le DOM', 'success');
      addLog('✓ Acad accessible depuis la palette', 'success');

      // Masquer le panneau de logs après succès
      setTimeout(() => {
        logPanel.style.opacity = '0.3';
        logPanel.style.cursor = 'pointer';
        logPanel.title = 'Cliquer pour afficher/masquer';
        logPanel.addEventListener('click', () => {
          logPanel.style.opacity = logPanel.style.opacity === '0.3' ? '1' : '0.3';
        });
      }, 2000);

      return;

    } catch (err) {
      addLog(`Erreur injection: ${err.message}`, 'error');
    }

    // Stratégie 2 : Fallback iframe
    addLog('Stratégie 2: Fallback iframe...', 'warn');
    loadPaletteIframe();
  }

  function loadPaletteIframe() {
    try {
      addLog('Création iframe...', 'info');

      const container = document.createElement('div');
      container.id = 'egis-palette-container';
      container.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 320px;
        height: 600px;
        border: 2px solid #08212C;
        background: white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        border-radius: 6px;
        z-index: 10000;
        overflow: hidden;
        font-family: sans-serif;
      `;

      // Header
      const header = document.createElement('div');
      header.style.cssText = `
        padding: 10px;
        background: #08212C;
        color: white;
        font-weight: bold;
        cursor: move;
        user-select: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
      `;
      header.innerHTML = '<span>Egis — Outils</span><button style="background:none;border:none;color:white;font-size:18px;cursor:pointer;" id="close-palette">×</button>';

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

      // Fermer
      header.querySelector('#close-palette').addEventListener('click', () => {
        container.remove();
      });

      // Rendre déplaçable
      makeMovable(container, header);

      addLog('✓ Palette chargée en iframe', 'success');
      addLog('⚠ Acad peut ne pas être accessible dans l\'iframe', 'warn');

    } catch (err) {
      addLog(`Erreur iframe: ${err.message}`, 'error');
    }
  }

  function makeMovable(element, handle) {
    let isMoving = false;
    let offsetX = 0;
    let offsetY = 0;

    handle.addEventListener('mousedown', (e) => {
      if (e.target.tagName === 'BUTTON') return;
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

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

})();
