// Test addPalette avec HTML inline (data URI)
var html = '<html><body style="background:#08212C;color:white;font-family:sans-serif;padding:20px;">'
  + '<h2 style="color:#ABC022;">egis.</h2>'
  + '<p>Palette OK !</p>'
  + '</body></html>';

var dataUri = 'data:text/html;charset=utf-8,' + encodeURIComponent(html);

Acad.Application.addPalette('egis-test', 'Egis Test', dataUri);