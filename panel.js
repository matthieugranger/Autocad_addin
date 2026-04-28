// EGIS — Test affichage panneau v2
// WEBLOAD "https://matthieugranger.github.io/Autocad_addin/panel.js"

(function() {

  // Supprimer si déjà présent
  var existing = document.getElementById('egis-panel');
  if (existing) existing.remove();

  // Créer le div
  var panel = document.createElement('div');
  panel.id = 'egis-panel';

  panel.setAttribute('style', [
    'position:fixed',
    'top:0',
    'right:0',
    'width:280px',
    'height:100vh',
    'background:#08212C',
    'border-left:4px solid #ABC022',
    'color:white',
    'font-family:Segoe UI,sans-serif',
    'font-size:14px',
    'padding:20px',
    'z-index:2147483647',
    'box-sizing:border-box'
  ].join(';'));

  panel.innerHTML = '<h2 style="color:#ABC022;margin:0 0 10px 0;">egis.</h2><p>Panneau visible ?</p>';

  document.body.appendChild(panel);

  var check = document.getElementById('egis-panel');
  alert('Panel dans le DOM : ' + (check ? 'OUI' : 'NON') + '\nVous le voyez a l\'ecran ?');

})();