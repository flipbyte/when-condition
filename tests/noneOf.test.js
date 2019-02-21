import when from '../src/index';

describe('noneOf', () => {
    let data = { name: 'John Doe' }

    it('single rule', () => {
        expect(when(['noneOf', 'name', ['Doe', 'John']], data)).to.equal(true)
        expect(when(['noneOf', 'name', ['Doe', 'John']], data)).to.equal(true)
        expect(when(['noneOf', 'name', ['John Doe', 'John']], data)).to.equal(false)
    })

    it('single rule using "and"', () => {
        expect(when(['and', ['noneOf', 'name', ['Doe', 'John']]], data)).to.equal(true)
        expect(when(['and', ['noneOf', 'name', ['Doe', 'John']]], data)).to.equal(true)
        expect(when(['and', ['noneOf', 'name', ['John Doe', 'John']]], data)).to.equal(false)
    })

    it('single rule using "or"', () => {
        expect(when(['or', ['noneOf', 'name', ['Doe', 'John']]], data)).to.equal(true)
        expect(when(['or', ['noneOf', 'name', ['Doe', 'John']]], data)).to.equal(true)
        expect(when(['or', ['noneOf', 'name', ['John Doe', 'John']]], data)).to.equal(false)
    })

    it('deep object key', () => {
        let data = {
            contact: {
                person: {
                    name: 'John Doe'
                }
            }
        }

        expect(when(['noneOf', 'contact.person.name', ['Doe', 'John']], data)).to.equal(true)
        expect(when(['noneOf', 'contact.person.name', ['Doe', 'John']], data)).to.equal(true)
        expect(when(['noneOf', 'contact.person.name', ['John Doe', 'John']], data)).to.equal(false)
    })

    it('deep object array key', () => {
        let data = {
            contact: {
                person: [{
                    name: 'John Doe'
                }]
            }
        }

        expect(when(['noneOf', 'contact.person.0.name', ['Doe', 'John']], data)).to.equal(true)
        expect(when(['noneOf', 'contact.person[0].name', ['Doe', 'John']], data)).to.equal(true)
        expect(when(['noneOf', 'contact.person[0].name', ['John Doe', 'John']], data)).to.equal(false)
        expect(when(['noneOf', 'contact.person[1].name', ['John Doe', 'John']], data)).to.equal(true)
    })

    it('throws error when values is not of type array', () => {
        (function() {
            when(['noneOf', 'name', 'John Doe'], data)
        }.should.throw(/"noneOf" condition requires an array as #3 argument/));
    })
})
