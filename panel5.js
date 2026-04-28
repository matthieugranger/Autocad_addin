// Test addPalette
var palette = Acad.Application.addPalette(
  'egis-palette',
  'Egis Outils',
  'https://matthieugranger.github.io/Autocad_addin/egis_autocad_palette.html'
);
alert('addPalette result: ' + typeof palette + '\n' + JSON.stringify(palette));