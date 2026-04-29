var html = '<html><body style="background:#08212C;color:white;padding:20px;font-family:sans-serif;"><h2 style="color:#ABC022;">egis.</h2><p>Blob OK !</p></body></html>';
var blob = new Blob([html], {type:'text/html'});
var url = URL.createObjectURL(blob);
alert('Blob URL cree : ' + url);
Acad.Application.addPalette('egis-blob2', 'Egis Blob', url);