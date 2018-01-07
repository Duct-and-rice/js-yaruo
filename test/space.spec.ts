import { adjustWithUnicode, default as widthSpace, generateSpaceFromAH } from '../src/space'
import { CanvasRuler } from '../src/ruler'

describe('Space', function () {
    it('Ideographic Space', function () {
        expect(widthSpace(11)).toEqual('　')
    })
    it('Spaces', function () {
        const ruler = new CanvasRuler()
        for (let i = 1; i < 1000; i++) {
            const sp = widthSpace(i)
            expect(ruler.getWidth(sp)).toEqual(i)
            expect(sp.charAt(0)).not.toEqual(' ')
            expect(sp.includes('  ')).toBeFalsy()
        }
    })
    it('Adjust with Unicode', function () {
        const ruler = new CanvasRuler()
        expect(ruler.getWidth(adjustWithUnicode(1))).toEqual(1)
    })
    it('generateSpaceFromAH returns half space', function () {
        expect(generateSpaceFromAH(0, 1)).toEqual(' ')
    })
    describe('Error Check', function () {
        it('generateSpaceFromAH', function () {
            expect(() => generateSpaceFromAH(-1, -1)).toThrow()
        })
        it('adjustWithUnicode', function () {
            expect(() => adjustWithUnicode(50)).toThrow()
        })
        it('widthSpace', function () {
            expect(() => widthSpace('a')).toThrow()
        })
    })
})
