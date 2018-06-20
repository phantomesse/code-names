var fs = require('fs');
var assert = require('assert');
var Utils = require('../js/utils');

describe('Utils', function() {
  var setup;

  before(function() {
    var seed = 'hello-world';
    var wordBank = JSON.parse(fs.readFileSync('data/words.json', 'utf8'));
    setup = new Utils(seed, wordBank);
  });

  it('#getRandomNumber', function() {
    assert.equal(setup.getRandomNumber(''), 0.6122790858798908);
  });

  it('#getWords', function() {
    var expectedSet = new Set([
      'Crust',
      'Ergonomic',
      'Deep',
      'Cuff',
      'Archaeologist',
      'Ear',
      'Flagpole',
      'Fringe',
      'Chef',
      'Fix',
      'Diver',
      'Banana',
      'Buy',
      'Aircraft',
      'Curtain',
      'Flu',
      'Battery',
      'Garbage',
      'Broken',
      'Dart',
      'Dawn',
      'Cheerleader',
      'Birthday',
      'Frog',
      'Cone'
    ]);
    assert.deepEqual(setup.getWords(), expectedSet);
  })
});