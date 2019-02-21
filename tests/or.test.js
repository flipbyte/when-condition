import when from '../src/index';

describe('or', () => {
    let data = {
        name: 'John Doe',
        age: 18
    }

    it('is', () => {
        expect(when(['or', ['is', 'name', 'John Doe'], ['is', 'age', 18]], data)).to.equal(true)
        expect(when(['or', ['is', 'name', 'John'], ['is', 'age', 17]], data)).to.equal(false)
    })

    it('isNot', () => {
        expect(when(['or', ['isNot', 'name', 'John Doe'], ['isNot', 'age', 18]], data)).to.equal(false)
        expect(when(['or', ['isNot', 'name', 'John Doe'], ['isNot', 'age', 17]], data)).to.equal(true)
        expect(when(['or', ['isNot', 'name', 'John'], ['isNot', 'age', 17]], data)).to.equal(true)
    })
})
