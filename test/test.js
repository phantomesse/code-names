var fs = require('fs');
var assert = require('assert');
var Utils = require('../js/utils');

describe('Utils', function() {
  var seeds;
  var wordBank;
  var wordCount = 25;

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
      'Opaque',
      'Shower',
      'Pencil',
      'Organ',
      'Bedbug',
      'Salmon',
      'Tachometer',
      'Wag',
      'Hut',
      'Swamp',
      'Pocket',
      'Bruise',
      'Flu',
      'Applause',
      'Ovation',
      'Time',
      'Candy',
      'Wig',
      'Escalator',
      'Talk',
      'Park',
      'Pastry',
      'Hungry',
      'Cog',
      'Watermelon'
    ]);
    assert.deepEqual(utils.getWords(wordCount), expectedSet);
  });

  it('#getWords returns the same set of unique words for the same seed', function() {
    for (var i = 0; i < seeds.length; i++) {
      var utils1 = new Utils(seeds[i], wordBank);
      var utils2 = new Utils(seeds[i], wordBank);
      assert.deepEqual(utils1.getWords(wordCount), utils2.getWords(wordCount));
    }
  });
});