import when from '../src/index';

describe('allOf', () => {
    let data = {
        brand: ['Apple', 'Samsung', 'Nokia']
    }

    it('single rule', () => {
        expect(when(['allOf', 'brand', ['Apple', 'Samsung', 'Nokia']], data)).to.equal(true)
        expect(when(['allOf', 'brand', ['Nokia', 'Samsung', 'Apple']], data)).to.equal(true)
        expect(when(['allOf', 'brand', ['Nokia', 'Samsung']], data)).to.equal(true)
        expect(when(['allOf', 'brand', ['Nokia', 'Another']], data)).to.equal(false)
        expect(when(['allOf', 'brand', ['Apple', 'Samsung', 'Nokia', 'Another']], data)).to.equal(false)
    })

    it('single rule using "and"', () => {
        expect(when(['and', ['allOf', 'brand', ['Apple', 'Samsung', 'Nokia']]], data)).to.equal(true)
        expect(when(['and', ['allOf', 'brand', ['Nokia', 'Samsung', 'Apple']]], data)).to.equal(true)
        expect(when(['and', ['allOf', 'brand', ['Nokia', 'Samsung']]], data)).to.equal(true)
        expect(when(['and', ['allOf', 'brand', ['Nokia', 'Another']]], data)).to.equal(false)
        expect(when(['and', ['allOf', 'brand', ['Apple', 'Samsung', 'Nokia', 'Another']]], data)).to.equal(false)
    })

    it('single rule using "or"', () => {
        expect(when(['or', ['allOf', 'brand', ['Apple', 'Samsung', 'Nokia']]], data)).to.equal(true)
        expect(when(['or', ['allOf', 'brand', ['Nokia', 'Samsung', 'Apple']]], data)).to.equal(true)
        expect(when(['or', ['allOf', 'brand', ['Nokia', 'Samsung']]], data)).to.equal(true)
        expect(when(['or', ['allOf', 'brand', ['Nokia', 'Another']]], data)).to.equal(false)
        expect(when(['or', ['allOf', 'brand', ['Apple', 'Samsung', 'Nokia', 'Another']]], data)).to.equal(false)
    })

    it('deep object key', () => {
        let data = {
            contact: {
                person: {
                    brand: ['Apple', 'Samsung', 'Nokia']
                }
            }
        }

        expect(when(['allOf', 'contact.person.brand', ['Apple', 'Samsung', 'Nokia']], data)).to.equal(true)
        expect(when(['allOf', 'contact.person.brand', ['Nokia', 'Samsung', 'Apple']], data)).to.equal(true)
        expect(when(['allOf', 'contact.person.brand', ['Nokia', 'Samsung']], data)).to.equal(true)
        expect(when(['allOf', 'contact.person.brand', ['Nokia', 'Another']], data)).to.equal(false)
        expect(when(['allOf', 'contact.person.brand', ['Apple', 'Samsung', 'Nokia', 'Another']], data)).to.equal(false)
    })

    it('deep object array key', () => {
        let data = {
            contact: {
                person: [{
                    brand: ['Apple', 'Samsung', 'Nokia']
                }]
            }
        }

        expect(when(['allOf', 'contact.person.0.brand', ['Apple', 'Samsung', 'Nokia']], data)).to.equal(true)
        expect(when(['allOf', 'contact.person[0].brand', ['Nokia', 'Samsung', 'Apple']], data)).to.equal(true)
        expect(when(['allOf', 'contact.person[0].brand', ['Nokia', 'Samsung']], data)).to.equal(true)
        expect(when(['allOf', 'contact.person.0.brand', ['Nokia', 'Another']], data)).to.equal(false)
        expect(when(['allOf', 'contact.person[0].brand', ['Apple', 'Samsung', 'Nokia', 'Another']], data)).to.equal(false)
    })

    it('throws error when values is not of type array', () => {
        (function() {
            when(['allOf', 'name', 'Apple'], data)
        }.should.throw(/"allOf" condition requires an array as #3 argument/));
    })
})
