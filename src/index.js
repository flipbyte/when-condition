const get = (obj, path, defaultValue = undefined) => (
    String.prototype.split.call(path, /[,[\].]+?/)
        .filter(Boolean)
        .reduce((a, c) => (a && Object.hasOwnProperty.call(a, c)) ? a[c] : defaultValue, obj)
);

var rules = {
    is: function(key, value, data) {
        return get(data, key) === value;
    },
    isOfType: function(key, value, data) {
        return typeof get(data, key) === value;
    },
    allOf: function(key, values, data) {
        if(!Array.isArray(values)) {
            throw Error('"allOf" condition requires an array as #3 argument');
        }

        var dataValues = get(data, key);
        return values.every((currentValue) => dataValues.includes(currentValue))
    },
    anyOf: function(key, values, data) {
        if(!Array.isArray(values)) {
            throw Error('"anyOf" condition requires an array as #3 argument');
        }

        let dataValue = get(data, key);
        return values.includes(dataValue);
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
};

const logicalRules = {
    and: function(data) {
        return !data.includes(false);
    },
    or: function(data) {
        return data.includes(true);
    },
    not: function(data) {
        if (data.length !== 1) {
            throw Error('"not" can have only one comparison rule, multiple rules given');
        }

        return !data[0];
    }
}

const isValidCondition = (conditions) => {
    if(Array.isArray(conditions)
        && Array.isArray(conditions[1])
        && (conditions[0] && logicalRules[conditions[0].toLowerCase()])
    ) {
        return true;
    }

    return false;
}

const processRule = ([condition, key, value], data) => {
    if(typeof condition !== 'string' || rules[condition] === undefined) {
        throw Error('Invalid comparison rule ' + condition + '.');
    }

    return rules[condition](key, value, data);
}

const processCondition = (condition, data) => (
    logicalRules[condition.toLowerCase()](data)
);

const validate = (conditions, data) => {
    if (!isValidCondition(conditions)) {
        return processRule(conditions, data);
    }

    var logicalRule = conditions.slice(0, 1)[0];
    var comparisonRules = conditions.slice(1);
    var result = comparisonRules.map((condition, index) => {
        if (isValidCondition(condition)) {
            return when(condition, data)
        }

        return processRule(condition, data);
    })

    return processCondition(logicalRule, result)
}

const when = (conditions, data) => {
    if (typeof conditions === 'function') {
        return Promise.resolve(conditions(data));
    }

    return validate(conditions, data);
}

export default when;
