const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const publicPath = './public';
    console.log(req.url)

    const body = req.url === 'js/script.js'
    ? fs.readFileSync(`${publicPath}/js/script.js`)
    : fs.readFileSync(`${publicPath}/index.html`, 'utf-8');
    res.end(body);
})

const port = process.env.PORT || 3000;

server.listen(port);

console.log('Server started on port: '+ port);