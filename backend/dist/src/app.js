"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// Set up multer to store uploaded files in the './public/data' directory
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/data');
    },
    filename: function (req, file, cb) {
        const timestamp = Date.now();
        const filename = `${file.originalname}-${timestamp}`;
        cb(null, filename);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.post('/upload', upload.array('files'), (req, res) => {
    try {
        res.send('Files uploaded successfully.');
    }
    catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});
// Serve static files from the 'public' directory
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
exports.default = app;
