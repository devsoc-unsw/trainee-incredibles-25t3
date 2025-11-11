"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.health = void 0;
const health = (req, res) => {
    res.json({ status: 'ok', uptime: process.uptime() });
};
exports.health = health;
