// EGIS — Panneau latéral simple
// WEBLOAD "https://matthieugranger.github.io/Autocad_addin/panel.js"

(function() {

  // Supprimer panneau existant si rechargé
  const existing = document.getElementById('egis-panel');
  if (existing) existing.remove();

  // Créer le panneau
  const panel = document.createElement('div');
  panel.id = 'egis-panel';
  panel.style.cssText = `
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    height: 100%;
    background: #F4F7F8;
    border-left: 3px solid #ABC022;
    font-family: 'Segoe UI', sans-serif;
    font-size: 13px;
    z-index: 9999;
    box-shadow: -4px 0 12px rgba(0,0,0,0.15);
    display: flex;
    flex-direction: column;
  `;

  panel.innerHTML = `
    <!-- HEADER -->
    <div style="
      background: #08212C;
      padding: 14px 16px;
      border-bottom: 3px solid #ABC022;
      display: flex;
      align-items: center;
      justify-content: space-between;
    ">
      <div>
        <div style="color:#fff; font-weight:700; font-size:16px; letter-spacing:0.5px;">
          egis<span style="color:#ABC022;">.</span>
        </div>
        <div style="color:#97B8BB; font-size:10px; text-transform:uppercase; letter-spacing:1px; margin-top:2px;">
          AutoCAD Tools 2026
        </div>
      </div>
      <button id="egis-close" style="
        background: none;
        border: none;
        color: #97B8BB;
        font-size: 20px;
        cursor: pointer;
        line-height: 1;
      ">×</button>
    </div>

    <!-- BODY -->
    <div style="padding: 16px; flex: 1; overflow-y: auto;">

      <!-- Section Cotation -->
      <div style="
        background: #fff;
        border-radius: 6px;
        box-shadow: 0 2px 6px rgba(8,33,44,0.1);
        margin-bottom: 16px;
        overflow: hidden;
      ">
        <div style="background:#0099A5; padding:10px 14px; display:flex; align-items:center; gap:8px;">
          <span style="color:#fff; font-size:18px;">📐</span>
          <span style="color:#fff; font-weight:700; font-size:12px; text-transform:uppercase; letter-spacing:0.5px;">
            Cotation automatique
          </span>
        </div>
        <div style="padding:14px;">
          <p style="color:#5D848A; font-size:12px; margin-bottom:12px; line-height:1.5;">
            Sélectionner une polyligne pour générer une cote alignée sur chaque segment.
          </p>
          <button id="btn-cotation" style="
            width: 100%;
            padding: 9px;
            background: #0099A5;
            color: white;
            border: none;
            border-radius: 4px;
            font-weight: 700;
            font-size: 13px;
            cursor: pointer;
          ">📐 Lancer la cotation</button>
        </div>
      </div>

      <!-- Section Numérotation -->
      <div style="
        background: #fff;
        border-radius: 6px;
        box-shadow: 0 2px 6px rgba(8,33,44,0.1);
        overflow: hidden;
      ">
        <div style="background:#0099A5; padding:10px 14px; display:flex; align-items:center; gap:8px;">
          <span style="color:#fff; font-size:18px;">🔢</span>
          <span style="color:#fff; font-weight:700; font-size:12px; text-transform:uppercase; letter-spacing:0.5px;">
            Numérotation de blocs
          </span>
        </div>
        <div style="padding:14px;">
          <p style="color:#5D848A; font-size:12px; margin-bottom:12px; line-height:1.5;">
            Incrémenter automatiquement un attribut sur une sélection de blocs.
          </p>
          <label style="display:block; font-weight:700; font-size:11px; color:#5D848A; text-transform:uppercase; margin-bottom:4px;">
            Attribut (Tag)
          </label>
          <input id="input-tag" type="text" value="ID" style="
            width:100%; padding:7px 10px; border:1.5px solid #97B8BB;
            border-radius:4px; font-size:13px; margin-bottom:8px;
            box-sizing:border-box;
          " />
          <label style="display:block; font-weight:700; font-size:11px; color:#5D848A; text-transform:uppercase; margin-bottom:4px;">
            Valeur initiale
          </label>
          <input id="input-start" type="number" value="1" min="1" style="
            width:100%; padding:7px 10px; border:1.5px solid #97B8BB;
            border-radius:4px; font-size:13px; margin-bottom:8px;
            box-sizing:border-box;
          " />
          <label style="display:block; font-weight:700; font-size:11px; color:#5D848A; text-transform:uppercase; margin-bottom:4px;">
            Préfixe
          </label>
          <input id="input-prefix" type="text" value="LOT-" style="
            width:100%; padding:7px 10px; border:1.5px solid #97B8BB;
            border-radius:4px; font-size:13px; margin-bottom:12px;
            box-sizing:border-box;
          " />
          <button id="btn-numerotation" style="
            width: 100%;
            padding: 9px;
            background: #ABC022;
            color: #08212C;
            border: none;
            border-radius: 4px;
            font-weight: 700;
            font-size: 13px;
            cursor: pointer;
          ">🔢 Lancer la numérotation</button>
        </div>
      </div>

    </div>

    <!-- FOOTER -->
    <div style="
      text-align:center;
      padding: 10px;
      color:#97B8BB;
      font-size:10px;
      border-top: 1px solid #e0e8ea;
    ">
      © Egis — AutoCAD Web SDK 2026
    </div>
  `;

  document.body.appendChild(panel);

  // Bouton fermer
  document.getElementById('egis-close').addEventListener('click', function() {
    panel.remove();
  });

  // Boutons (placeholder — fonctions à brancher)
  document.getElementById('btn-cotation').addEventListener('click', function() {
    alert('Cotation — fonction à brancher');
  });

  document.getElementById('btn-numerotation').addEventListener('click', function() {
    alert('Numérotation — fonction à brancher');
  });

})();