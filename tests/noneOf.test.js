
import when from '../src/index';

describe('noneOf', () => {
    let data = { name: 'John Doe' }

    it('single rule', () => {
        expect(when(['name', ['Doe', 'John'], 'noneOf'], data)).to.equal(true)
        expect(when(['name', ['Doe', 'John'], 'noneOf'], data)).to.equal(true)
        expect(when(['name', ['John Doe', 'John'], 'noneOf'], data)).to.equal(false)
    })

    it('single rule using "and"', () => {
        expect(when(['and', ['name', ['Doe', 'John'], 'noneOf']], data)).to.equal(true)
        expect(when(['and', ['name', ['Doe', 'John'], 'noneOf']], data)).to.equal(true)
        expect(when(['and', ['name', ['John Doe', 'John'], 'noneOf']], data)).to.equal(false)
    })

    it('single rule using "or"', () => {
        expect(when(['or', ['name', ['Doe', 'John'], 'noneOf']], data)).to.equal(true)
        expect(when(['or', ['name', ['Doe', 'John'], 'noneOf']], data)).to.equal(true)
        expect(when(['or', ['name', ['John Doe', 'John'], 'noneOf']], data)).to.equal(false)
    })

    it('deep object key', () => {
        let data = {
            contact: {
                person: {
                    name: 'John Doe'
                }
            }
        }

        expect(when(['contact.person.name', ['Doe', 'John'], 'noneOf'], data)).to.equal(true)
        expect(when(['contact.person.name', ['Doe', 'John'], 'noneOf'], data)).to.equal(true)
        expect(when(['contact.person.name', ['John Doe', 'John'], 'noneOf'], data)).to.equal(false)
    })

    it('deep object array key', () => {
        let data = {
            contact: {
                person: [{
                    name: 'John Doe'
                }]
            }
        }

        expect(when(['contact.person.0.name', ['Doe', 'John'], 'noneOf'], data)).to.equal(true)
        expect(when(['contact.person[0].name', ['Doe', 'John'], 'noneOf'], data)).to.equal(true)
        expect(when(['contact.person[0].name', ['John Doe', 'John'], 'noneOf'], data)).to.equal(false)
        expect(when(['contact.person[1].name', ['John Doe', 'John'], 'noneOf'], data)).to.equal(true)
    })

    it('throws error when values is not of type array', () => {
        (function() {
            when(['name', 'John Doe', 'noneOf'], data)
        }.should.throw(/"noneOf" condition requires an array as #2 argument/));
    })
})
