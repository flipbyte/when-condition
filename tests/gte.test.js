
import when from '../src/index';

describe('gte', () => {
    let data = { age: 18 }

    it('single rule', () => {
        expect(when(['age', 19, 'gte'], data)).to.equal(false)
        expect(when(['age', '19', 'gte'], data)).to.equal(false)
        expect(when(['age', 18, 'gte'], data)).to.equal(true)
        expect(when(['age', 16, 'gte'], data)).to.equal(true)
    })

    it('single rule using "and"', () => {
        expect(when(['and', ['age', 19, 'gte']], data)).to.equal(false)
        expect(when(['and', ['age', '19', 'gte']], data)).to.equal(false)
        expect(when(['and', ['age', 18, 'gte']], data)).to.equal(true)
        expect(when(['and', ['age', 16, 'gte']], data)).to.equal(true)
    })

    it('single rule using "or"', () => {
        expect(when(['or', ['age', 19, 'gte']], data)).to.equal(false)
        expect(when(['or', ['age', '19', 'gte']], data)).to.equal(false)
        expect(when(['or', ['age', 18, 'gte']], data)).to.equal(true)
        expect(when(['or', ['age', 16, 'gte']], data)).to.equal(true)
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

        expect(when(['contact.person.age', 19, 'gte'], data)).to.equal(false)
        expect(when(['contact.person.age', '19', 'gte'], data)).to.equal(false)
        expect(when(['contact.person.age', 18, 'gte'], data)).to.equal(true)
        expect(when(['contact.person.age', 16, 'gte'], data)).to.equal(true)
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

        expect(when(['contact.person.0.age', 19, 'gte'], data)).to.equal(false)
        expect(when(['contact.person.0.age', '19', 'gte'], data)).to.equal(false)
        expect(when(['contact.person.0.age', 18, 'gte'], data)).to.equal(true)
        expect(when(['contact.person.0.age', 16, 'gte'], data)).to.equal(true)

        expect(when(['contact.person[0].age', 19, 'gte'], data)).to.equal(false)
        expect(when(['contact.person[0].age', '19', 'gte'], data)).to.equal(false)
        expect(when(['contact.person[0].age', 18, 'gte'], data)).to.equal(true)
        expect(when(['contact.person[0].age', 16, 'gte'], data)).to.equal(true)

        expect(when(['contact.person[1].age', 19, 'gte'], data)).to.equal(false)
        expect(when(['contact.person[1].age', '19', 'gte'], data)).to.equal(false)
        expect(when(['contact.person[1].age', 18, 'gte'], data)).to.equal(false)
        expect(when(['contact.person[1].age', 16, 'gte'], data)).to.equal(false)

    })
})
