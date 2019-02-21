import when from '../src/index';

describe('is', () => {
    let data = { name: 'John Doe' }

    it('single rule', () => {
        expect(when(['is', 'name', 'John Doe'], data)).to.equal(true)
        expect(when(['is', 'name', 'John'], data)).to.equal(false)
    })

    it('single rule using "and"', () => {
        expect(when(['and', ['is', 'name', 'John Doe']], data)).to.equal(true)
        expect(when(['and', ['is', 'name', 'John']], data)).to.equal(false)
    })

    it('single rule using "or"', () => {
        expect(when(['or', ['is', 'name', 'John Doe']], data)).to.equal(true)
        expect(when(['or', ['is', 'name', 'John']], data)).to.equal(false)
    })

    it('deep object key', () => {
        let data = {
            contact: {
                person: {
                    name: 'John Doe'
                }
            }
        }
        expect(when(['is', 'contact.person.name', 'John Doe'], data)).to.equal(true)
        expect(when(['is', 'contact.person.lastName', 'John Doe'], data)).to.equal(false)
    })

    it('deep object array key', () => {
        let data = {
            contact: {
                person: [{
                    name: 'John Doe'
                }]
            }
        }
        expect(when(['is', 'contact.person.0.name', 'John Doe'], data)).to.equal(true)
        expect(when(['is', 'contact.person[0].name', 'John Doe'], data)).to.equal(true)
        expect(when(['is', 'contact.person[1].name', 'John Doe'], data)).to.equal(false)
    })
})
