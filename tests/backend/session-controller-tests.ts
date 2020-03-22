import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import SessionsController from '../../backend/sessions-controller';

describe('sessions controller - addNewSession()', function() {
  beforeEach(function() {
    this.sessionsController = new SessionsController();
    this.consoleErrorStub = sinon.stub(console, 'error');
  });

  afterEach(function() {
    this.consoleErrorStub.restore();
  });

  it('adds a new session', function() {
    const sessionName = 'hello-world';
    let session = this.sessionsController.addNewSession(sessionName);
    expect(session).is.not.null;
    expect(this.sessionsController.sessionNames).length(1);
    expect(this.sessionsController.sessionNames).includes(sessionName);
  });

  it('logs an error and does not add a session with a blank session name', function() {
    let session = this.sessionsController.addNewSession('');
    expect(session).is.null;
    expect(this.consoleErrorStub.calledOnce).to.be.true;
    expect(this.sessionsController.sessionNames).empty;
  });

  it('logs an error and does not add a session with a name that already exists', function() {
    const sessionName = 'hello-world';
    let originalSession = this.sessionsController.addNewSession(sessionName);
    expect(originalSession).is.not.null;
    expect(this.sessionsController.sessionNames).length(1);

    let session = this.sessionsController.addNewSession(sessionName);
    expect(session).equals(originalSession);
    expect(this.consoleErrorStub.calledOnce).to.be.true;
    expect(this.sessionsController.sessionNames).length(1);
  });
});

describe('session controller flipCard()', function() {
  beforeEach(function() {
    this.sessionsController = new SessionsController();
    this.consoleErrorStub = sinon.stub(console, 'error');
  });

  afterEach(function() {
    this.consoleErrorStub.restore();
  });

  it('flips a card', function() {
    const sessionName = 'hello-world';
    let session = this.sessionsController.addNewSession(sessionName);
    let cardsObject = session.cardsObject;
    for (const cardObject of cardsObject) {
      expect(cardObject.isFlipped).to.be.false;
    }

    let wordToFlip = cardsObject[0].word;
    session = this.sessionsController.flipCard(sessionName, wordToFlip);
    cardsObject = session.cardsObject;
    for (const cardObject of cardsObject) {
      if (cardObject.word === wordToFlip) {
        expect(cardObject.isFlipped).to.be.true;
      } else {
        expect(cardObject.isFlipped).to.be.false;
      }
    }
  });

  it('cannot flip a card more than once', function() {
    const sessionName = 'hello-world';
    let session = this.sessionsController.addNewSession(sessionName);
    let card = session.cardsObject[0];
    expect(card.isFlipped).to.be.false;

    session = this.sessionsController.flipCard(sessionName, card.word);
    card = session.cardsObject[0];
    expect(card.isFlipped).to.be.true;

    session = this.sessionsController.flipCard(sessionName, card.word);
    expect(this.consoleErrorStub.calledOnce).to.be.true;
    card = session.cardsObject[0];
    expect(card.isFlipped).to.be.true;
  });

  it('logs an error if trying to flip a card for a session that does not exist', function() {
    let session = this.sessionsController.flipCard('hellow-world', 'word');
    expect(session).to.be.null;
    expect(this.consoleErrorStub.calledOnce).to.be.true;
  });
});
