//
// Heroes
//

function heroes_from_abilities(abilities) {
    return _.uniq(
        _.map(
            abilities,
            function (ability) {
                return ability.hero;
            }
        )
    );
}

function most_frequent_heroes(abilities, n) {
    /* abilities - a list of abilities to extract the heroes from */
    return _.chain(abilities)
        .countBy("hero")
        .pairs()
        .sortBy(1)
        .reverse()
        .pluck(0)
        .first(n)
        .value();
}


//
// Abilities
//

function get_ability(abilities, hero, name) {
    return _.first(
        _.filter(abilities, function(ability) {
            return (ability.hero == hero && ability.name == name);
        })
    );
}

function tags_for_ability(ability) {
    return ability.tags;
}

function ability_satisfies_tags(ability, tags) {
    return _.isEqual(
        _.intersection(
            tags_for_ability(ability), tags
        ).length,
        tags.length
    );
}

function abilities_by_tags(abilities, tags) {
    return _.filter(
        abilities,
        function(ability) {
            return ability_satisfies_tags(ability, tags);
        }
    );
}

function abilities_by_hero(abilities, hero) {
    return _.filter(
        abilities,
        function (ability) {
            return ability.hero == hero;
        }
    );
}


//
// Counters
//

function counter_abilities_for_counter(abilities, counter) {
    return _.filter(abilities, function(ability) {
        return ability_satisfies_tags(ability, counter.counter_has);
    });
}

function counters_for_ability(counters, ability) {
    return _.filter(counters, function(counter) {
        return ability_satisfies_tags(ability, counter.original_has);
    });
}

function get_abilities_countering_ability(counters, abilities, ability) {
    counters = counters_for_ability(counters, ability);
    abilities = _.flatten(
        _.map(
            counters,
            function(counter) {
                return counter_abilities_for_counter(abilities, counter);
            }
        )
    );
    return abilities;
}

function explanation_for_counter(original_ability, counter, counter_ability) {
    var replacements = {
        "{ original_hero }": original_ability.hero,
        "{ original_ability }": original_ability.name,
        "{ counter_ability }": counter_ability.name,
        "{ counter_hero }": counter_ability.hero
    };
    return counter.explanation.replace(/{ \w+ }/g, function(all) {
           return replacements[all] || all;
    });
}

function explanations_for_hero_counters(original_hero, counter_hero) {
    var explanations = [];
    _.each(
        abilities_by_hero(abilities, original_hero),
        function (original_ability) {
            _.each(
                counters_for_ability(
                    counters,
                    original_ability
                ),
                function (counter) {
                    _.each(
                        get_abilities_countering_ability(
                            [counter],
                            abilities_by_hero(abilities, counter_hero), 
                            original_ability
                        ),
                        function (counter_ability) {
                            explanations.push(
                                explanation_for_counter(
                                    original_ability, counter, counter_ability
                                )
                            );
                        }
                    );
                }
            );
        }
    );
    return explanations;
}
