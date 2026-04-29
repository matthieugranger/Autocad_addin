// La palette s'ouvre mais est vide avec blob:file://
// Testons : est-ce que addPalette accepte une vraie URL https ?
// On sait que egis_autocad_palette.html est sur GitHub
 
// Supprimer palette existante
try { Acad.Application.removePalette('egis-test'); } catch(e) {}
 
// Tester avec URL https directe vers un HTML simple heberge sur GitHub
Acad.Application.addPalette(
  'egis-test',
  'Egis Test',
  'https://matthieugranger.github.io/Autocad_addin/hello.html'
);
 
alert('Palette lancee avec URL https directe');
