import { createCanvas, registerFont } from 'canvas'
import { SPACES } from './space'
const isNode = require('is-node')

export let canvasRulerInstance: CanvasRuler
const TEN_DOTS_SPACE:string=SPACES.filter(space=>space.dots==10)[0].str
const FIVE_DOTS_SPACE:string=SPACES.filter(space=>space.dots==5)[0].str

export class CanvasRuler {
    private ruler: any
    private locked: boolean

    public constructor () {
        if (!canvasRulerInstance) {
            if(isNode){
                registerFont('assets/Saitamaar.ttf', {family: 'Stmr'});
            }
            const ruler = createCanvas(0, 0)
            this.ruler = ruler
            this.unlock()
            canvasRulerInstance = this
        }
        return canvasRulerInstance
    }

    public getWidth (str: string):number {
        if (this.locked) {
            throw new Error('Locked')
        } else if (this.ruler.getContext) {
            this.lock()
            const context = this.ruler.getContext('2d')
            context.font = '16px Stmr'
            const metrics = context.measureText(str.replace(
                new RegExp(TEN_DOTS_SPACE, 'g'),
                FIVE_DOTS_SPACE.repeat(2)))
            this.unlock()
            return Math.round(metrics.width)
        }
    }

    public isLocked ():boolean {
        return this.locked
    }

    public lock () {
        this.locked=true
    }

    public unlock () {
        this.locked=false
    }
}
