import when from '../src/index';

describe('lte', () => {
    let data = { age: 18 }

    it('single rule', () => {
        expect(when(['lte', 'age', 19], data)).to.equal(true)
        expect(when(['lte', 'age', '19'], data)).to.equal(true)
        expect(when(['lte', 'age', 18], data)).to.equal(true)
        expect(when(['lte', 'age', 16], data)).to.equal(false)
    })

    it('single rule using "and"', () => {
        expect(when(['and', ['lte', 'age', 19]], data)).to.equal(true)
        expect(when(['and', ['lte', 'age', '19']], data)).to.equal(true)
        expect(when(['and', ['lte', 'age', 18]], data)).to.equal(true)
        expect(when(['and', ['lte', 'age', 16]], data)).to.equal(false)
    })

    it('single rule using "or"', () => {
        expect(when(['or', ['lte', 'age', 19]], data)).to.equal(true)
        expect(when(['or', ['lte', 'age', '19']], data)).to.equal(true)
        expect(when(['or', ['lte', 'age', 18]], data)).to.equal(true)
        expect(when(['or', ['lte', 'age', 16]], data)).to.equal(false)
    })

    it('deep object key', () => {
        let data = {
            contact: {
                person: {
                    name: 'John Doe',
                    age: 18
                }
            }
        }

        expect(when(['lte', 'contact.person.age', 19], data)).to.equal(true)
        expect(when(['lte', 'contact.person.age', '19'], data)).to.equal(true)
        expect(when(['lte', 'contact.person.age', 18], data)).to.equal(true)
        expect(when(['lte', 'contact.person.age', 16], data)).to.equal(false)
    })

    it('deep object array key', () => {
        let data = {
            contact: {
                person: [{
                    name: 'John Doe',
                    age: 18
                }]
            }
        }

        expect(when(['lte', 'contact.person.0.age', 19], data)).to.equal(true)
        expect(when(['lte', 'contact.person.0.age', '19'], data)).to.equal(true)
        expect(when(['lte', 'contact.person.0.age', 18], data)).to.equal(true)
        expect(when(['lte', 'contact.person.0.age', 16], data)).to.equal(false)

        expect(when(['lte', 'contact.person[0].age', 19], data)).to.equal(true)
        expect(when(['lte', 'contact.person[0].age', '19'], data)).to.equal(true)
        expect(when(['lte', 'contact.person[0].age', 18], data)).to.equal(true)
        expect(when(['lte', 'contact.person[0].age', 16], data)).to.equal(false)

        expect(when(['lte', 'contact.person[1].age', 19], data)).to.equal(false)
        expect(when(['lte', 'contact.person[1].age', '19'], data)).to.equal(false)
        expect(when(['lte', 'contact.person[1].age', 18], data)).to.equal(false)
        expect(when(['lte', 'contact.person[1].age', 16], data)).to.equal(false)

    })
})
