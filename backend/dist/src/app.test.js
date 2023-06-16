"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("./app")); // Import your app
const path_1 = __importDefault(require("path"));
describe('POST /upload', () => {
    it('should upload a file', async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .post('/upload')
            .attach('files', path_1.default.join(__dirname, '../public/data/test.txt'));
        expect(response.status).toBe(200);
        expect(response.text).toBe('Files uploaded successfully.');
    });
});
