import when from '../src/index';

describe('not', () => {
    let data = {
        name: 'John Doe',
        age: 18
    }

    it('is', () => {
        expect(when(['not', ['is', 'name', 'John Doe']], data)).to.equal(false)
        expect(when(['not', ['is', 'age', 17]], data)).to.equal(true)
    })

    it('(a and b)', () => {
        expect(when(['not', ['or', ['is', 'name', 'John Doe'], ['is', 'age', 18]]], data)).to.equal(false)
        expect(when(['not', ['or', ['is', 'name', 'John Doe'], ['is', 'age', 17]]], data)).to.equal(false)
        expect(when(['not', ['or', ['is', 'name', 'John'], ['is', 'age', 17]]], data)).to.equal(true)
    });

    it('(a or b)', () => {
        expect(when(['not', ['and', ['is', 'name', 'John Doe'], ['is', 'age', 18]]], data)).to.equal(false)
        expect(when(['not', ['and', ['is', 'name', 'John Doe'], ['is', 'age', 17]]], data)).to.equal(true)
        expect(when(['not', ['and', ['is', 'name', 'John'], ['is', 'age', 17]]], data)).to.equal(true)
    });

    it('multiple comparison rules throws error', () => {
        (function() {
            expect(when(['not', ['is', 'name', 'John Doe'], ['is', 'age', 18]], data))
        }.should.throw(/"not" can have only one comparison rule, multiple rules given/));
    });
})
