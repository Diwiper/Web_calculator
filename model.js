// model.js
class CalcModel {
    constructor() { 
        this.val = 0; 
        this.base = 10; 
        this.op = null; 
        this.buf = null; 
        this.wait = false; 
    }

    input(d) {
        const v = parseInt(d, 16);
        if (this.wait) { 
            this.val = v; 
            this.wait = false; 
        } else { 
            const nextVal = this.val * this.base + v;
            if (nextVal <= 0xFFFFFFFF) this.val = nextVal;
        }
    }

    exec(next) {
        if (this.op && this.wait) { this.op = next; return; }
        if (this.buf !== null && this.op) {
            if (this.op === '+') this.val = (this.buf + this.val) >>> 0;
            if (this.op === '-') this.val = (this.buf - this.val) >>> 0;
            if (this.op === '*') this.val = (this.buf * this.val) >>> 0;
            if (this.op === '/') this.val = (this.val === 0 ? 0 : Math.floor(this.buf / this.val)) >>> 0;
            if (this.op === 'AND') this.val = (this.buf & this.val) >>> 0;
            if (this.op === 'OR') this.val = (this.buf | this.val) >>> 0;
            if (this.op === 'XOR') this.val = (this.buf ^ this.val) >>> 0;
        }
        this.buf = this.val; 
        this.op = next; 
        this.wait = true;
    }
}