import {CanvasRuler, widthSpace} from '../src/index'

describe('Index', function () {
    it('CanvasRuler', function (){
        const ruler = new CanvasRuler()
        expect(ruler.getWidth(' ')).toEqual(5)
    })
    it('widthSpace', function (){
        const ruler = new CanvasRuler()
        expect(ruler.getWidth(widthSpace(10))).toEqual(10)
    })
})
