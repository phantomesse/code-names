import SessionModel from './session-model';
import getCards from './cards-controller';

/**
 * Controls the overall state of the app, specifically managing game sessions.
 */
export default class _SessionsController {
  private sessionNameToSessionMap: Map<string, SessionModel> = new Map();

  get sessionNames(): string[] {
    return Array.from(this.sessionNameToSessionMap.keys());
  }

  addNewSession(sessionName: string): SessionModel {
    if (sessionName.trim().length === 0) {
      console.error(`cannot add a session with a blank name!`);
      return null;
    }
    if (this.sessionNameToSessionMap.has(sessionName)) {
      console.error(
        `could not add new session (${sessionName}) because it already exists. 
        returning the existing session`
      );
      return this.sessionNameToSessionMap.get(sessionName);
    }
    const session = new SessionModel(sessionName, getCards());
    this.sessionNameToSessionMap.set(sessionName, session);
    return session;
  }

  getExistingSession(sessionName: string): SessionModel {
    if (!this.sessionNameToSessionMap.has(sessionName)) {
      console.error(
        `could not get existing session (${sessionName}) because it does not
        exist`
      );
      return null;
    }
    return this.sessionNameToSessionMap.get(sessionName);
  }

  flipCard(sessionName: string, word: string): SessionModel {
    if (!this.sessionNameToSessionMap.has(sessionName)) {
      console.error(
        `could not flip word (${word}) in session (${sessionName}) because session does not exist`
      );
      return null;
    }
    const session = this.sessionNameToSessionMap.get(sessionName);
    session.flipCard(word);
    return session;
  }
}
