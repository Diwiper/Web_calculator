// view.js
class CalcView {
    constructor() {
        this.disp = document.querySelector('.calc-display');
        this.panel = document.querySelector('.hex-bin-panel');
        this.btns = document.querySelectorAll('.calc-btn');
    }

    render(m) {
        if (!this.disp) return;
        this.disp.innerText = (m.val >>> 0).toString(m.base).toUpperCase();
        
        this.panel.innerHTML = `
            <div class="base-item ${m.base===16?'base-active':''}" data-b="16">HEX: ${(m.val >>> 0).toString(16).toUpperCase()}</div>
            <div class="base-item ${m.base===10?'base-active':''}" data-b="10">DEC: ${(m.val >>> 0).toString(10)}</div>
            <div class="base-item ${m.base===8?'base-active':''}" data-b="8">OCT: ${(m.val >>> 0).toString(8)}</div>
            <div class="base-item ${m.base===2?'base-active':''}" data-b="2">BIN: ${(m.val >>> 0).toString(2)}</div>
        `;
        
        this.btns.forEach(b => {
            const t = b.innerText;
            if (/^[0-9A-F]$/.test(t)) {
                b.disabled = parseInt(t, 16) >= m.base;
                b.style.opacity = b.disabled ? "0.2" : "1";
                b.style.pointerEvents = b.disabled ? "none" : "auto";
            }
        });
    }

    bind(handler) {
        const container = document.querySelector('.calc-container');
        if (!container) return;
        
        container.onclick = (e) => {
            const b = e.target.closest('.calc-btn');
            const p = e.target.closest('[data-b]');
            
            if (p) handler('BASE', parseInt(p.dataset.b));
            if (b) {
                const t = b.innerText === '⌫' ? 'DEL' : b.innerText;
                handler('BTN', t);
            }
        };
    }
}