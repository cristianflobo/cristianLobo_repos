"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan = require('morgan');
const app = (0, express_1.default)();
const { db } = require('./db.ts');
app.use(morgan('dev'));
app.use(express_1.default.json());
//app.use(cors())
app.listen(3001, () => {
    console.log("server on port 3001");
    db.sync({ force: false });
});
