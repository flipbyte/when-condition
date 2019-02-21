import when from '../src/index';

describe('gte', () => {
    let data = { age: 18 }

    it('single rule', () => {
        expect(when(['gte', 'age', 19], data)).to.equal(false)
        expect(when(['gte', 'age', '19'], data)).to.equal(false)
        expect(when(['gte', 'age', 18], data)).to.equal(true)
        expect(when(['gte', 'age', 16], data)).to.equal(true)
    })

    it('single rule using "and"', () => {
        expect(when(['and', ['gte', 'age', 19]], data)).to.equal(false)
        expect(when(['and', ['gte', 'age', '19']], data)).to.equal(false)
        expect(when(['and', ['gte', 'age', 18]], data)).to.equal(true)
        expect(when(['and', ['gte', 'age', 16]], data)).to.equal(true)
    })

    it('single rule using "or"', () => {
        expect(when(['or', ['gte', 'age', 19]], data)).to.equal(false)
        expect(when(['or', ['gte', 'age', '19']], data)).to.equal(false)
        expect(when(['or', ['gte', 'age', 18]], data)).to.equal(true)
        expect(when(['or', ['gte', 'age', 16]], data)).to.equal(true)
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

        expect(when(['gte', 'contact.person.age', 19], data)).to.equal(false)
        expect(when(['gte', 'contact.person.age', '19'], data)).to.equal(false)
        expect(when(['gte', 'contact.person.age', 18], data)).to.equal(true)
        expect(when(['gte', 'contact.person.age', 16], data)).to.equal(true)
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

        expect(when(['gte', 'contact.person.0.age', 19], data)).to.equal(false)
        expect(when(['gte', 'contact.person.0.age', '19'], data)).to.equal(false)
        expect(when(['gte', 'contact.person.0.age', 18], data)).to.equal(true)
        expect(when(['gte', 'contact.person.0.age', 16], data)).to.equal(true)

        expect(when(['gte', 'contact.person[0].age', 19], data)).to.equal(false)
        expect(when(['gte', 'contact.person[0].age', '19'], data)).to.equal(false)
        expect(when(['gte', 'contact.person[0].age', 18], data)).to.equal(true)
        expect(when(['gte', 'contact.person[0].age', 16], data)).to.equal(true)

        expect(when(['gte', 'contact.person[1].age', 19], data)).to.equal(false)
        expect(when(['gte', 'contact.person[1].age', '19'], data)).to.equal(false)
        expect(when(['gte', 'contact.person[1].age', 18], data)).to.equal(false)
        expect(when(['gte', 'contact.person[1].age', 16], data)).to.equal(false)

    })
})
