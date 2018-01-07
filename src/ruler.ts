import { createCanvas, registerFont } from 'canvas'
import { SPACES } from './space'
import isNode from 'is-node'

export let canvasRulerInstance: CanvasRuler
const TEN_DOTS_SPACE:string=SPACES.filter(space=>space.dots==10)[0].str
const FIVE_DOTS_SPACE:string=SPACES.filter(space=>space.dots==5)[0].str

export class CanvasRuler {
    private ruler: any
    private isLock: boolean
    constructor () {
        if (!canvasRulerInstance) {
            if(isNode){
                registerFont('assets/Saitamaar.ttf', {family: 'Stmr'});
            }
            const ruler = createCanvas(0, 0)
            this.ruler = ruler
            this.isLock = false
            canvasRulerInstance = this
        }
        return canvasRulerInstance
    }

    getWidth (str: string) {
        if (this.isLock) {
            throw new Error('Locked')
        }
        if (this.ruler.getContext) {
            this.isLock = true
            const context = this.ruler.getContext('2d')
            context.font = '16px Stmr'
            const metrics = context.measureText(str.replace(
                new RegExp(TEN_DOTS_SPACE, 'g'),
                FIVE_DOTS_SPACE.repeat(2)))
            this.isLock = false
            return Math.round(metrics.width)
        }
    }
}
