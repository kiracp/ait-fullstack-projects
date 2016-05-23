// DIS ONE MINE

var http = require('http');

var fs = require('fs');

function serveStatic(res, path, contentType, resCode) {
    fs.readFile(path, function(err, data) {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' }); 
            res.end('500 - Internal Error');
        } else if (resCode == 404) {
            res.writeHead(resCode, {'Content-Type': contentType});
            res.end(data);
        }
        else {
            res.writeHead(resCode, { 'Content-Type': contentType }); 
            res.end(data);
        }
        date = new Date().toLocaleString('en-US'); 
        console.log(date, res.STATUS_MESSAGE, path, resCode, http.STATUS_CODES[resCode]);
    });
}

// Create server
var server = http.createServer(handleRequest); 

// And handle that shit!
function handleRequest(req, res) {
    // Lowercase, with/without a trailing slash
    res.STATUS_MESSAGE = req.method;
    var path = req.url.toLowerCase()
    if (path.lastIndexOf('/') == path.length-1 && path.length !== 1) { 
        path = path.substr(0,path.length-1); 
    }

    console.log("path in createServer: ", path);
    
    // Homepage
    if (path === '/' || path === '/home') {
        serveStatic(res, './public/index.html', 'text/html', 200)
    }

    // About
    else if (path === '/about') {
        serveStatic(res, './public/about.html', 'text/html', 200)
    }

    // Redirect to about
    else if (path === '/me') {
        var resCode = 301
        res.writeHead(resCode, {'Location': '/about'});
        res.end('');
        console.log(date, res.STATUS_MESSAGE, path, resCode, http.STATUS_CODES[resCode]);
    }
    // CSS
    else if (path === '/css/base.css') {
        serveStatic(res, './public/css/base.css', 'text/css', 200);
    }
    else if (path === '/css/err.css') {
        serveStatic(res, './public/css/err.css', 'text/css', 200);
    }

    // Images
    else if (path === '/img/image1.png') {
        serveStatic(res, './public/img/image1.png', 'image/png', 200);
    }
    else if (path === '/img/image2.png') {
        serveStatic(res, './public/img/image2.png', 'image/png', 200);
    }
    else if (path === '/img/404.png') {
        serveStatic(res, './public/img/404.png', 'image/png', 200);      
    }
    else if (path === '/img/title.gif') {
        serveStatic(res, './public/img/title.gif', 'image/gif', 200);      
    }
    else if (path === '/img/favicon/favicon.ico') {
        serveStatic(res, './public/img/favicon/favicon.ico', 'image/x-icon', 200);
    }

    // 404 Not found
    else {
        serveStatic(res, './public/404.html', 'text/html', 404);
    }
}
server.listen(5000);