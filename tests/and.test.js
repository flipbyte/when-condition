import when from '../src/index';

describe('and', () => {
    let data = {
        name: 'John Doe',
        age: 18
    }

    it('is', () => {
        expect(when(['and', ['is', 'name', 'John Doe'], ['is', 'age', 18]], data)).to.equal(true)
        expect(when(['and', ['is', 'name', 'John Doe'], ['is', 'age', 17]], data)).to.equal(false)
    })

    it('isNot', () => {
        expect(when(['and', ['isNot', 'name', 'John Doe'], ['isNot', 'age', 18]], data)).to.equal(false)
        expect(when(['and', ['isNot', 'name', 'John Doe'], ['isNot', 'age', 17]], data)).to.equal(false)
        expect(when(['and', ['isNot', 'name', 'John'], ['isNot', 'age', 17]], data)).to.equal(true)
    })
})
