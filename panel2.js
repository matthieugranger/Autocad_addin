alert('panel2 OK - DOM body: ' + typeof document.body);
 
var d = document.createElement('div');
d.id = 'egis-test';
d.setAttribute('style','position:fixed;top:0;right:0;width:200px;height:100px;background:red;color:white;font-size:20px;z-index:2147483647;padding:10px;');
d.textContent = 'EGIS TEST';
document.body.appendChild(d);