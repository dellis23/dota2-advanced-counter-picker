function tags_for_ability(ability) {
    return _.flatten(
        _.map(
            ability.attributes,
            function(attributes) {
                return attributes.type;
            }
        )
    );
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
            return ability_satisfies_tags(ability, tags)
        }
    );
}


//
// Counters
//

function counter_abilities_for_counter(abilities, counter) {
    return _.filter(abilities, function(ability) {
        return ability_satisfies_tags(ability, counter.counter_has);
    })
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
