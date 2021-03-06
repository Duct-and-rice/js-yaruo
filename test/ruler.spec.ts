import {CanvasRuler, canvasRulerInstance} from '../src/ruler'
import {SPACES} from '../src/space'
import * as isNode from 'is-node'

/**
 * @jest-environment node
 */
describe('Ruler', function () {
    it('Is this Node', function(){
        expect(isNode).toBeTruthy()
    })
    describe('Singleton', function () {
        it('CanvasRuler must be a singleton', function () {
            const a = new CanvasRuler()
            const b = new CanvasRuler()
            expect(a).toEqual(b)
            expect(a).toEqual(canvasRulerInstance)
        })
    })

    describe('Width', function () {
        it('CanvasRuler Spaces', function () {
            const ruler = new CanvasRuler()
            expect(ruler.getWidth('')).toEqual(0)
            expect(ruler.getWidth(' ')).toEqual(5)
            expect(ruler.getWidth('　')).toEqual(11)
            expect(ruler.getWidth('　 ')).toEqual(16)
        })
        it('Special Spaces', function () {
            const ruler = new CanvasRuler()
            for (const space of SPACES) {
                expect(ruler.getWidth(space.str)).toEqual(space.dots)
            }
        })
        it('Parallel Ruler', function (done) {
            const ruler = new CanvasRuler()
            Promise.all(SPACES.map(space =>
                new Promise(resolve => {
                    expect(ruler.getWidth(space.str)).toEqual(space.dots)
                    resolve()
                })
            )).then(() => done())
        })
        it('The ruler is unlocked', function () {
            const ruler = new CanvasRuler()
            expect(ruler.isLocked()).toBeFalsy()
        })
        it('when the ruler is locked', function () {
            const ruler = new CanvasRuler()
            ruler.lock()
            expect(()=>{
                ruler.getWidth(' ')
            }).toThrow()
            ruler.unlock()
        })
    })
})
