import when from '../src/index';

describe('and', () => {
    let data = {
        name: 'John Doe',
        age: 18
    }

    it('is', () => {
        expect(when(['and', ['is', 'name', 'John Doe'], ['is', 'age', 18]], data)).to.equal(true)
        expect(when(['and', ['is', 'name', 'John Doe'], ['is', 'age', 17]], data)).to.equal(false)
    });

    it('a and not b', () => {
        expect(when(['and', ['is', 'name', 'John Doe'], ['not', ['is', 'age', 18]]], data)).to.equal(false);
        expect(when(['and', ['is', 'name', 'John Doe'], ['not', ['is', 'age', 17]]], data)).to.equal(true);
    });

    it('not a and not b', () => {
        expect(when(['and', ['not', ['is', 'name', 'John Doe']], ['not', ['is', 'age', 18]]], data)).to.equal(false);
        expect(when(['and', ['not', ['is', 'name', 'John']], ['not', ['is', 'age', 17]]], data)).to.equal(true);
    });
})
