import when from '../src/index';

describe('or', () => {
    let data = {
        name: 'John Doe',
        age: 18
    }

    it('is', () => {
        expect(when(['or', ['is', 'name', 'John Doe'], ['is', 'age', 18]], data)).to.equal(true)
        expect(when(['or', ['is', 'name', 'John'], ['is', 'age', 17]], data)).to.equal(false)
    });

    it('a or not b', () => {
        expect(when(['or', ['is', 'name', 'John Doe'], ['not', ['is', 'age', 18]]], data)).to.equal(true);
        expect(when(['or', ['is', 'name', 'John Doe'], ['not', ['is', 'age', 17]]], data)).to.equal(true);
        expect(when(['or', ['is', 'name', 'John'], ['not', ['is', 'age', 18]]], data)).to.equal(false);
    });

    it('not a or not b', () => {
        expect(when(['or', ['not', ['is', 'name', 'John Doe']], ['not', ['is', 'age', 18]]], data)).to.equal(false);
        expect(when(['or', ['not', ['is', 'name', 'John']], ['not', ['is', 'age', 17]]], data)).to.equal(true);
        expect(when(['or', ['not', ['is', 'name', 'John Doe']], ['not', ['is', 'age', 17]]], data)).to.equal(true);
    });
})
