import {CanvasRuler, canvasRulerInstance} from '../src/ruler'
import {SPACES} from '../src/space'

describe('Ruler in the browser', function () {
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
        it('Is Ruler Locked', function () {
            const ruler = new CanvasRuler()
            expect(ruler.isLocked()).toBeFalsy()
        })
    })
})
