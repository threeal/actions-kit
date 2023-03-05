"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Time = void 0;
const duration_1 = require("./duration");
class Time {
    constructor(ms) {
        this.ms = ms;
    }
    static now() {
        return new Time(Date.now());
    }
    elapsed() {
        return new duration_1.Duration(Date.now() - this.ms);
    }
}
exports.Time = Time;
//# sourceMappingURL=time.js.map