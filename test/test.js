var assert = require('assert');
var Setup = require('../js/setup');

describe("Testing Code Names", function () {
  before(function () {

  });

  it("Setup.", function () {
    var setup = new Setup('blah');
    assert.equal(setup.getWords(), 'blah');
  });
});
