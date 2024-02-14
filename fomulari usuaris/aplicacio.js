http = require("http");
const fs = require('fs'); 
const url = require('url');

let caixes;
fs.readFile('caixes.json', function(err, data) {
	caixes = JSON.parse(data);
});

http.createServer((req, res) => {
	var q = url.parse(req.url, true);
    if (q.pathname == "/getCaixes") { //Si la URL de la petició conté /getCaixes, li servim el array
		console.log("Client demana caixes");
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.write(JSON.stringify(caixes)); //Convertim array a json i l'enviem al client
		res.end(); //Tanquem connexio HTTP
		
	}
	else if (q.pathname == "/canviCaixa") { //Si la URL conté /canviCaixa -> el client envia dades amb nova ubicació
		console.log("canvi caixa");
		console.log(q.query);
		caixes.forEach(function(item, index,array){ //Recorrem totes les cades de l'array
			if(item.id == q.query.id.replace("caixa", "")){ //Per a cada una mirem si el ID és el rebut de client.
				item.x = parseInt(q.query.left); //Actualitzem el x
				item.y = parseInt(q.query.top); //Actualitzem el x
			}
		});
		res.end(); //Tanquem connexió
		
	}
	else {
		//Per qualsevol altra petició, servim el fitxer de l'aplicació del client
		console.log("Client demana fitxer principal");
		fs.readFile('index.html', function(err, data) {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data);
			res.end();
		});
	}
})
.listen(8080);