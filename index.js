(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('canvas')) :
	typeof define === 'function' && define.amd ? define(['exports', 'canvas'], factory) :
	(factory((global['js-yaruo'] = {}),global.canvas));
}(this, (function (exports,canvas) { 'use strict';

const SPACES = Object.freeze([
    { dots: 1, str: '\u200a', name: 'HAIR SPACE', unicode: true },
    { dots: 2, str: '\u2009', name: 'THIN SPACE', unicode: true },
    { dots: 3, str: '\u2006', name: 'SIX-PER-EM SPACE', unicode: true },
    { dots: 4, str: '\u2005', name: 'FOUR-PER-EM SPACE', unicode: true },
    { dots: 5, str: '\u2004', name: 'THREE-PER-EM SPACE', unicode: true },
    { dots: 5, str: '\u0020', name: 'SPACE', unicode: false },
    { dots: 8, str: '\u2002', name: 'EN SPACE', unicode: true },
    { dots: 10, str: '\u2007', name: 'FIGURE SPACE', unicode: true },
    { dots: 11, str: '\u3000', name: 'IDEOGRAPHIC SPACE', unicode: false },
    { dots: 16, str: '\u2003', name: 'EM SPACE', unicode: true }
]);
const HALF_SPACE = '\u0020';
const DOTS_TO_SPACE = Object.freeze((() => {
    const result = [];
    for (const space of SPACES) {
        if (space.name === 'SPACE') {
            continue;
        }
        result[space.dots] = space;
    }
    return result;
})());
function generateSpaceFromAH(a, h) {
    if (a === 0 && h === 1) {
        return HALF_SPACE;
    }
    if (a < h || a < 0 || h < 0) {
        throw new Error('a:' + a + ',h:' + h);
    }
    return DOTS_TO_SPACE[11].str.repeat(a - h) +
        (DOTS_TO_SPACE[11].str + HALF_SPACE).repeat(h);
}
function adjustWithUnicode(adjuster) {
    if (adjuster >= 11) {
        throw new Error('Adjuster is ' + adjuster);
    }
    if (adjuster === 0) {
        return '';
    }
    let res = '';
    if (adjuster > 5) {
        adjuster -= 5;
        res = HALF_SPACE;
    }
    res = DOTS_TO_SPACE[adjuster].str + res;
    return res;
}
function oneDotReduce(ah) {
    ah = (() => {
        if (ah.a - 1 >= ah.h + 2) {
            return { a: ah.a - 1, h: ah.h + 2, adj: ah.adj };
        }
        else if (ah.adj >= 1) {
            return { a: ah.a, h: ah.h, adj: ah.adj - 1 };
        }
        else if (ah.h >= 1) {
            return { a: ah.a, h: ah.h - 1, adj: ah.adj + 4 };
        }
        else if (ah.a >= 1 && ah.adj < 6) {
            return { a: ah.a - 1, h: ah.h + 1, adj: ah.adj + 5 };
        }
    })();
    if (ah.h >= 1 && ah.adj <= 6) {
        ah.h--;
        ah.adj += 5;
    }
    return ah;
}
function adjToAH(ah) {
    if (ah.adj === 5) {
        ah.h++;
        ah.adj = 0;
    }
    const gap = 11 - ah.adj;
    if (ah.a + 1 - gap >= ah.h + 2 * gap) {
        ah.a++;
        ah.a -= gap;
        ah.h += 2 * gap;
        ah.adj = 0;
    }
    return ah;
}
function widthSpace(sp) {
    if (typeof sp !== 'number') {
        throw new TypeError();
    }
    const mod = sp % 11;
    let a = 0;
    let h = 0;
    let adj = 0;
    switch (mod) {
        case 0:
            a = Math.floor(sp / 11);
            break;
        case 1:
        case 2:
        case 3:
        case 4:
            a = Math.floor(sp / 11);
            h = 1;
            break;
        case 5:
            if (sp === 5) {
                return DOTS_TO_SPACE[5].str;
            }
            a = Math.floor(sp / 11);
            h = 1;
            break;
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
            a = Math.ceil(sp / 11);
            break;
    }
    if (mod !== 0 && mod !== 5) {
        while (a * 11 + h * 5 + adj !== sp) {
            const ah = (oneDotReduce({ a, h, adj }));
            a = ah.a;
            h = ah.h;
            adj = ah.adj;
        }
        const ah = adjToAH({ a, h, adj });
        a = ah.a;
        h = ah.h;
        adj = ah.adj;
    }
    return generateSpaceFromAH(a, h) + adjustWithUnicode(adj);
}

const isNode = require('is-node');
let canvasRulerInstance;
const TEN_DOTS_SPACE = SPACES.filter(space => space.dots == 10)[0].str;
const FIVE_DOTS_SPACE = SPACES.filter(space => space.dots == 5)[0].str;
class CanvasRuler {
    constructor() {
        if (!canvasRulerInstance) {
            if (isNode) {
                canvas.registerFont('assets/Saitamaar.ttf', { family: 'Stmr' });
            }
            const ruler = canvas.createCanvas(0, 0);
            this.ruler = ruler;
            this.unlock();
            canvasRulerInstance = this;
        }
        return canvasRulerInstance;
    }
    getWidth(str) {
        if (this.locked) {
            throw new Error('Locked');
        }
        else if (this.ruler.getContext) {
            this.lock();
            const context = this.ruler.getContext('2d');
            context.font = '16px Stmr';
            const metrics = context.measureText(str.replace(new RegExp(TEN_DOTS_SPACE, 'g'), FIVE_DOTS_SPACE.repeat(2)));
            this.unlock();
            return Math.round(metrics.width);
        }
    }
    isLocked() {
        return this.locked;
    }
    lock() {
        this.locked = true;
    }
    unlock() {
        this.locked = false;
    }
}

exports.CanvasRuler = CanvasRuler;
exports.widthSpace = widthSpace;

Object.defineProperty(exports, '__esModule', { value: true });

})));
