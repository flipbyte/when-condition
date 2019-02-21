# when-condition

[Powered by Flipbyte](https://www.flipbyte.com/)

[![Build Status][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coverage Status][coveralls-badge]][coveralls]
[![license][license-badge]][license]
[![Codacy Badge][codacy-badge]][codacy]

Check conditional statements and return true/false

## Installation

```sh
npm i @flipbyte/when-condition
```

## Usage

Define your conditionals using an array with logical rule ('and' or 'or') as the first element followed by an array of comparison conditions.

General representation of a logical rule is as follows:

```js
['{your logical rule}', [{your comparison rule 1}], [{your comparison rule 2}], ...]
```

Comparison rule is an array with 3 elements:

-   The comparison rule.
-   The key of the object whose value needs to be compared with a condition.
-   The comparison value.

General representation of a comparison rule is as follows:

```js
['{comparison rule}', '{key}', '{comparison value}']
```

## Example

Consider an object as follows:

```js
let data = {
    a: 1,
    b: 2,
    c: {
        d: 'string',
        e: [{
            f: 1,
            g: 2
        }]
    }
}
```

### Single rule

#### To simply check one rule (say) data.a = 1

```js
let rule = ['is', 'a', 1]
```

or

#### Check whether data.c.e\[0\].f = 1
```js
let rule = ['is', 'c.e[0]`.f', 1]
```

### Rules with multiple comparisons

#### Check whether both data.a = 1 and data.b = 2

```js
let rule = ['and', ['is', 'a', 1], ['is', 'b', 2]]
```

#### Check whether either data.a = 1 or data.b = 2

```js
let rule = ['or', ['is', 'a', 1], ['is', 'b', 2]]
```

### Complex rules

#### Check whether (data.a = 1 and data.b = 2) or (data.b = 2 and data.c.d != 'string')

```js
let rule = ['or', ['and', ['is', 'a', 1], ['is', 'b', 2]], ['and', ['is', 'b', 2], ['is', 'c.d', 'string']]]
```

### Evaluating rules

```js
import when from 'when-condition'

when(rule, data) // => returns true or false

```

### Rules using callback

You can also pass a callback function to check the data.

```js
when(function(data) {
    return data.a !== data.b
}, data)
```

## Logical rules

There are 2 types of logical rules:
-   ```and``` - checks whether all the conditions evaluate to true.
-   ```or```  - checks whether atleast one condition evaluates to true.

## Comparison rules

Following are the available comparison rules:
-   ```is``` - returns true if the object value strictly matches the comparison value.
-   ```isNot``` - returns true if the object value does not match the comparison value.
-   ```anyOf``` - returns true if at least one of the comparison values matches the object key value. The comparison value needs to be an array.
-   ```noneOf``` - returns true if none of the comparison values match the object key value. The comparison value needs to be an array.
-   ```gt``` - returns true if the object key value is greater than the comparison value
-   ```gte``` - returns true if the object key value is greater than or equal to the comparison value
-   ```lt``` - returns true if the object key value is lesser than the comparison value
-   ```lte``` - returns true if the object key value is lesser than or equal to the comparison value

## License
The MIT License (MIT)

[build-badge]: https://travis-ci.org/flipbyte/when-condition.svg?branch=master
[build]: https://travis-ci.org/flipbyte/when-condition

[npm-badge]: https://img.shields.io/npm/v/@flipbyte/when-condition.svg
[npm]: https://www.npmjs.com/package/@flipbyte/when-condition

[coveralls-badge]: https://coveralls.io/repos/github/flipbyte/when-condition/badge.svg
[coveralls]: https://coveralls.io/github/flipbyte/when-condition

[license-badge]: https://badgen.now.sh/badge/license/MIT
[license]: ./LICENSE

[codacy-badge]: https://api.codacy.com/project/badge/Grade/7fdf5e97a9a1409cb2b895be5fc49633
[codacy]: https://www.codacy.com/app/flipbyte/when-condition?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=flipbyte/when-condition&amp;utm_campaign=Badge_Grade
