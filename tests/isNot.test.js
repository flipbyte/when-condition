import when from '../src/index';

describe('isNot', () => {
    let data = { name: 'John Doe' }

    it('single rule', () => {
        expect(when(['isNot', 'name', 'John Doe'], data)).to.equal(false)
        expect(when(['isNot', 'name', 'John'], data)).to.equal(true)
    })

    it('single rule using "and"', () => {
        expect(when(['and', ['isNot', 'name', 'John Doe']], data)).to.equal(false)
        expect(when(['and', ['isNot', 'name', 'John']], data)).to.equal(true)
    })

    it('single rule using "or"', () => {
        expect(when(['or', ['isNot', 'name', 'John Doe']], data)).to.equal(false)
        expect(when(['or', ['isNot', 'name', 'John']], data)).to.equal(true)
    })

    it('deep object key', () => {
        let data = {
            contact: {
                person: {
                    name: 'John Doe'
                }
            }
        }
        expect(when(['isNot', 'contact.person.name', 'John Doe'], data)).to.equal(false)
        expect(when(['isNot', 'contact.person.name', 'John'], data)).to.equal(true)
    })

    it('deep object array key', () => {
        let data = {
            contact: {
                person: {
                    name: 'John Doe'
                }
            }
        }
        expect(when(['isNot', 'contact.person.0.name', 'John Doe'], data)).to.equal(true)
        expect(when(['isNot', 'contact.person[0].name', 'John'], data)).to.equal(true)
        expect(when(['isNot', 'contact.person[1].name', 'John'], data)).to.equal(true)
    })
})
