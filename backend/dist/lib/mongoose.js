"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToMongo = connectToMongo;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO_URI;
async function connectToMongo() {
    if (!MONGO_URI) {
        throw new Error('MONGO_URI not set in environment');
    }
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log('Connected to MongoDB');
    }
    catch (err) {
        console.error('Failed to connect to MongoDB', err.message || err);
        throw err;
    }
}
exports.default = mongoose_1.default;
