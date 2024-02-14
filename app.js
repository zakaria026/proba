const http = require("http");
const fs = require("fs");

let servidor = http.createServer((req, res) => {
    if(req.url == "/caixes"){
        console.log("Ens demanan les caixes");
        fs.readFile('caixes.json', function(err,data){
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
        });
    }
    else{
        console.log("Ens demanan index.html");
        fs.readFile('index.html', function(err,data){
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        });
    }

})
servidor.listen(80);

