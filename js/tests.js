var tests = {
    "get_ability": function() {
        ability = get_ability(abilities, "omniknight", "Repel");
        return (ability.name == "Repel" && ability.hero == "omniknight")
    },
    "counters_run_properly": function() {
        ability = get_ability(abilities, "omniknight", "Repel");
        return get_abilities_countering_ability(counters, abilities, ability).length == 3;
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
