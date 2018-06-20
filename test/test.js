var fs = require('fs');
var assert = require('assert');
var Utils = require('../js/utils');

describe('Utils', function() {
  var seeds;
  var wordBank;

  before(function() {
    seeds = [
      'hello-world',
      'lemons-are-sweet',
      'i-like-to-eat',
      'kittens-are-cute'
    ];
    wordBank = JSON.parse(fs.readFileSync('data/words.json', 'utf8'));
  });

  it('#getRandomNumber returns a random number', function() {
    var utils = new Utils(seeds[0], wordBank);
    assert.equal(utils.getRandomNumber(''), 0.6122790858798908);
  });

  it('#getRandomNumber returns the same random number for the same seed', function() {
    for (var i = 0; i < seeds.length; i++) {
      var utils1 = new Utils(seeds[i], wordBank);
      var utils2 = new Utils(seeds[i], wordBank);
      assert.equal(utils1.getRandomNumber(i.toString()), utils2.getRandomNumber(i.toString()));
    }
  });

  it('#getWords returns a set of unique words', function() {
    var utils = new Utils(seeds[0], wordBank);
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
    assert.deepEqual(utils.getWords(), expectedSet);
  });

  it('#getWords returns the same set of unique words for the same seed', function() {
    for (var i = 0; i < seeds.length; i++) {
      var utils1 = new Utils(seeds[i], wordBank);
      var utils2 = new Utils(seeds[i], wordBank);
      assert.deepEqual(utils1.getWords(), utils2.getWords());
    }
  });
});