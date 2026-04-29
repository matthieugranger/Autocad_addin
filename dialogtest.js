var html = '<html><body style="background:#08212C;color:white;padding:20px;font-family:sans-serif;"><h2 style="color:#ABC022;">egis.</h2><p>showHTMLDialog OK !</p></body></html>';
var blob = new Blob([html], {type:'text/html'});
var url = URL.createObjectURL(blob);
Acad.Application.showHTMLDialog('Egis Outils', url, 400, 600);