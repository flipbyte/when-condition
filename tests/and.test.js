
import when from '../src/index';

describe('and', () => {
    let data = {
        name: 'John Doe',
        age: 18
    }

    it('is', () => {
        expect(when(['and', ['name', 'John Doe', 'is'], ['age', 18, 'is']], data)).to.equal(true)
        expect(when(['and', ['name', 'John Doe', 'is'], ['age', 17, 'is']], data)).to.equal(false)
    })

    it('isNot', () => {
        expect(when(['and', ['name', 'John Doe', 'isNot'], ['age', 18, 'isNot']], data)).to.equal(false)
        expect(when(['and', ['name', 'John Doe', 'isNot'], ['age', 17, 'isNot']], data)).to.equal(false)
        expect(when(['and', ['name', 'John', 'isNot'], ['age', 17, 'isNot']], data)).to.equal(true)
    })

    // it('single rule using "or"', () => {
    //     expect(when(['or', ['name', 'John Doe', 'is']], data)).to.equal(true)
    //     expect(when(['or', ['name', 'John', 'is']], data)).to.equal(false)
    // })
    //
    // it('deep object key', () => {
    //     let data = {
    //         contact: {
    //             person: {
    //                 name: 'John Doe'
    //             }
    //         }
    //     }
    //     expect(when(['contact.person.name', 'John Doe', 'is'], data)).to.equal(true)
    //     expect(when(['contact.person.lastName', 'John Doe', 'is'], data)).to.equal(false)
    // })
    //
    // it('deep object array key', () => {
    //     let data = {
    //         contact: {
    //             person: [{
    //                 name: 'John Doe'
    //             }]
    //         }
    //     }
    //     expect(when(['contact.person.0.name', 'John Doe', 'is'], data)).to.equal(true)
    //     expect(when(['contact.person[0].name', 'John Doe', 'is'], data)).to.equal(true)
    //     expect(when(['contact.person[1].name', 'John Doe', 'is'], data)).to.equal(false)
    // })
})
