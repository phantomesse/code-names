"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const sessions_controller_1 = __importDefault(require("./backend/sessions-controller"));
const sessionsController = new sessions_controller_1.default();
const app = express_1.default();
// Get whether the app is running in prod.
const isProd = process.argv.includes('--prod');
// Set the port.
const port = isProd ? process.env.PORT || 1337 : 1338;
app.set('port', port);
// Allow cross-origin in dev mode.
if (!isProd) {
    app.use(cors_1.default({
        origin: 'http://localhost:1337',
        optionsSuccessStatus: 200
    }));
}
app.get('/', (request, response) => {
    response.send('hello world');
});
/**
 * Retrieves the card objects JSON for a given session name.
 *
 * If the session name exists, then return the existing session. If the session
 * name does not exist, then create a new session and return that session.
 */
app.get('/api/get', (request, response) => {
    const sessionName = request.query;
    console.log(sessionName);
    response.send({});
    // if(sessionsController.sessionNames.includes())
});
// Listen on port.
const server = new http_1.Server(app);
server.listen(port, () => {
    if (isProd)
        console.log(`Live at http://localhost:${port}!`);
    else
        console.log(`Backend running on http://localhost:${port}`);
});
