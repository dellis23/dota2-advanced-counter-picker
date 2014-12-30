function objectIn(object, array) {
    var found = false;
    for (var i = 0; i < array.length; i++) {
        if (_.isEqual(object, array[i])) {
            found = true;
        }
    }
    return found;
}

var tests = {
    "get_ability": function() {
        ability = get_ability(abilities, "omniknight", "Repel");
        return (ability.name == "Repel" && ability.hero == "omniknight")
    },
    "counters_run_properly": function() {
        ability = get_ability(abilities, "omniknight", "Repel");
        return get_abilities_countering_ability(counters, abilities, ability).length == 5;
    },
    "all_counters_used": function() {
        var used_counters = [];
        for (var i = 0; i < abilities.length; i++) {
            var c = counters_for_ability(counters, abilities[i]);
            _.each(c, function(counter) {
                if (!objectIn(c, used_counters)) {
                    used_counters.push(c);
                }
            });
        }
        return (_.flatten(used_counters).length == counters.length)
    },
};

function runTests() {
    passed = 0;
    for (test_name in tests) {
        if (!tests[test_name]()) {
            console.log(test_name + " failed!");
        } else {
            passed++;
        }
    }
    console.log(passed + "/" + Object.keys(tests).length + " tests passed.");
}

runTests();
