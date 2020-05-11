const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const publicPath = './public';
    console.log(req.url)

    const body = req.url === '/styles/styles.css'
    ? fs.readFileSync(`${publicPath}/styles/styles.css`, 'utf-8')
    : fs.readFileSync(`${publicPath}/index.html`, 'utf-8');
    res.end(body);
})

server.listen(3000);

console.log('Server started');