var uuid = require('uuid'),
    CardStore = require('./cardStore');

var Handlers = {};

Handlers.newCardHandler = function(request, reply) {
  if(request.method === 'get') {
      reply.file('templates/new.html');
  } else {
      var card = {
          name: request.payload.name,
          recipient_email: request.payload.recipient_email,
          sender_name: request.payload.sender_name,
          sender_email: request.payload.sender_email,
          card_image: request.payload.card_image
      };
      saveCard(card);
      console.log(cards);
      reply.redirect('/cards');
  }
}

Handlers.cardsHandler = function(request, reply) {
  reply({cards: CardStore.cards});
}

Handlers.deleteCardHandler = function(request, reply) {
  delete CardStore.cards[request.params.id];
}

function saveCard(card) {
  var id = uuid.v1();
  card.id = id;
  CardStore.cards[id] = card;
}

module.exports = Handlers;
