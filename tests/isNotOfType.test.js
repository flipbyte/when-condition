import when from '../src/index';

describe('isNotOfType', () => {
    let data = { name: 'John Doe' }

    it('single rule', () => {
        expect(when(['isNotOfType', 'firstname', 'undefined'], data)).to.equal(false)
        expect(when(['isNotOfType', 'name', 'undefined'], data)).to.equal(true)
    })

    it('single rule using "and"', () => {
        expect(when(['and', ['isNotOfType', 'firstname', 'undefined']], data)).to.equal(false)
        expect(when(['and', ['isNotOfType', 'name', 'John']], data)).to.equal(true)
    })

    it('single rule using "or"', () => {
        expect(when(['or', ['isNotOfType', 'firstname', 'undefined']], data)).to.equal(false)
        expect(when(['or', ['isNotOfType', 'name', 'John']], data)).to.equal(true)
    })

    it('deep object key', () => {
        let data = {
            contact: {
                person: {
                    name: 'John Doe'
                }
            }
        }
        expect(when(['isNotOfType', 'contact.person.name', 'John Doe'], data)).to.equal(true)
        expect(when(['isNotOfType', 'contact.person.lastName', 'undefined'], data)).to.equal(false)
    })

    it('deep object array key', () => {
        let data = {
            contact: {
                person: [{
                    name: 'John Doe'
                }]
            }
        }
        expect(when(['isNotOfType', 'contact.person.0.name', 'John Doe'], data)).to.equal(true)
        expect(when(['isNotOfType', 'contact.person[0].name', 'John Doe'], data)).to.equal(true)
        expect(when(['isNotOfType', 'contact.person[1].name', 'undefined'], data)).to.equal(false)
    })
})
