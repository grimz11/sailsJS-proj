var sails = require('sails');

before(function(done) {
  var _ = require("lodash");

  global.chai = require("chai");
  global.should = chai.should();
  this.timeout(5000);
  
  sails.lift({
    hooks: { grunt: false },
    log: { level: 'warn' },
    models: {
      connection: 'unitTestConnection',
      migrate: 'drop'
    },
    connections: {
      unitTestConnection: {
        adapter: 'sails-disk'
      }
    }
  }, function(err) {
    if (err) { return done(err); }

    return done();
  });
});

// After all tests have finished...
after(function(done) {

  // here you can clear fixtures, etc.
  // (e.g. you might want to destroy the records you created above)

  sails.lower(done);

});