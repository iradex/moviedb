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
    filePath = 'index.html';
  };

  fs.readFile(filePath, function(err, data) {
    if (err) {
      throw err;
    }
  });

}).listen(8089);

  /*fs.writeFile("log.txt", "Hello world!", function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("File saved successfully!");
});*/



