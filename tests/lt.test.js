import when from '../src/index';

describe('lt', () => {
    let data = { age: 18 }

    it('single rule', () => {
        expect(when(['lt', 'age', 19], data)).to.equal(true)
        expect(when(['lt', 'age', '19'], data)).to.equal(true)
        expect(when(['lt', 'age', 18], data)).to.equal(false)
        expect(when(['lt', 'age', 16], data)).to.equal(false)
    })

    it('single rule using "and"', () => {
        expect(when(['and', ['lt', 'age', 19]], data)).to.equal(true)
        expect(when(['and', ['lt', 'age', '19']], data)).to.equal(true)
        expect(when(['and', ['lt', 'age', 18]], data)).to.equal(false)
        expect(when(['and', ['lt', 'age', 16]], data)).to.equal(false)
    })

    it('single rule using "or"', () => {
        expect(when(['or', ['lt', 'age', 19]], data)).to.equal(true)
        expect(when(['or', ['lt', 'age', '19']], data)).to.equal(true)
        expect(when(['or', ['lt', 'age', 18]], data)).to.equal(false)
        expect(when(['or', ['lt', 'age', 16]], data)).to.equal(false)
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

        expect(when(['lt', 'contact.person.age', 19], data)).to.equal(true)
        expect(when(['lt', 'contact.person.age', '19'], data)).to.equal(true)
        expect(when(['lt', 'contact.person.age', 18], data)).to.equal(false)
        expect(when(['lt', 'contact.person.age', 16], data)).to.equal(false)
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

        expect(when(['lt', 'contact.person.0.age', 19], data)).to.equal(true)
        expect(when(['lt', 'contact.person.0.age', '19'], data)).to.equal(true)
        expect(when(['lt', 'contact.person.0.age', 18], data)).to.equal(false)
        expect(when(['lt', 'contact.person.0.age', 16], data)).to.equal(false)

        expect(when(['lt', 'contact.person[0].age', 19], data)).to.equal(true)
        expect(when(['lt', 'contact.person[0].age', '19'], data)).to.equal(true)
        expect(when(['lt', 'contact.person[0].age', 18], data)).to.equal(false)
        expect(when(['lt', 'contact.person[0].age', 16], data)).to.equal(false)

        expect(when(['lt', 'contact.person[1].age', 19], data)).to.equal(false)
        expect(when(['lt', 'contact.person[1].age', '19'], data)).to.equal(false)
        expect(when(['lt', 'contact.person[1].age', 18], data)).to.equal(false)
        expect(when(['lt', 'contact.person[1].age', 16], data)).to.equal(false)

    })
})
