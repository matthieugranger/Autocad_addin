// Test : écrire un fichier HTML local puis l'ouvrir dans la palette
// On utilise l'API ActiveX/FileSystem disponible dans AutoCAD

var html = '<!DOCTYPE html><html><body style="background:#08212C;color:white;font-family:sans-serif;padding:20px;">'
  + '<h2 style="color:#ABC022;">egis.</h2><p>Palette OK !</p>'
  + '</body></html>';

// Chemin local temporaire
var tempPath = 'C:\\Temp\\egis_palette.html';

try {
  // Ecrire le fichier via FileSystemObject
  var fso = new ActiveXObject('Scripting.FileSystemObject');
  
  // Créer C:\Temp si nécessaire
  if (!fso.FolderExists('C:\\Temp')) {
    fso.CreateFolder('C:\\Temp');
  }
  
  var file = fso.CreateTextFile(tempPath, true, false);
  file.Write(html);
  file.Close();
  
  alert('Fichier écrit : ' + tempPath);
  
  // Charger dans la palette
  Acad.Application.addPalette('egis-test', 'Egis Test', 'file:///' + tempPath.replace(/\\/g, '/'));

} catch(e) {
  alert('Erreur FSO : ' + e.message + '\n\nEssai méthode 2...');
  
  // Méthode 2 : chemin AppData AutoCAD (déjà utilisé par WEBLOAD)
  var appdata = 'C:\\Users\\m.granger\\AppData\\Roaming\\Autodesk\\AutoCAD 2026\\R25.1\\fra\\WebView2\\W.74.0.0.1\\';
  alert('Chemin WebView2 : ' + appdata);
}