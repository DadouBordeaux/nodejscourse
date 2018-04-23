// primary file for the API

// Dependencies
const http = require('http');
const url = require('url');

const server = http.createServer(function(req, res) {
  // get url and parse it
  const parsedUrl = url.parse(req.url, true);
  // get the path from url
  const path = parsedUrl.pathname;
  const trimedPath = path.replace(/^\/|\/$/g, '');
  // send a response
  res.end('hello world\n');
  // log the request path
  console.log('request recieved on : ', trimedPath);
});

server.listen(3000, function() {
  console.log('The server is listening on port 3000 now');
});
