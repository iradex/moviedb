// Importing the built-in NODE modules

const http = require('http'),
url = require('url'),
fs = require('fs');

// Creating the Server, which is listening to port 8080

http.createServer((request, response) => {
  var addr = request.url, // this will assign the URL of the request to the variable addr
  q = url.parse(addr, true), // parsing the URL
  filePath = '';

  if (q.pathname.includes('documentation')) {
    filePath = (__dirname + '/documentation.html'); // in case the URL contains the filepath of documentation, this is used as input for readFile. otherwise, index.html is used.
  } else {
    filePath = 'index.html'; // in case the URL contains something else, index.html is set as filepath
  };

  fs.readFile(filePath, function(err, data) { // opens the filepath, callback function for error handling
    if (err) {
      throw err;
    }
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end();
  });

  fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', function(err) { // opens log.txt, adds the URL + timestamp, callback for error handling
    if (err) {
      console.log(err);
    }
      else {
    console.log('Added to log.');
    }
  });

}).listen(8093); // listening on port 8093




