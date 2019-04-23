import when from '../src/index';

describe('is', () => {
    let data = { name: 'John Doe' }

    it('single rule', () => {
        expect(when(['isOfType', 'firstname', 'undefined'], data)).to.equal(true)
        expect(when(['isOfType', 'name', 'undefined'], data)).to.equal(false)
    })

    it('single rule using "and"', () => {
        expect(when(['and', ['isOfType', 'firstname', 'undefined']], data)).to.equal(true)
        expect(when(['and', ['isOfType', 'name', 'John']], data)).to.equal(false)
    })

    it('single rule using "or"', () => {
        expect(when(['or', ['isOfType', 'firstname', 'undefined']], data)).to.equal(true)
        expect(when(['or', ['isOfType', 'name', 'John']], data)).to.equal(false)
    })

    it('deep object key', () => {
        let data = {
            contact: {
                person: {
                    name: 'John Doe'
                }
            }
        }
        expect(when(['isOfType', 'contact.person.name', 'John Doe'], data)).to.equal(false)
        expect(when(['isOfType', 'contact.person.lastName', 'undefined'], data)).to.equal(true)
    })

    it('deep object array key', () => {
        let data = {
            contact: {
                person: [{
                    name: 'John Doe'
                }]
            }
        }
        expect(when(['isOfType', 'contact.person.0.name', 'John Doe'], data)).to.equal(false)
        expect(when(['isOfType', 'contact.person[0].name', 'John Doe'], data)).to.equal(false)
        expect(when(['isOfType', 'contact.person[1].name', 'undefined'], data)).to.equal(true)
    })
})
