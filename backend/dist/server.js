"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
app_1.default.use((req, res) => {
    res.send('<h1>Hello Word</h1>');
});
const PORT = process.env.PORT || 5000;
app_1.default.listen(PORT, () => {
    console.log(`server running http://localhost:${PORT}`);
});
