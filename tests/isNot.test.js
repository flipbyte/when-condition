
import when from '../src/index';

describe('isNot', () => {
    let data = { name: 'John Doe' }

    it('single rule', () => {
        expect(when(['name', 'John Doe', 'isNot'], data)).to.equal(false)
        expect(when(['name', 'John', 'isNot'], data)).to.equal(true)
    })

    it('single rule using "and"', () => {
        expect(when(['and', ['name', 'John Doe', 'isNot']], data)).to.equal(false)
        expect(when(['and', ['name', 'John', 'isNot']], data)).to.equal(true)
    })

    it('single rule using "or"', () => {
        expect(when(['or', ['name', 'John Doe', 'isNot']], data)).to.equal(false)
        expect(when(['or', ['name', 'John', 'isNot']], data)).to.equal(true)
    })

    it('deep object key', () => {
        let data = {
            contact: {
                person: {
                    name: 'John Doe'
                }
            }
        }
        expect(when(['contact.person.name', 'John Doe', 'isNot'], data)).to.equal(false)
        expect(when(['contact.person.name', 'John', 'isNot'], data)).to.equal(true)
    })

    it('deep object array key', () => {
        let data = {
            contact: {
                person: {
                    name: 'John Doe'
                }
            }
        }
        expect(when(['contact.person.0.name', 'John Doe', 'isNot'], data)).to.equal(true)
        expect(when(['contact.person[0].name', 'John', 'isNot'], data)).to.equal(true)
        expect(when(['contact.person[1].name', 'John', 'isNot'], data)).to.equal(true)
    })
})
