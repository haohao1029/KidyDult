"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
const app_1 = __importDefault(require("./src/app"));
const port = 4000;
app_1.default.listen(port, () => console.log(`Server is listening on port ${port}`));
