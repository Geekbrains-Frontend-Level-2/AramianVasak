const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const publicPath = './public';

    let body;
    try {
        body = fs.readFileSync(`${publicPath}${req.url}`);
    } catch (err) {
        body = fs.readFileSync(`${publicPath}/index.html`, 'utf8');
    }

    res.end(body);
})

const port = process.env.PORT || 3000;
server.listen(port);

console.log('Server started on port: '+ port);