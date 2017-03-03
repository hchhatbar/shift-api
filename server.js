var Hapi = require('hapi'),
    CardStore = require('./lib/cardStore');
    routes = require('./lib/routes');

var server = new Hapi.Server();

CardStore.initialize();

server.connection({port:3000});

server.ext('onRequest', function(request, reply){
  console.log('Request received:', request.path);
  reply.continue();
});

server.route(routes);

server.start(function() {
  console.log('Listening on ', server.info.uri);
});
