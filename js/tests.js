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
    "magic-immunity", "positive-effect",
    "pure-damage", "slow-attack-speed",
    "slow-move-speed", "physical-immunity", "pierces-magic-immunity",
    "bonus-move-speed", "bonus-attack-speed", "global", "damage-over-time",
    "stun", "magic-damage", "channeled", "negative-effect", "negative-lifesteal",
    "heal", "purge", "dispellable", "global-physical-presence",
];

var tests = {
    "get_ability": function() {
        ability = get_ability(abilities, "omniknight", "Repel");
        return (ability.name == "Repel" && ability.hero == "omniknight");
    },
    "simple_tag_check": function() {
        var ability = get_ability(abilities, "omniknight", "Repel");
        var found = tags_for_ability(ability);
        var expected = [
            "magic-immunity", "positive-effect",
            "purge"
        ];
        var ok = (
            _.union(expected, found).length == expected.length &&
            _.intersection(expected, found).length == expected.length
        )
        if (!ok) {
            console.log("Found tags: " + found);
            console.log("Expected tags: " + expected);
        }
        return ok;
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
        var passed = (_.flatten(used_counters).length == counters.length);
        if (!passed) {
            console.log("Used counters: ");
            console.log(used_counters);
        }
        return passed;
    },
    "a_lot_of_heroes_found": function() {
        var heroes = heroes_from_abilities(abilities);
        return heroes.length > 10 && heroes.length < 150;
    }
};

function runTests() {
    passed = 0;
    for (var test_name in tests) {
        if (!tests[test_name]()) {
            console.log(test_name + " failed!");
        } else {
            passed++;
        }
    }
    console.log(passed + "/" + Object.keys(tests).length + " tests passed.");
}

runTests();
