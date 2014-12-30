function objectIn(object, array) {
    var found = false;
    for (var i = 0; i < array.length; i++) {
        if (_.isEqual(object, array[i])) {
            found = true;
        }
    }
    return found;
}

var AVAILABLE_TAGS = [
    "magic-immunity", "positive-effect", "purge-positive",
    "purge-negative", "pure-damage", "slow-attack-speed",
    "slow-move-speed", "physical-immunity", "pierces-magic-immunity",
    "bonus-move-speed", "bonus-attack-speed", "global", "damage-over-time",
    "stun", "magic-damage", "channeled", "negative-effect", "negative-lifesteal",
    "heal",
];

var tests = {
    "get_ability": function() {
        ability = get_ability(abilities, "omniknight", "Repel");
        return (ability.name == "Repel" && ability.hero == "omniknight")
    },
    "only_known_tags": function() {
        var used_tags = _.uniq(_.flatten(_.map(abilities, tags_for_ability)));
        var extra_tags = _.difference(used_tags, AVAILABLE_TAGS);
        if (extra_tags.length > 0) {
            console.log("Used tags: " + used_tags);
            console.log("Extra tags: " + extra_tags);
            return false;
        }
        return true;
    },
    "all_counters_used": function() {
        var used_counters = [];
        for (var i = 0; i < abilities.length; i++) {
            var c = counters_for_ability(counters, abilities[i]);
            _.each(c, function(counter) {
                if (!objectIn(counter, used_counters)) {
                    used_counters.push(counter);
                }
            });
        }
        var passed = (_.flatten(used_counters).length == counters.length)
        if (!passed) {
            console.log("Used counters: ");
            console.log(used_counters);
        }
        return passed;
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
