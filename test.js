const server = http.createServer((req, res) =>{
    const pathFile = './public';
    const urlFile = req.url;
    function readFile(){
        res.end(fs.readFileSync(`${pathFile}${urlFile}`, 'utf-8'));
    }
    try {
        if (path.extname(urlFile) == '.css'){
           res.writeHead(200, {'Cotent-Type': 'text/css'});
            readFile();
        } else if (path.extname(urlFile) == '.js'){
            res.writeHead(200, {'Cotent-Type': 'text/js'});
            readFile();
        } else if (path.extname(urlFile) == '.jpg'){
            res.writeHead(200, {'Cotent-Type': 'image/jpeg'});
            res.end(fs.readFileSync(`${pathFile}${urlFile}`));
        } else {
            res.writeHead(200, {'Cotent-Type': 'text/html'});
            readFile();
        }
    } catch {
        res.writeHead(200, {'Cotent-Type': 'text/html'});
        res.end(fs.readFileSync(`${pathFile}/index.html`, 'utf-8'));
    }
})