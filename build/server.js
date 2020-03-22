"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
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
// Listen on port.
const server = new http_1.Server(app);
server.listen(port, () => {
    if (isProd)
        console.log(`Live at http://localhost:${port}!`);
    else
        console.log(`Backend running on http://localhost:${port}`);
});
