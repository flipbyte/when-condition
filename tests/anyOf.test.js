import when from '../src/index';

describe('anyOf', () => {
    let data = { name: 'John Doe' }

    it('single rule', () => {
        expect(when(['anyOf', 'name', ['John Doe', 'John']], data)).to.equal(true)
        expect(when(['anyOf', 'name', ['John Doe', 'John']], data)).to.equal(true)
        expect(when(['anyOf', 'name', ['Doe', 'John']], data)).to.equal(false)
    })

    it('single rule using "and"', () => {
        expect(when(['and', ['anyOf', 'name', ['John Doe', 'John']]], data)).to.equal(true)
        expect(when(['and', ['anyOf', 'name', ['John Doe', 'John']]], data)).to.equal(true)
        expect(when(['and', ['anyOf', 'name', ['Doe', 'John']]], data)).to.equal(false)
    })

    it('single rule using "or"', () => {
        expect(when(['or', ['anyOf', 'name', ['John Doe', 'John']]], data)).to.equal(true)
        expect(when(['or', ['anyOf', 'name', ['John Doe', 'John']]], data)).to.equal(true)
        expect(when(['or', ['anyOf', 'name', ['Doe', 'John']]], data)).to.equal(false)
    })

    it('deep object key', () => {
        let data = {
            contact: {
                person: {
                    name: 'John Doe'
                }
            }
        }

        expect(when(['anyOf', 'contact.person.name', ['John Doe', 'John']], data)).to.equal(true)
        expect(when(['anyOf', 'contact.person.name', ['John Doe', 'John']], data)).to.equal(true)
        expect(when(['anyOf', 'contact.person.name', ['Doe', 'John']], data)).to.equal(false)
    })

    it('deep object array key', () => {
        let data = {
            contact: {
                person: [{
                    name: 'John Doe'
                }]
            }
        }

        expect(when(['anyOf', 'contact.person.0.name', ['John Doe', 'John']], data)).to.equal(true)
        expect(when(['anyOf', 'contact.person[0].name', ['John Doe', 'John']], data)).to.equal(true)
        expect(when(['anyOf', 'contact.person[0].name', ['Doe', 'John']], data)).to.equal(false)
        expect(when(['anyOf', 'contact.person[1].name', ['Doe', 'John', 'John Doe']], data)).to.equal(false)
    })

    it('throws error when values is not of type array', () => {
        (function() {
            when(['anyOf', 'name', 'John'], data)
        }.should.throw(/"anyOf" condition requires an array as #3 argument/));
    });
});

describe('not anyOf (noneOf)', () => {
    let data = { name: 'John Doe' }

    it('singleRule', () => {
        expect(when(['not', ['anyOf', 'name', ['Doe', 'John']]], data)).to.equal(true)
        expect(when(['not', ['anyOf', 'name', ['Doe', 'John']]], data)).to.equal(true)
        expect(when(['not', ['anyOf', 'name', ['John Doe', 'John']]], data)).to.equal(false)
    })

    it('single rule "and"', () => {
        expect(when(['not', ['or', ['anyOf', 'name', ['Doe', 'John']]]], data)).to.equal(true)
        expect(when(['not', ['or', ['anyOf', 'name', ['Doe', 'John']]]], data)).to.equal(true)
        expect(when(['not', ['or', ['anyOf', 'name', ['John Doe', 'John']]]], data)).to.equal(false)
    })

    it('single rule "or"', () => {
        expect(when(['not', ['and', ['anyOf', 'name', ['Doe', 'John']]]], data)).to.equal(true)
        expect(when(['not', ['and', ['anyOf', 'name', ['Doe', 'John']]]], data)).to.equal(true)
        expect(when(['not', ['and', ['anyOf', 'name', ['John Doe', 'John']]]], data)).to.equal(false)
    })

    it('deep object key', () => {
        let data = {
            contact: {
                person: {
                    name: 'John Doe'
                }
            }
        }

        expect(when(['not', ['anyOf', 'contact.person.name', ['Doe', 'John']]], data)).to.equal(true)
        expect(when(['not', ['anyOf', 'contact.person.name', ['Doe', 'John']]], data)).to.equal(true)
        expect(when(['not', ['anyOf', 'contact.person.name', ['John Doe', 'John']]], data)).to.equal(false)
    })

    it('deep object array key', () => {
        let data = {
            contact: {
                person: [{
                    name: 'John Doe'
                }]
            }
        }

        expect(when(['not', ['anyOf', 'contact.person.0.name', ['Doe', 'John']]], data)).to.equal(true)
        expect(when(['not', ['anyOf', 'contact.person[0].name', ['Doe', 'John']]], data)).to.equal(true)
        expect(when(['not', ['anyOf', 'contact.person[0].name', ['John Doe', 'John']]], data)).to.equal(false)
        expect(when(['not', ['anyOf', 'contact.person[1].name', ['John Doe', 'John']]], data)).to.equal(true)
    })

    it('throws error when values is not of type array', () => {
        (function() {
            when(['not', ['anyOf', 'name', 'John Doe']], data)
        }.should.throw(/"anyOf" condition requires an array as #3 argument/));
    });
});
