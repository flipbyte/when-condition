import when from '../src/index';

describe('or', () => {
    let data = {
        name: 'John Doe',
        age: 18
    }

    it('is', () => {
        expect(when(['or', ['name', 'John Doe', 'is'], ['age', 18, 'is']], data)).to.equal(true)
        expect(when(['or', ['name', 'John', 'is'], ['age', 17, 'is']], data)).to.equal(false)
    })

    it('isNot', () => {
        expect(when(['or', ['name', 'John Doe', 'isNot'], ['age', 18, 'isNot']], data)).to.equal(false)
        expect(when(['or', ['name', 'John Doe', 'isNot'], ['age', 17, 'isNot']], data)).to.equal(true)
        expect(when(['or', ['name', 'John', 'isNot'], ['age', 17, 'isNot']], data)).to.equal(true)
    })
})
