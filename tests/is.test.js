
import when from '../src/index';

describe('is', () => {
    let data = { name: 'John Doe' }

    it('single rule', () => {
        expect(when(['name', 'John Doe', 'is'], data)).to.equal(true)
        expect(when(['name', 'John', 'is'], data)).to.equal(false)
    })

    it('single rule using "and"', () => {
        expect(when(['and', ['name', 'John Doe', 'is']], data)).to.equal(true)
        expect(when(['and', ['name', 'John', 'is']], data)).to.equal(false)
    })

    it('single rule using "or"', () => {
        expect(when(['or', ['name', 'John Doe', 'is']], data)).to.equal(true)
        expect(when(['or', ['name', 'John', 'is']], data)).to.equal(false)
    })

    it('deep object key', () => {
        let data = {
            contact: {
                person: {
                    name: 'John Doe'
                }
            }
        }
        expect(when(['contact.person.name', 'John Doe', 'is'], data)).to.equal(true)
        expect(when(['contact.person.lastName', 'John Doe', 'is'], data)).to.equal(false)
    })

    it('deep object array key', () => {
        let data = {
            contact: {
                person: [{
                    name: 'John Doe'
                }]
            }
        }
        expect(when(['contact.person.0.name', 'John Doe', 'is'], data)).to.equal(true)
        expect(when(['contact.person[0].name', 'John Doe', 'is'], data)).to.equal(true)
        expect(when(['contact.person[1].name', 'John Doe', 'is'], data)).to.equal(false)
    })
})
