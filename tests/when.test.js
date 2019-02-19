import when from '../src/index';

describe('when', () => {
    let data = {
        name: 'John Doe',
        age: 18,
        country: 'Germany'
    }

    it('callback', () => {
        expect(when(function(data) {
            return data.name == 'John Doe' && data.age >= 18
        }, data)).to.equal(true)

        expect(when(function(data) {
            return data.name == 'John' && data.age >= 18
        }, data)).to.equal(false)
    })

    it('mixed deep conditions', () => {
        let rules = ['and',
            ['name', 'John Doe', 'is'],
            ['age', 18, 'gte'],
            ['or',
                ['country', 'Germany', 'is'],
                ['country', 'Spain', 'is']
            ]
        ]
        expect(when(rules, data)).to.equal(true)
    })

    it('throws error on invalid logical rule', () => {
        (function() {
            let rules = ['and',
                ['name', 'John Doe', 'is'],
                ['age', 18, 'gte'],
                ['xor',
                    ['country', 'Germany', 'is'],
                    ['country', 'Spain', 'is']
                ]
            ]

            when(rules, data)
        }.should.throw(/Invalid comparison rule/));
    })
})
