import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import sessionsController from '../../backend/sessions-controller';

describe('sessions controller - addNewSession()', function() {
  beforeEach(function() {
    this.consoleErrorStub = sinon.stub(console, 'error');
  });

  afterEach(function() {
    this.consoleErrorStub.restore();
  });

  it('logs an error and does not add a session with a blank session name', function() {
    sessionsController.addNewSession('');
    expect(this.consoleErrorStub.calledOnce).to.be.true;
    expect(sessionsController.sessionNames).empty;
  });

  it('logs an error and does not add a session with a name that already exists', function() {
    let sessionName = 'hello-world';
    sessionsController.addNewSession(sessionName);
    expect(sessionsController.sessionNames).length(1);
    expect(sessionsController.sessionNames).includes(sessionName);

    sessionsController.addNewSession(sessionName);
    expect(this.consoleErrorStub.calledOnce).to.be.true;
    expect(sessionsController.sessionNames).length(1);
  });
});
