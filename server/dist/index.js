"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const PORT = 8000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(router_1.default);
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    return res.send('<h1>Welcome to Express Typescript Server</h1>');
});
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    const statusMessage = err.message || 'Error';
    res.status(statusCode).send({
        error: true,
        message: statusMessage,
        data: null,
    });
});
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
