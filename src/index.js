var get = require('lodash.get');

const logicalOperators = ['and', 'or'];

var rules = {
    is: function(key, value, data) {
        return get(data, key) === value;
    },
    isNot: function(key, value, data) {
        return get(data, key) != value;
    },
    // allOf: function(key, value, data) {
    //     if(!Array.isArray(value)) {
    //         throw Error('"allOf" condition requires an array as #2 argument');
    //     }
    //
    //     let dataValue = get(data, key);
    //     return value.every(currentValue => currentValue === dataValue)
    // },
    anyOf: function(key, values, data) {
        if(!Array.isArray(values)) {
            throw Error('"anyOf" condition requires an array as #2 argument');
        }

        let dataValue = get(data, key);
        return values.includes(dataValue);
    },
    noneOf: function(key, values, data) {
        if(!Array.isArray(values)) {
            throw Error('"noneOf" condition requires an array as #2 argument');
        }

        let dataValue = get(data, key);
        return !values.includes(dataValue);
    },
    gt: function(key, value, data) {
        return get(data, key) > value;
    },
    gte: function(key, value, data) {
        return get(data, key) >= value
    },
    lt: function(key, value, data) {
        return get(data, key) < value;
    },
    lte: function(key, value, data) {
        return get(data, key) <= value
    },
}

const isValidCondition = (conditions) => {
    if(Array.isArray(conditions)
        && Array.isArray(conditions[1])
        && logicalOperators.includes(conditions[0])
    ) {
        return true;
    }

    return false;
}

const processRule = ([key, value, condition], data) => {
    if(typeof condition !== 'string' || rules[condition] === undefined) {
        throw Error('Invalid comparison rule ' + condition + '.');
    }

    return rules[condition](key, value, data);
}

const processCondition = (condition, data) => {
    if(condition.toLowerCase() === 'or') {
        return data.includes(true);
    }

    return !data.includes(false);
}

const when = (conditions, data) => {
    if (typeof conditions === 'function') {
        return conditions(data);
    }

    if(!isValidCondition(conditions)) {
        return processRule(conditions, data);
    }

    var type = conditions.shift();
    var result = conditions.map((condition, index) => {
        if (isValidCondition(condition)) {
            return when(condition, data)
        }

        return processRule(condition, data);
    })

    return processCondition(type, result)
}

export default when;
