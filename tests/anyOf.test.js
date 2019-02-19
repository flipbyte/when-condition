
import when from '../src/index';

describe('anyOf', () => {
    let data = { name: 'John Doe' }

    it('single rule', () => {
        expect(when(['name', ['John Doe', 'John'], 'anyOf'], data)).to.equal(true)
        expect(when(['name', ['John Doe', 'John'], 'anyOf'], data)).to.equal(true)
        expect(when(['name', ['Doe', 'John'], 'anyOf'], data)).to.equal(false)
    })

    it('single rule using "and"', () => {
        expect(when(['and', ['name', ['John Doe', 'John'], 'anyOf']], data)).to.equal(true)
        expect(when(['and', ['name', ['John Doe', 'John'], 'anyOf']], data)).to.equal(true)
        expect(when(['and', ['name', ['Doe', 'John'], 'anyOf']], data)).to.equal(false)
    })

    it('single rule using "or"', () => {
        expect(when(['or', ['name', ['John Doe', 'John'], 'anyOf']], data)).to.equal(true)
        expect(when(['or', ['name', ['John Doe', 'John'], 'anyOf']], data)).to.equal(true)
        expect(when(['or', ['name', ['Doe', 'John'], 'anyOf']], data)).to.equal(false)
    })

    it('deep object key', () => {
        let data = {
            contact: {
                person: {
                    name: 'John Doe'
                }
            }
        }

        expect(when(['contact.person.name', ['John Doe', 'John'], 'anyOf'], data)).to.equal(true)
        expect(when(['contact.person.name', ['John Doe', 'John'], 'anyOf'], data)).to.equal(true)
        expect(when(['contact.person.name', ['Doe', 'John'], 'anyOf'], data)).to.equal(false)
    })

    it('deep object array key', () => {
        let data = {
            contact: {
                person: [{
                    name: 'John Doe'
                }]
            }
        }

        expect(when(['contact.person.0.name', ['John Doe', 'John'], 'anyOf'], data)).to.equal(true)
        expect(when(['contact.person[0].name', ['John Doe', 'John'], 'anyOf'], data)).to.equal(true)
        expect(when(['contact.person[0].name', ['Doe', 'John'], 'anyOf'], data)).to.equal(false)
        expect(when(['contact.person[1].name', ['Doe', 'John', 'John Doe'], 'anyOf'], data)).to.equal(false)
    })

    it('throws error when values is not of type array', () => {
        (function() {
            when(['name', 'John', 'anyOf'], data)
        }.should.throw(/"anyOf" condition requires an array as #2 argument/));
    })
})
