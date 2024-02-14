const http = require('http');
const url = require('url');
console.log("Hola, mundo!");

const server = http.createServer((req, res) => {
    let data = '';

    req.on('data', chunk => {
        data += chunk;
    });

    req.on('end', () => {
        console.log('Datos recibidos:', data);
        res.end('¡Datos recibidos con éxito!');
    });

    const parsedUrl = url.parse(req.url);
    const pathname = parsedUrl.pathname;
    console.log('Pathname:', pathname);
});

server.on('error', (error) => {
    console.error('Error en el servidor:', error);
});

server.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
