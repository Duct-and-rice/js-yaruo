import {CanvasRuler} from '../src/ruler'
import {SPACES} from '../src/space'

describe('Ruler', function () {
    describe('Singleton', function () {
        it('CanvasRuler must be a singleton', function () {
            const a = new CanvasRuler()
            const b = new CanvasRuler()
            expect(a).toEqual(b)
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
                console.log(`'${space.name}'`)
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
    })
})
