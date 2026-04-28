// EGIS — AutoCAD Tools 2026 — Fichier unique
// WEBLOAD "https://matthieugranger.github.io/Autocad_addin/egis_autocad_palette.js"

(function() {

  // ══════════════════════════════════════════
  // 1. CRÉER LE HTML COMPLET EN MÉMOIRE
  // ══════════════════════════════════════════

  var html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8"/>
<style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Segoe UI',sans-serif;font-size:13px;background:#F4F7F8;color:#08212C;display:flex;flex-direction:column;height:100vh;overflow:hidden;}
.header{background:#08212C;padding:12px 14px;border-bottom:3px solid #ABC022;flex-shrink:0;}
.logo{font-size:17px;font-weight:700;color:#fff;}
.logo span{color:#ABC022;}
.sub{font-size:10px;color:#97B8BB;text-transform:uppercase;letter-spacing:1px;margin-top:2px;}
.body{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:12px;}
.card{background:#fff;border-radius:6px;box-shadow:0 2px 6px rgba(8,33,44,.10);overflow:hidden;}
.card-header{background:#0099A5;padding:9px 13px;font-size:11px;font-weight:700;color:#fff;text-transform:uppercase;letter-spacing:.4px;}
.card-body{padding:13px;}
.desc{font-size:12px;color:#5D848A;margin-bottom:11px;line-height:1.5;}
label{display:block;font-size:10px;font-weight:700;color:#5D848A;text-transform:uppercase;letter-spacing:.5px;margin-bottom:3px;}
input{width:100%;padding:6px 9px;border:1.5px solid #97B8BB;border-radius:4px;font-size:13px;font-family:'Segoe UI',sans-serif;margin-bottom:8px;outline:none;}
input:focus{border-color:#0099A5;}
.btn{width:100%;padding:9px;border:none;border-radius:4px;font-family:'Segoe UI',sans-serif;font-weight:700;font-size:13px;cursor:pointer;}
.btn:disabled{opacity:.5;cursor:not-allowed;}
.btn-blue{background:#0099A5;color:#fff;}
.btn-green{background:#ABC022;color:#08212C;}
.status{display:none;margin-top:9px;padding:7px 10px;border-radius:4px;font-size:12px;line-height:1.4;}
.status.show{display:block;}
.info{background:#E8F6F7;color:#005f6a;border-left:3px solid #0099A5;}
.success{background:#F0F6D8;color:#4a5e00;border-left:3px solid #ABC022;}
.error{background:#FFF0EE;color:#b33300;border-left:3px solid #F75226;}
.warning{background:#FFF8E0;color:#7a5a00;border-left:3px solid #FDC603;}
.footer{text-align:center;padding:8px;font-size:10px;color:#97B8BB;border-top:1px solid #e0e8ea;flex-shrink:0;}
@keyframes spin{to{transform:rotate(360deg);}}
.spinner{display:inline-block;width:12px;height:12px;border:2px solid rgba(255,255,255,.4);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite;vertical-align:middle;margin-right:5px;}
</style>
</head>
<body>

<div class="header">
  <div class="logo">egis<span>.</span></div>
  <div class="sub">AutoCAD Tools 2026</div>
</div>

<div class="body">

  <div class="card">
    <div class="card-header">📐 Cotation automatique</div>
    <div class="card-body">
      <p class="desc">Sélectionner une polyligne pour générer une cote alignée sur chaque segment.</p>
      <button class="btn btn-blue" id="btnCotation">📐 Lancer la cotation</button>
      <div class="status" id="staCotation"></div>
    </div>
  </div>

  <div class="card">
    <div class="card-header">🔢 Numérotation de blocs</div>
    <div class="card-body">
      <p class="desc">Incrémenter automatiquement un attribut sur une sélection de blocs.</p>
      <label>Attribut (Tag)</label>
      <input type="text" id="inputTag" value="ID"/>
      <label>Valeur initiale</label>
      <input type="number" id="inputStart" value="1" min="1"/>
      <label>Préfixe</label>
      <input type="text" id="inputPrefix" value="LOT-"/>
      <button class="btn btn-green" id="btnNum">🔢 Lancer la numérotation</button>
      <div class="status" id="staNum"></div>
    </div>
  </div>

</div>

<div class="footer">© Egis — AutoCAD Web SDK 2026</div>

<script>

  // ── Utilitaires ──
  function setStatus(id, msg, type) {
    var el = document.getElementById(id);
    el.textContent = msg;
    el.className = 'status show ' + type;
  }
  function clearStatus(id) {
    document.getElementById(id).className = 'status';
  }
  function setLoading(id, on, label) {
    var b = document.getElementById(id);
    b.disabled = on;
    b.innerHTML = on ? '<span class="spinner"></span>Traitement…' : label;
  }

  // ── Cotation ──
  document.getElementById('btnCotation').addEventListener('click', async function() {
    var BTN = 'btnCotation', STA = 'staCotation', LBL = '📐 Lancer la cotation';
    setLoading(BTN, true, LBL); clearStatus(STA);
    try {
      await Acad.Editor.executeCommand('_.DELAY 100');
      setStatus(STA, '⟳ Sélectionnez une polyligne…', 'info');

      var opts = new Acad.PromptEntityOptions('\\nSélectionnez une polyligne : ');
      opts.setRejectMessage('\\nPas une polyligne.');
      opts.addAllowedClass('AcDbPolyline', true);
      var res = await Acad.Editor.getEntity(opts);

      if (res.status !== Acad.PromptStatus.OK) { setStatus(STA,'⚠ Annulé.','warning'); return; }

      var doc   = Acad.Application.activeDocument;
      var db    = doc.database;
      var trans = db.transactionManager.startTransaction();
      try {
        var pline = trans.getObject(res.objectId, Acad.OpenMode.forRead);
        var nb    = pline.numberOfVertices - 1;
        if (nb < 1) throw new Error('Au moins 2 sommets requis.');
        var ms = trans.getObject(db.currentSpaceId, Acad.OpenMode.forWrite);
        for (var i = 0; i < nb; i++) {
          var p1  = pline.getPoint3dAt(i);
          var p2  = pline.getPoint3dAt(i + 1);
          var dx  = p2.x - p1.x, dy = p2.y - p1.y;
          var len = Math.sqrt(dx*dx + dy*dy) || 1;
          var dim = new Acad.AlignedDimension();
          dim.xLine1Point  = p1;
          dim.xLine2Point  = p2;
          dim.dimLinePoint = new Acad.Point3d(
            (p1.x+p2.x)/2 + (-dy/len)*1.5,
            (p1.y+p2.y)/2 + ( dx/len)*1.5, 0
          );
          ms.appendEntity(dim);
          trans.addNewlyCreatedDBObject(dim, true);
        }
        trans.commit();
        setStatus(STA, '✓ ' + nb + ' cote(s) créée(s).', 'success');
      } catch(e) { trans.abort(); throw e; }
    } catch(err) {
      var m = err && err.message ? err.message : String(err);
      setStatus(STA, m.toLowerCase().indexOf('cancel')>-1 ? '⚠ Annulé.' : '✕ '+m,
                m.toLowerCase().indexOf('cancel')>-1 ? 'warning' : 'error');
    } finally { setLoading(BTN, false, LBL); }
  });

  // ── Numérotation ──
  document.getElementById('btnNum').addEventListener('click', async function() {
    var BTN = 'btnNum', STA = 'staNum', LBL = '🔢 Lancer la numérotation';
    var tag    = document.getElementById('inputTag').value.trim().toUpperCase();
    var start  = parseInt(document.getElementById('inputStart').value, 10);
    var prefix = document.getElementById('inputPrefix').value;
    if (!tag)              { setStatus(STA,'⚠ Saisissez un attribut.','warning'); return; }
    if (isNaN(start)||start<0) { setStatus(STA,'⚠ Valeur initiale invalide.','warning'); return; }
    setLoading(BTN, true, LBL); clearStatus(STA);
    try {
      await Acad.Editor.executeCommand('_.DELAY 100');
      setStatus(STA, '⟳ Sélectionnez les blocs…', 'info');
      var selRes = await Acad.Editor.getSelection(new Acad.PromptSelectionOptions('\\nSélectionnez les blocs : '));
      if (selRes.status !== Acad.PromptStatus.OK) { setStatus(STA,'⚠ Annulé.','warning'); return; }
      var doc   = Acad.Application.activeDocument;
      var db    = doc.database;
      var trans = db.transactionManager.startTransaction();
      var idx = start, maj = 0, noTag = 0;
      try {
        var ss = selRes.value;
        for (var i = 0; i < ss.count; i++) {
          var blk = trans.getObject(ss.objectIdAt(i), Acad.OpenMode.forRead);
          if (!blk.hasAttributeDefinitions) { noTag++; continue; }
          var col = blk.attributeCollection, found = false;
          for (var j = 0; j < col.count; j++) {
            var att = trans.getObject(col.objectIdAt(j), Acad.OpenMode.forWrite);
            if (att.tag.toUpperCase() === tag) {
              att.textString = prefix + (idx < 10 ? '0'+idx : ''+idx);
              found = true; maj++; idx++; break;
            }
          }
          if (!found) noTag++;
        }
        trans.commit();
        var msg = '✓ ' + maj + ' attribut(s) mis à jour.';
        if (noTag > 0) msg += ' ⚠ ' + noTag + ' sans « ' + tag + ' ».';
        setStatus(STA, msg, maj > 0 ? 'success' : 'warning');
      } catch(e) { trans.abort(); throw e; }
    } catch(err) {
      var m = err && err.message ? err.message : String(err);
      setStatus(STA, m.toLowerCase().indexOf('cancel')>-1 ? '⚠ Annulé.' : '✕ '+m,
                m.toLowerCase().indexOf('cancel')>-1 ? 'warning' : 'error');
    } finally { setLoading(BTN, false, LBL); }
  });

<\/script>
</body>
</html>`;

  // ══════════════════════════════════════════
  // 2. CRÉER UN BLOB URL ET CHARGER LA PALETTE
  // ══════════════════════════════════════════

  var blob = new Blob([html], { type: 'text/html' });
  var url  = URL.createObjectURL(blob);

  // Supprimer palette existante si rechargée
  try { Acad.Application.removePalette('egis-palette'); } catch(e) {}

  Acad.Application.addPalette('egis-palette', 'Egis Outils', url);

})();