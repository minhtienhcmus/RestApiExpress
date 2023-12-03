const eventEmitter = require('./emitter');

// Event handler for the 'requestReceived' event
eventEmitter.on('requestReceived', (requestData) => {
  console.log('Request received:', requestData);
  // Additional processing or logging can be added here
});

// You can add more event handlers here for different events
