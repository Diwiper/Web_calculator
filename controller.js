// controller.js
class CalcController {
    constructor(model, view) {
        this.m = model;
        this.v = view;

        // Прив'язуємо обробник подій з View до логіки Model
        this.v.bind((type, val) => this.handleAction(type, val));
        
        // Перший рендер
        this.v.render(this.m);
    }

    handleAction(type, val) {
        if (type === 'BASE') {
            this.m.base = val;
        } else if (type === 'BTN') {
            if (/^[0-9A-F]$/.test(val)) this.m.input(val);
            else if (['+','-','*','/','AND','OR','XOR'].includes(val)) this.m.exec(val);
            else if (val === '=') { this.m.exec(null); this.m.wait = false; }
            else if (val === 'CE') { this.m.val = 0; this.m.buf = null; this.m.op = null; this.m.wait = false; }
            else if (val === 'NOT') this.m.val = (~this.m.val) >>> 0;
            else if (val === 'DEL') { if(!this.m.wait) this.m.val = Math.floor(this.m.val / this.m.base); }
        }
        // Оновлюємо екран після будь-якої дії
        this.v.render(this.m);
    }
}

// Запускаємо калькулятор тільки якщо ми на головній сторінці
document.addEventListener('DOMContentLoaded', () => {
    const view = new CalcView();
    if (view.disp) {
        new CalcController(new CalcModel(), view);
    }
});