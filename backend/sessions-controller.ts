import SessionModel from './session-model';
import getCards from './cards-controller';

/**
 * Controls the overall state of the app, specifically managing game sessions.
 */
class _SessionsController {
  private sessionNameToSessionMap: Map<string, SessionModel> = new Map();

  get sessionNames(): string[] {
    return Array.from(this.sessionNameToSessionMap.keys());
  }

  addNewSession(sessionName: string) {
    if (sessionName.trim().length === 0) {
      console.error(`cannot add a session with a blank name!`);
      return;
    }
    if (this.sessionNameToSessionMap.has(sessionName)) {
      console.error(
        `could not add new session (${sessionName}) because it already exists`
      );
      return;
    }
    this.sessionNameToSessionMap.set(
      sessionName,
      new SessionModel(sessionName, getCards())
    );
  }
}

export default new _SessionsController();
