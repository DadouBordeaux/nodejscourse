// primary file for the API

// Dependencies
const http = require('http');
const https = require('https');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config')
const fs = require('fs');


const httpsServerOptions = {
  key: fs.readFileSync('./https/key.pem'),
  cert: fs.readFileSync('./https/certificate.pem')
};

const httpsServer = http.createServer(httpsServerOptions, function(req, res) {
  unifiedServer(req, res);
});

httpsServer.listen(config.httpsPort, function() {
  console.log('The server is listening on port ' + config.httpsPort);
});

const httpServer = http.createServer(function(req, res) {
  unifiedServer(req, res);
});

httpServer.listen(config.httpPort, function() {
  console.log('The server is listening on port ' + config.httpPort);
});

const unifiedServer = ((req, res) => {
  // get url and parse it
  const parsedUrl = url.parse(req.url, true);
  // get the path from url
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/|\/$/g, '');
  // Get the query string as an object
  const queryStringObject = parsedUrl.query;
  // get the HTTP method
  const method = req.method.toLowerCase();
  const headers = req.headers;

  //get the payload if any
  const decoder = new StringDecoder('utf-8');
  let buffer = '';

  req.on('data', function(data) {
    buffer += decoder.write(data);
  });

  req.on('end', function() {
    buffer += decoder.end();

    const chosenHandler = typeof(router[trimmedPath]) !== 'undefined'
    ? router[trimmedPath]
    : handlers.notFound

    const data = {
      'trimmedPath': trimmedPath,
      'queryStringObject': queryStringObject,
      'headers': headers,
      'method': method,
      'headers': headers
    };
    // send a response
    chosenHandler(data, function(statusCode, payload) {
      //init default status statusCode
      statusCode = typeof(statusCode) === 'number'
      ? statusCode
      : 200;
      // init default payload
      payload = typeof(payload) === 'object'
      ? payload
      : {};

      const payloadString = JSON.stringify(payload);

      res.setHeader('content-type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);
    });

  });
});

// define handlers
const handlers = {};

handlers.sample = function(data, callback) {
  callback(406, {'name': 'sample handler'});
};

handlers.notFound = function(data, callback) {
  callback(404);
};
// define router
const router = {
  'sample': handlers.sample
};
