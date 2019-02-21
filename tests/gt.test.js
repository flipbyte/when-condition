import when from '../src/index';

describe('gt', () => {
    let data = { age: 18 }

    it('single rule', () => {
        expect(when(['gt', 'age', 19], data)).to.equal(false)
        expect(when(['gt', 'age', '19'], data)).to.equal(false)
        expect(when(['gt', 'age', 18], data)).to.equal(false)
        expect(when(['gt', 'age', 16], data)).to.equal(true)
    })

    it('single rule using "and"', () => {
        expect(when(['and', ['gt', 'age', 19]], data)).to.equal(false)
        expect(when(['and', ['gt', 'age', '19']], data)).to.equal(false)
        expect(when(['and', ['gt', 'age', 18]], data)).to.equal(false)
        expect(when(['and', ['gt', 'age', 16]], data)).to.equal(true)
    })

    it('single rule using "or"', () => {
        expect(when(['or', ['gt', 'age', 19]], data)).to.equal(false)
        expect(when(['or', ['gt', 'age', '19']], data)).to.equal(false)
        expect(when(['or', ['gt', 'age', 18]], data)).to.equal(false)
        expect(when(['or', ['gt', 'age', 16]], data)).to.equal(true)
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

        expect(when(['gt', 'contact.person.age', 19], data)).to.equal(false)
        expect(when(['gt', 'contact.person.age', '19'], data)).to.equal(false)
        expect(when(['gt', 'contact.person.age', 18], data)).to.equal(false)
        expect(when(['gt', 'contact.person.age', 16], data)).to.equal(true)
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

        expect(when(['gt', 'contact.person.0.age', 19], data)).to.equal(false)
        expect(when(['gt', 'contact.person.0.age', '19'], data)).to.equal(false)
        expect(when(['gt', 'contact.person.0.age', 18], data)).to.equal(false)
        expect(when(['gt', 'contact.person.0.age', 16], data)).to.equal(true)

        expect(when(['gt', 'contact.person[0].age', 19], data)).to.equal(false)
        expect(when(['gt', 'contact.person[0].age', '19'], data)).to.equal(false)
        expect(when(['gt', 'contact.person[0].age', 18], data)).to.equal(false)
        expect(when(['gt', 'contact.person[0].age', 16], data)).to.equal(true)

        expect(when(['gt', 'contact.person[1].age', 19], data)).to.equal(false)
        expect(when(['gt', 'contact.person[1].age', '19'], data)).to.equal(false)
        expect(when(['gt', 'contact.person[1].age', 18], data)).to.equal(false)
        expect(when(['gt', 'contact.person[1].age', 16], data)).to.equal(false)

    })
})
